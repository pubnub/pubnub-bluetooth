# Hardware based on here:

https://tiny-circuits.com/

# Arduino should be running this code:

https://codebender.cc/sketch:147004

## Adafruit UART

Use the [callbackEcho sketch](https://github.com/adafruit/Adafruit_nRF8001/blob/master/examples/callbackEcho/callbackEcho.ino) and see [Adafruit's tutorial](https://learn.adafruit.com/getting-started-with-the-nrf8001-bluefruit-le-breakout/software-uart-service) for setting up the hardware and Arduino code.

Hardware

 * [Arduino](http://www.adafruit.com/products/50)
 * [BluefruitLE](http://www.adafruit.com/products/1697)

This example will also connect to the [Adafruit Bluefruit LE Friend](https://www.adafruit.com/products/2267).

Install

    $ cordova platform add android ios  
    $ cordova plugin add cordova-plugin-ble-central
    $ cordova plugin add https://github.com/apache/cordova-plugin-whitelist.git#r1.0.0
    $ cordova run


## Accel

## SD

readwrite from SD library

## bluetooth

online tiny circuits demo