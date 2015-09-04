# Arduino should be running this code:

https://codebender.cc/sketch:147004

## Adafruit UART

UART example using an Arduino and [Adafruit's Bluefruit LE](http://www.adafruit.com/products/1697) breakout board.

Use the [callbackEcho sketch](https://github.com/adafruit/Adafruit_nRF8001/blob/master/examples/callbackEcho/callbackEcho.ino) and see [Adafruit's tutorial](https://learn.adafruit.com/getting-started-with-the-nrf8001-bluefruit-le-breakout/software-uart-service) for setting up the hardware and Arduino code.

Hardware

 * [Arduino](http://www.adafruit.com/products/50)
 * [BluefruitLE](http://www.adafruit.com/products/1697)

This example will also connect to the [Adafruit Bluefruit LE Friend](https://www.adafruit.com/products/2267).

Install

    $ cordova platform add android ios  
    $ cordova plugin add com.megster.cordova.ble
    $ cordova plugin add https://github.com/apache/cordova-plugin-whitelist.git#r1.0.0
    $ cordova run


## Accel

/*
TinyDuino Accelerometer Demo
  
May 25 2014, by Ben Rose

This example code is in the public domain.

http://www.tiny-circuits.com

*/


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



## SD

readwrite from SD library

## bluetooth

online tiny circuits demo