// (c) 2014 Don Coleman
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* global mainPage, deviceList, refreshButton */
/* global detailPage, resultDiv, messageInput, sendButton, disconnectButton */
/* global ble  */
/* jshint browser: true , devel: true*/
'use strict';

// ASCII only
function bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

// ASCII only
function stringToBytes(string) {
    var array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
        array[i] = string.charCodeAt(i);
    }
    return array.buffer;
}

// this is Nordic's UART service
var config = {
    serviceUUID: "6E400001-B5A3-F393-E0A9-E50E24DCCA9E",
    txCharacteristic: "6E400002-B5A3-F393-E0A9-E50E24DCCA9E", // transmit is from the phone's perspective
    rxCharacteristic: "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"  // receive is from the phone's perspective
};


var pubnub = PUBNUB.init({
  ssl: true,
  publish_key: 'pub-2cc75d12-3c70-4599-babc-3e1d27fd1ad4',
  subscribe_key: 'sub-cfb3b894-0a2a-11e0-a510-1d92d9e0ffba'
});

var deviceId = false;
var interval = false;
var app = {
    initialize: function() {
        detailPage.hidden = true;
    },
    onDeviceReady: function() {
        app.refreshDeviceList();
    },
    refreshDeviceList: function() {
        
        deviceList.innerHTML = ''; // empties the list

        if (cordova.platformId === 'android') { // Android filtering is broken
            ble.scan([], 5, app.onDiscoverDevice, app.onError);
        } else {
            ble.scan([config.serviceUUID], 5, app.onDiscoverDevice, app.onError);
        }

    },
    onDiscoverDevice: function(device) {

        var listItem = document.createElement('li'),
            html = '<b>' + device.name + '</b><br/>' +
                'RSSI: ' + device.rssi + '&nbsp;|&nbsp;' +
                device.id;

        listItem.dataset.deviceId = device.id;
        listItem.innerHTML = html;
        listItem.className = "list-group-item";
        deviceList.appendChild(listItem);

    },
    onConnect: function() {
        ble.startNotification(deviceId, config.serviceUUID, config.rxCharacteristic, app.onData, app.onError);
        disconnectButton.dataset.deviceId = deviceId;
        app.showDetailPage();
        app.startInterval();
    },
    connect: function(e) {
        deviceId = e.target.dataset.deviceId,
        ble.connect(deviceId, app.onConnect, app.onError);
    },
    onData: function(data) { // data received from Arduino

        resultDiv.innerHTML = resultDiv.innerHTML + "<strong>Received:</strong> " + bytesToString(data) + "<br/>";
        resultDiv.scrollTop = resultDiv.scrollHeight;

        var data = bytesToString(data);
        var vals = data.split(':');

        pubnub.publish({
          channel: 'pubnub-bluetooth-2',
          message: {
            'accelX': vals[0],
            'accelY': vals[1],
            'accelZ': vals[2] 
          }
        });

    },
    sendData: function(string) {

        var success = function() {
            resultDiv.innerHTML = resultDiv.innerHTML + "<strong>Sent:</strong> " + string + "<br/>";
            resultDiv.scrollTop = resultDiv.scrollHeight;
        };

        var failure = function() {
            // console.log("Failed writing data to the bluetooth le");
        };

        var data = stringToBytes(string);
        ble.writeWithoutResponse(
            deviceId,
            config.serviceUUID,
            config.txCharacteristic,
            data, success, failure
        );

    },
    disconnect: function(event) {
        ble.disconnect(deviceId, app.showMainPage, app.onError);
        app.clearInterval();
    },
    showMainPage: function() {
        mainPage.hidden = false;
        detailPage.hidden = true;
    },
    showDetailPage: function() {
        mainPage.hidden = true;
        detailPage.hidden = false;
    },
    onError: function(reason) {
        console.log("ERROR: " + reason); // real apps should use notification.alert
    },
    startInterval: function() {
        interval = setInterval(function(){
            app.sendData('ping!');
        }, 1000);
    },
    clearInterval: function() {
        clearInterval(interval);
    }
};

app.initialize();

document.addEventListener('deviceready', app.onDeviceReady, false);
refreshButton.addEventListener('touchstart', app.refreshDeviceList, false);
sendButton.addEventListener('click', function(){
    app.sendData(messageInput.value);
}, false);
disconnectButton.addEventListener('touchstart', app.disconnect, false);
deviceList.addEventListener('touchstart', app.connect, false); // assume not scrolling