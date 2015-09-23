# Getting started with Phonegap and Bluetooth

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
Evt Disconnected/Advertising timed out
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

# Where to go from here

We're just getting started. Follow along in the next part of the tutorial where we'll add an accelerometer to our microcontroller and create our own mobile app!