# Getting started with Phonegap and Bluetooth

Have you ever wanted to create your own Bluetooth app? Bluetooth is one of the most popular protocols for wireless communication between devices. Bluetooth powers a countless number of devices, from Bluetooth speakers, to smartwatches, headsets, fitness trackers, and more.

This two part tutorial will walk you through how you can create your own Bluetooth fitness tracker using Arduino and Phonegap. You might not have any experience with Arduino or Phonegap, but don't worry! Both technologies are extremely simple and were not even going to wire anything! In fact, we'll be talking to our Arduino over Bluetooth before we even have to write a line of code.

# Hardware

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

Stack the components one on top of another like this:

* USB
* Processor

Now you've got a super tiny Arduino platform! In fact, once you're done programming the TinyDuino you can throw a watch battery into the Processor shield and remove the USB shield altogether! Not yet though, we still have business to take care of.

Open the Arduino IDE, plug in the Micro USB cable into the TinyDuino, and load the normal Blink sketch. Choose "Arduino Pro or Pro Mini (3.3V, 8MHz)."

If you need more help with getting Blink running on the TinyDuino, TinyCircuits has a great [getting started guide](https://www.tiny-circuits.com/learn/tinyduino-setup).

Once you've got blink running you're ready for the next step!

# Arduino Bluetooth 

Alright, let's get down to the fun parts. Snap the TinyDuino Bluetooth Low Energy shield onto the top of your stack. It should look something like this now:

* Bluetooth
* USB
* Processor

At this point we're going to step away from the Arduino IDE and instead use an online tool called CodeBender. CodeBender is an awesome cloud based Arduino programming interface that allows us to program our board using the browser. TinyDuino distributes their examples via CodeBender. You will need to install an extension to interface with your Arduino, but trust me, it's worth it.

Close the Arduino IDE (important!) and load [this CodeBender sketch](https://codebender.cc/sketch:91073). Select "TinyDuino" under board and find your Arduino USB location. Finally, click "Run On Arduino."

(Need to open package to find out what happens from here)

Fire up the Serial Monitor on CodeBendre and select 115200 Baud. The example will update you with Bluetooth logs throughout the connection process. 

After a few seconds you should see the message "Advertising Started" in the Serial Monitor. 

# Use your phone to talk to the Arduino

Once you've confirmed that the Bluetooth sketch is running, you're ready to make your first connection! You may not see the Arduino within your Bluetooth devices on your phone, but don't worry, this isn't how you'll be connecting to the device.

Instead, we'll connect through our application. But before we use our own application, we're going to use an official application for debugging purposes. 

Download the nrf UART 2.0 app for [Android](https://play.google.com/store/apps/details?id=com.nordicsemi.nrfUARTv2&hl=en) or [iPhone](https://itunes.apple.com/us/app/nrf-uart/id614594903?mt=8) and launch it.

If your Arduino is powered on, you should see a device called "URT" available. Tap on that device, and then a console should appear on your phone.

As you send messages via your phone, you should see them echo'd within the CodeBender console. Congratulations! You've created a basic bluetooth device.