# Build an internet connected Bluetooth wearable with Arduino and Phonegap

Have you ever wanted to create your own Bluetooth app? Bluetooth is one of the most popular protocols for wireless communication between devices. Bluetooth powers a countless number of devices, from Bluetooth speakers, to smartwatches, headsets, fitness trackers, and more.

This two part tutorial will walk you through how you can create your own Bluetooth fitness tracker using Arduino and Phonegap. You might not have any experience with Arduino or Phonegap, but don't worry! Both technologies are extremely simple and were not even going to wire anything! In fact, we'll be talking to our Arduino over Bluetooth before we even have to write a line of code.

# Hardware

![](http://i.imgur.com/RjFdxZy.jpg)

First things first. This ain't your momma's software demo, we're gonna need some real hardware for this one. Everything here should cost you just less than $100 and at the end of it all you'll be communicating wirelessly between your phone and an Arduino like magic.

We're going to be using TinyCircuits products for the Arduino side of things? Why? Because TinyCircuits is a totally awesome miniature Arduino platform about the size of a quarter. The shields snap together like LEGOs, leaving us nothing to wire.

Even better, the TinyDuino are so small that they can function as a fitness band themselves! No need to ship your schematics off to China, just strap these babies onto your wrist and you'll be a self gamified cyborg in no time.

# What you need

So here's the big list of the stuff you gotta have:

* An Android or iOS device
* The respective syncing cable for above device
* TinyCircuits TinyDuino Basic Kit
* TinyCircuits Accelerometer Tinyshield
* TinyCircuits Bluetooth Low Energy
* A microusb cable with data capabilities for TinyDuino

I'm betting you already have an Android or iOS device on you. I bought all the TinyDuino stuff at my local Fry's Electronics. You can find it near the Arduino gear.

If you don't live near a Fry's, you can order the products online here.

Note: This hardware list uses a Nordic Bluetooth Low Energy chip. Bluetooth Low Energy (BLE) is designed to provide similar features to Bluetooth with reduced power consumption.

# Getting Started

Let's get it started in here. Pop open the clamshell packaging that the TinyDuino components come in. We're going to be working with the Processor and USB shield for now.

![](http://i.imgur.com/1ZqLKuU.jpg)

Stack the components one on top of another like this:

* USB
* Processor

![](http://i.imgur.com/PRfK4Py.jpg)

Now you've got a super tiny Arduino platform! In fact, once you're done programming the TinyDuino you can throw a watch battery into the Processor shield and remove the USB shield altogether! Not yet though, we still have business to take care of.

Open the Arduino IDE, plug in the Micro USB cable into the TinyDuino, and load the normal Blink sketch. Choose "Arduino Pro or Pro Mini (3.3V, 8MHz)."

If you need more help with getting Blink running on the TinyDuino, TinyCircuits has a great [getting started guide](https://www.tiny-circuits.com/learn/tinyduino-setup).

Once you've got blink running you're ready for the next step!

# Arduino Bluetooth 

![](http://i.imgur.com/d4Qn9pQ.jpg)

Alright, let's get down to the fun parts. Snap the TinyDuino Bluetooth Low Energy shield onto the top of your stack. It should look something like this now:

* Bluetooth
* USB
* Processor

![](http://i.imgur.com/lTR2X2z.jpg)

At this point we're going to step away from the Arduino IDE and instead use an online tool called CodeBender. CodeBender is an awesome cloud based Arduino programming interface that allows us to program our board using the browser. TinyDuino distributes their examples via CodeBender. You will need to install an extension to interface with your Arduino, but trust me, it's worth it.

Close the Arduino IDE (important!) and load [this CodeBender sketch](https://codebender.cc/sketch:91073). Select "TinyDuino" under board and find your Arduino USB location. Finally, click "Run On Arduino."

(Need to open package to find out what happens from here)

Fire up the Serial Monitor on CodeBendre and select 115200 Baud. The example will update you with Bluetooth logs throughout the connection process. 

After a few seconds you should see the following messages in the Serial Monitor:

```
Evt Device Started: Standby
Advertising started
```

# Use your phone to talk to the Arduino

Once you've confirmed that the Bluetooth sketch is running, you're ready to make your first connection! You may not see the Arduino within your Bluetooth devices on your phone, but don't worry, this isn't how you'll be connecting to the device.

Instead, we'll connect through our application. But before we use our own application, we're going to use an official application for debugging purposes. 

Download the NRF UART 2.0 app for [Android](https://play.google.com/store/apps/details?id=com.nordicsemi.nrfUARTv2&hl=en) or [iPhone](https://itunes.apple.com/us/app/nrf-uart/id614594903?mt=8) and launch it.

Launch the UART app and tap the button marked "connect."

If your Arduino is powered on, you should see a device called "URT" available. Tap on that device, and then a console should appear on your phone.

![](http://i.imgur.com/dtVswda.png)

Your phone will pair with your Arduino project and you should see the message "Connected to URT."

![](http://i.imgur.com/ZYFJC5N.png)

If you're having trouble connecting, make sure your Arduino is powered on, Bluetooth is enabled on your phone, and the Arduino device is within range. Check the Arduino Serial output on CodeBender for more debug information.

Once you've connected, you can type into the text field below and begin to send messages to your Arduino!

![](http://i.imgur.com/Ocnsn8m.png)

As you send messages via your phone, you should see them echo'd within the CodeBender console as well as in the NRF UART log. Congratulations! You've created a basic Bluetooth device.

At the end of this short test, my Serial Console had the following log:

```
Evt Device Started: Standby
Advertising started
Evt Connected
Evt Pipe Status
Evt Pipe Status
Evt link connection interval changed
Pipe Number: 11
4 bytes: test
4
test
```

---------------------

# Part 2

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