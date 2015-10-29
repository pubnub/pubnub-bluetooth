# Build an internet connected Bluetooth wearable with Arduino and Phonegap (Part 2)

Did you catch part one of our tutorial where we walk through creating your own bluetooth hardware with Tinyduino? In this article we'll be continuing from where we left off and completing our bluetooth fitness band.

When we last left you we connected your phone to a bluetooth module. Next, we'll be adding an accelerometer to the Arduino and creating our own app to graph accelerometer data.

# Add the accelerometer to the Tinyduino stack

![](http://i.imgur.com/vGyWlve.jpg)

We'll be using the Tinyduino accelerometer module which fits right on top of the rest of our Arduino project. An accelerometer measures acceleration in three axis (x, y, z) and will help us track our steps for our fitness tracker. The accelerometer also includes a temperature sensor, but we won't be using that right now.

Snap the accelerometer into the top of the TinyDuino stack. It fits right in like the rest of the Tinyduino components.

![](http://i.imgur.com/zPJPlm3.jpg)

# Test the accelerometer

Next, we'll test the accelerometer. Run this code on your TinyDuino and then look at the Serial Log for the X, Y, and Z acceleration.

```
#include <Wire.h>
#include "BMA250.h"

BMA250 accel;

void setup()
{
  Serial.begin(9600);
  Wire.begin();
  accel.begin(BMA250_range_2g, BMA250_update_time_64ms);//This sets up the BMA250 accelerometer
}

void loop() {
  accel.read();//This function gets new data from the accelerometer
  Serial.print("X = ");
  Serial.print(accel.X);
  Serial.print("  ");
  Serial.print("Y = ");
  Serial.print(accel.Y);
  Serial.print("  ");
  Serial.print("Z = ");
  Serial.print(accel.Z);
  Serial.print("  Temperature(C) = ");
  Serial.println((accel.rawTemp*0.5)+24.0,1);
  delay(250);//We'll make sure we're over the 64ms update time set on the BMA250
}
```

Shake that Arduino around (but not too much!). You should see the X, Y, and Z acceleration move all over the place. The Y acceleration will always read around 9.8 due to the [gravity of earth](https://en.wikipedia.org/wiki/Gravity_of_Earth). Cool huh?

# Send the Accelerometer data over Bluetooth

Wohoo! Our hardware build is complete. No soldering required! Now to get this accelerometer data on to our phone. 

Remember our Arduino Bluetooth sketch from Part 1? All we're going to do take the example code above and merge it with the Bluetooth sketch. Then when we open the Bluetooth console on our phone, we'll be able to see the accelerometer data.

Upload [this codebender sketch](https://codebender.cc/sketch:147004#TinyShield_NRF8001_BLE_Example.ino) onto your TinyDuino and then connect to your Arduino using the NRF UART 2.0 app for [Android](https://play.google.com/store/apps/details?id=com.nordicsemi.nrfUARTv2&hl=en) or [iPhone](https://itunes.apple.com/us/app/nrf-uart/id614594903?mt=8) just as you did in Part 1 of this tutorial.

Now whenever you send a message to the Arduino, the Arduino will respond with it's current accelerometer data!

![](http://i.imgur.com/R8hrRAQ.jpg)

This is what the serial log will look like:

```
Evt Device Started: Standby
Advertising started
Evt Connected
Evt Pipe Status
Evt Pipe Status
Evt Pipe Status
Evt link connection interval changed
Pipe Number: 11
4 bytes: test
4
test
Pipe Number: 11
4 bytes: test
4
test
```

# Creating a Bluetooth app with Phonegap

Let's build our phone app! Don't worry, it's super easy. We'll be using Phonegap, a package that allows anybody to create apps for iPhone and Android using HTML and CSS. And best of all, all the code is already ready for you! Just make sure you have [NodeJS](https://nodejs.org/en/download/package-manager/) and [Phonegap](http://phonegap.com/install/) installed on your machine.

Then, clone this repository if you haven't already. Within this directory, run the following commands:

```
$ cordova platform add android ios  
$ cordova plugin add com.megster.cordova.ble
$ cordova plugin add https://github.com/apache/cordova-plugin-whitelist.git#r1.0.0
$ cordova run
```

Great! Your app should now be running on Android or iOS device! Note that you won't be able to connect through Bluetooth using an emulator, you'll need to deploy it to a live mobile device.

# Connect to the the Arduino

Launch the app on your device and look for your Arduino Bluetooth module.

![](http://i.imgur.com/xap56AM.jpg)

Click on your Arduino device, and you'll be presented with a live chart graphing the X, Y, and Z accelerations as well as a window showing all the messages being sent and received through Bluetooth. Swing the accelerometer around to make the chart move up and down!

![](http://i.imgur.com/R8hrRAQ.jpg)

# How it works

First the accelerometer records the acceleration on the three axis. Then that data is sent to the Bluetooth module and then broadcast over the air to your phone. Your phone receives that data and then rebroadcasts it over the internet using [the PubNub data stream network](http://pubnub.com). Then, we graph the internet data using a spline chart.

It's important to note, because we broadcast that data over PubNUb, this wearable is internet connected! You can see the live acceleration from any device with internet access.

# The Live Chart

The live chart is powered by [PubNub's Project EON](http://pubnub.com/developers/eon). EON graphs data published over PubNub in a nice embeddable chart. Because we're working with data streams, all the accelerometer data is being published over the internet. This means you can embed the chart anywhere, including multiple phones or even in a web page. 

Try it out, stick this code into an HTML file on your local machine and watch your accelerometer data there too!

```js
<div id="chart"></div>
<script type="text/javascript" src="https://pubnub.github.io/eon/lib/eon.js"></script>
<link type="text/css" rel="stylesheet" href="https://pubnub.github.io/eon/lib/eon.css" />
<script type="text/javascript">
  var __eon_pubnub = PUBNUB.init({
    subscribe_key: "sub-cfb3b894-0a2a-11e0-a510-1d92d9e0ffba",
    ssl: true
  });
  chart = eon.chart({
    pubnub: __eon_pubnub,
    channel: "pubnub-bluetooth-2",
    history: true,
    flow: true,
    rate: 750,
    limit: 20,
    generate: {
      bindto: "#chart",
      data: {
        type: "spline"
      },
      transition: {
        duration: 0
      },
      tooltip: {
       show: true
      },
      point: {
        show: true
      }
    },
    transform: function(message) {
      var message = eon.c.flatten(message);
      var array = __eon_cols.map(function(arg){
        return [__eon_labels[arg] || arg, message[arg]];
      });
      return {
        columns: array
      };
    }
  });
</script>
```

# The final product

I thought this was a wearable! Right now we've just got a small computer, but it's nothing some creative engineering can't fix. Head over the Sports Authority and grab yourself a sweatband. Then, take a ride over to RadioShack and get a CR1632 coin sell battery for the TinyDuino.

![](http://i.imgur.com/whH2Qjs.jpg)

Cut a slit in the arm band, and slide the TinyDuino in there. Boom, now you've got your own internet connected wearable.

![](http://i.imgur.com/deLwBHO.jpg)