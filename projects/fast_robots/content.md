## WIP

This write-up is under construction! Come back soon for more :)

## Introduction

In robotics, we often find ourselves attempting to do more with less. Computers, actuators, and sensors are never as fast, strong, or accurate as we would like, so we need to use very clever design to make them achieve peak performance. The purpose of this project was taking this idea to the extreme: could I get reasonable results using the absolute bare minimum in hardware. And no, this totally had nothing to do with being a broke college student.

The platform I used for this robot is a cheap RC car from Amazon, designed for doing stunts. I'll first cover the physical and electrical modifications I made to the car, then get into the fun applications and the software algorithms that enabled them.

Its worth noting that this article is a massively abbreviated version of my [full build log](https://michael-crum.com/FAST-ROBOTS-2023/intro/), and primarily serves as an entertaining overview. For all of the real technical details, you should check out the full build log (linked above) and [the source code](https://github.com/usedhondacivic/FAST-ROBOTS-2023).

## Brain Surgery on a Car  

A toy car is electrically very simple. The one I'm using has one motor per side, connected to a microcontroller that converts information from the remote control into speed commands. For complicated processing and communication, the integrated controller is totally inadequate. I used the [SparkFun Artemis Nano](https://www.sparkfun.com/products/15443) microcontroller as a replacement, which boasts a 48Mhz clock, 1MB flash, 384k RAM, and built in Bluetooth. This gives me plenty of clock cycles to play with and greatly simplifies my communication solution.

A microcontoller is nothing with some peripherals, so I tricked out the car with some more gear. To control the motors, I used two [dual channel motor drivers](https://www.digikey.com/en/products/detail/pololu-corporation/2130/10450426), using two channels per motor to get 2.4 A output per motor. For sensing, I went for a [9 Degree of Freedom IMU](https://www.mouser.com/ProductDetail/SparkFun/SEN-15335?qs=uwxL4vQweFMcls1MYZT00A%3D%3D) and two [Time of Flight sensors](https://www.pololu.com/product/3415) rated for 4 meters of range.

The sensor peripherals all communicate over I2C, and I used the SparkFun QWIIC connector system that is built into the Artemis. QWIIC is just a dedicated connector and cables for I2C, but makes prototyping much quicker and more reliable.

After cutting the cables and removing the included control hardware, I soldered the motor leads into my motor drivers and wired all the peripherals into the artemis. Two 3.7V 850mAh LiPo batteries provide power, one dedicated to the motors and the other to the control electronics. Isolating the power source minimizes electromagnetic interference between the motors and sensors, a common issue when using brushed (or really any) motors.

![The car's electronics installed](./assets/car_electronics.jpg)

> *The car's electronics installed, featuring my scribbled labels*

I also designed and 3D printed a guard to protect the ToF sensors from inevitable crashes.

![The tof guard](./assets/tof_guard.jpg)

> *The guard for the ToF sensors*

All together this package comes in at well under $100.

## Software Basis

I'll get to the cool applications soon, but first I want to cover some basic software techniques that enable the more complicated stuff that's coming up.

### Software Stack

The Artemis Nano is compatible with the Arduino Core, allowing use of a wide variety of libraries and drivers. The ToF sensors and IMU have drivers from their vendors, and the motor drivers are simple to interface with using PWM. Similarly, the Bluetooth Low Energy (BLE) module on the Artemis is supported by an Arduino Core library.

The Artemis is a wonderful little powerhouse, but for computationally expensive tasks it is just not fast enough. I instead offload data to my laptop over BLE, compute the relevant values using Python, then send them back. For Python-side BLE communication I used the Bleak module. The other Python heavy-lifters are the usual suspects, namely Numpy for computation and Matplotlib for plotting.

### Sensor Fusion

On the best of days, data from cheap sensors is noisy and full of errors. On a bad day, say when placed right next to two brushed EMI generating nightmares, they can become downright unusable.

To combat the noise associated with individual readings, roboticist use a technique called sensor fusion. Sensor fusion is combing two or more readings to generate a more accurate final signal. A classic example (and the one I implemented) is combining accelerometer and gyroscope readings to get a measure of rotation.

First off, how do you measure rotation with an accelerometer? Earths gravitational field causes a downward acceleration of $9.81 m/s^2$ on all objects, which is also measured by the accelerometer. By determining the direction of gravitational acceleration relative to the accelerometer you can find the accelerometers pitch and yaw.

Due to their design, accelerometers are plagued by high frequency noise leading to unreliable point readings. On the other end of the spectrum, gyroscopes have almost no noise but drift slowly over time. We can think of this as extremely low frequency noise, $f=0$. What we really want is our signal to have the correct 'center' from the accelerometer combined with the low noise from the gyroscope.

The filter that gives this effect is called a complementary filter. The basic operating principle is applying a high-pass filter to the gyroscope (allowing for sudden changes but filtering out drift over time) and a low-pass filter to the accelerometer (maintaining the true center relative to gravity) and summing them.

Below is the code for implementing such a filter:

```cpp
// Time since last read
float dt = (float)(millis() - sensor_readings.gyro.stamp) / 1000.0; 

// Compute the accel roll and pitch from gravitational acceleration
float roll = atan2(sensor_readings.accel.y, sensor_readings.accel.z) * (180.0 / 3.14);
float pitch = atan2(sensor_readings.accel.x, sensor_readings.accel.z) * (180.0 / 3.14);

// Mathematically equivalent to low passing accel and high passing gyro
float gyro_favor = 0.98;
pose.rot.x = (gyro_favor) * (pose.rot.x + myICM.gyrX() * dt) + (1.00 - gyro_favor) * (roll);
pose.rot.y = (gyro_favor) * (pose.rot.y - myICM.gyrY() * dt) + (1.00 - gyro_favor) * (pitch);
// We cannot compute yaw from accel because the z axis is parallel to gravity
pose.rot.z = sensor_readings.gyro.z;
```

![Graph showing the complimentary filter output](./assets/complementary.png)

As you can see from the graph, the accelerometer is noisy (blue and orange) and the gyro drifts (dark green and mint), yet the complimentary output rejects noise while staying centered on the accelerometer data (purple and red).


### PID Control

### Wireless Communication and Logging


## Mapping the Surroundings

Ok now we're ready for the real juicy stuff. How about mapping out a room?

![The generated map of the room](./assets/room_post_tweek.png)

## Localization and Navigation

Now that we have a map of our room, can we use it to figure out where the robot is? This is a common problem in robotics, known as localization.

### The Bayes Filter

## Using Kalman Filters for Optimized Drifting

## Resources and Special Thanks

See a full listing of the code [here](https://github.com/usedhondacivic/FAST-ROBOTS-2023).

This article is a massively abbreviated version of my [full build log](https://michael-crum.com/FAST-ROBOTS-2023/intro/). Check that out if you want any of the specifics.

This robot was developed as part of ECE 4160: Fast Robots at Cornell University. My work builds off of course starter code and also of the work from past students. You can find all of their pages [here](https://cei-lab.github.io/FastRobots-2023/StudentPages.html), and I am so grateful for their help. Special thanks to Professor Kirstin Petersen for running a fantastic class.