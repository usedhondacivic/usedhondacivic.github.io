![A screenshot of the game](./assets/spinout_background.jpg)

## WIP

This write up is under construction, come back soon for more :)

While you're waiting, you can [try the game here](http://spinout.eba-njr4i9hj.us-west-2.elasticbeanstalk.com/)

## Project Introduction

Inspired by the .io online multiplayer game boom, Spinout is my exploration of browser based online multiplayer gaming. I wanted experiment with the genre by building a stylized arcade style racer. This article walks through of how I achieved that goal, complete with all the trials and tribulations along the way. 

## Modeling a Car for Maximum Fun

Modeling a top down 2D car is fairly straight forward.

We can represent the car's state as two vector quantities, its position $\vec{x}$ and velocity $\vec{v}$, and a scalar rotation $\theta$. For now, lets assume the car has a constant acceleration of $a$ along $\theta$.

Newtons equations of motion give us the discrete update step:

$$
\vec{v}_{t} = \vec{v}_{t-1} + <\cos(\theta), \sin(\theta)> \times a \times dt \\ 
\vec{x}_{t} = \vec{x}_{t-1} + \vec{v}_{t-1} \times dt
$$

*insert demo*

As you can see, this car is controlling more like a spaceship. Without any simulated friction, the car will float off forever in whatever direction it is currently moving.

We can simulate friction by applying a dampening factor $(f)$ to the velocity:

$$
\vec{v}_{t} = \vec{v}_{t-1} \times (1 - (f * dt)) + <\cos(\theta), \sin(\theta)> \times a \times dt \\ 
\vec{x}_{t} = \vec{x}_{t-1} + \vec{v}_{t-1} \times dt
$$

*insert demo*

This friction is applied evenly in every direction to the car, and isn't very satisfying to control. In a real car, friction inline with the wheels is much lower than the friction perpendicular to them. This keeps the car moving straight and prevents the car from skidding in most circumstances. To simulate this effect we can decompose the velocity along $\theta$. Applying uneven dampening factors along $\theta$ and its orthogonal counterpart makes the car feel much more realistic.

*insert math*

*insert demo*

The dampening coefficients are tunable to get the feel you want from the car. I made the perpendicular friction low to encourage drifting and the arcady vibe I was targeting. Below is a code snippet implementing the car control.

*insert code*

### Car Collisions

The secret behind my collision engine (and many others) is that everything looks like a straight line if you zoom in close enough. By approximating all bodies in the game using straight lines, I only had to implement collision with one primitive: a line segment.

### Simulating Driving Surfaces

More driving surfaces means more variety, and more variety means more fun. It's really that simple folks.

Each time the car is updated, it queries the background texture for the pixel directly under itself. Because I'm using a stylized block color palate, the color of this pixel describes the surface the car is driving on.

Making the car feel different depending on the ground texture is as easy as tweaking the friction and acceleration values of the car. Sand has low friction and acceleration, causing the car to slow down and spinout. Grass has the same acceleration as pavement, but poor friction. This allows players to cut corners for shortcuts, at the risk of sliding uncontrollably. 

## Creating Racetracks

I am not talented in either art or racetrack design, so I made the age old decision to steal other peoples work. Rather than generate new racetracks, I used real F1 tracks as a basis for my tracks, then stylized and tweaked them to fit the feel of my game.

Instead of going through the pain of building a custom tool to generate the maps, I abused Adobe Illustrator to generate the map data. Illustrator is a tool for generating Vector Graphics, or images defined math mathematically by the shapes they contain rather than the color of their pixels. The game world consists of line segments (walls), areas of different ground materials, and an graphical layer for decorations. This turns out to be well represented by a common vector format, SVG.

```svg
<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 22.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 2000 1000" style="enable-background:new 0 0 2000 1000;" xml:space="preserve">
<style type="text/css">
	.st0{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#939393;stroke-width:70;stroke-miterlimit:10;}
	.st1{fill:none;stroke:#EC2527;stroke-width:0.75;stroke-miterlimit:10;}
	.st2{fill:none;stroke:#6FCCDD;stroke-miterlimit:10;}
</style>
<g id="Track">
	<path class="st0" d="M834.7,826.5l-154.8-27.7c0,0-26.4-5.1-42.4-11.1c-16.2-6-22.1-12.9-22.1-12.9l-68.2-123.5
		c0,0-19-21.5-38.7-33.2c-16.7-10.7-41.6-15.8-71.9-11.1c-30.3,4.7-64.5,12.9-64.5,12.9c-108.2,29.3-178.8,31.4-226.7,9.2
		C51,576.7,59.6,404.3,60.5,362s28.9-72.6,55.3-88.5c13.1-9.2,294.5-113.9,344.7-129c50.2-15.1,71.9,20.3,71.9,20.3
		s27.3,43.3,49.8,79.3c22.5,36,75.6,31.3,75.6,31.3s405.9-103.1,412.9-103.2c87.9-1,92,69.3,92.2,70c4.5,70.9-55.7,82-64.5,88.5
		c-19,7.9-77.4,1.8-77.4,1.8s-52.9-8.9-97.7-16.6c-41.5-8.2-62.7,12.9-62.7,12.9s-32.1,19.4-57.1,33.2c-25,13.8-68.2,5.5-68.2,5.5
		S341.5,317.7,259.6,314c-81.9-3.6-100.7,49.8-101.4,53.5c-23.8,71,24.1,106.2,31.3,112.4c47.6,36,118,33.2,118,33.2l805.6-79.3
		l184.3-5.5h175.1L1596,421c0,0,187.8-24.5,252.5-35c64.8-10.6,88.5,42.4,88.5,42.4s19.1,55.5-38.7,88.5
		c-50.9,17.5-100.6,38.2-147.5,49.8s-46.1,49.8-46.1,49.8s1.3,11.5,0,84.8c-1.3,73.3-70,73.4-79.3,73.7
		c-9.3,0.3-393.1-30.2-435-33.2c-42-3-49.2,17.1-57.1,27.7c-7.9,10.6-3.5,10-36.9,55.3c-33.4,45.3-81.1,33.2-81.1,33.2L834.7,826.5z
		"/>
</g>
<g id="Walls">
	<polygon class="st1" points="478,208.1 560.7,291.8 595.9,305 664.3,315 1073.1,219.1 1097.3,226.8 1101.7,249.9 1090.7,272 
		926.5,261.5 838.4,285.2 773.3,315 688.9,319.9 309.4,263.7 205.8,281.9 156.3,305.1 118.8,356.8 112.2,393.2 118.8,456 
		167.3,523.2 274.2,566.2 1113.8,493.5 1486.3,490.2 1861,446.1 1875.3,457.1 1711.1,504.5 1653.8,550.8 1635.1,597 1638.4,689.6 
		1604.2,706.1 1186.6,670.9 1123.8,684.1 1038.9,780 683,717.2 608.1,589.3 535.3,550.8 272,579.4 194.8,584.9 147.5,545.3 
		112.2,471.4 112.2,342.5 135.3,309.4 214.9,274.3 457.1,194.8 	"/>
	<polygon class="st1" points="33.8,272.5 68,233.9 466.1,77.9 518.1,77.9 558.2,103.1 626.6,194.8 645.9,208.6 1053,103.1 
		1122.8,103.1 1201.5,132.9 1231.2,194.8 1231.2,281.4 1211.9,326 1152.5,373.5 1085.6,382.4 1021.8,382.4 914.8,369.1 880.6,373.5 
		843.5,397.3 798.9,412.7 755.8,416.6 255.2,375 229.9,401.8 240.3,435.8 296.8,452.3 706.8,428.5 1103.5,389.9 1451.1,382.4 
		1862.7,329 1928,337.9 1978.5,388.4 1991.9,459.7 1974.1,526.6 1926.5,572.6 1769.1,621.6 1755.7,750.9 1740.8,798.4 1685.9,834.1 
		1599.7,846 1214.9,817.7 1148,886.1 1093.1,917.3 1012.9,924.7 617.7,859.3 576.1,843 492.9,691.5 440.9,673.6 225.5,719.7 
		112.2,704.8 33.8,626.1 11.5,557.8 11.5,314.1 	"/>
</g>
<g id="Spawns">
	<circle class="st2" cx="1308.2" cy="439.7" r="3.9"/>
	<circle class="st2" cx="1308.2" cy="416.6" r="3.9"/>
	<circle class="st2" cx="1339.2" cy="416.6" r="3.9"/>
	<circle class="st2" cx="1339.2" cy="439.7" r="3.9"/>
	<circle class="st2" cx="1373" cy="416.6" r="3.9"/>
	<circle class="st2" cx="1373" cy="439.7" r="3.9"/>
	<circle class="st2" cx="1406.3" cy="416.6" r="3.9"/>
	<circle class="st2" cx="1406.3" cy="439.7" r="3.9"/>
	<circle class="st2" cx="1438.3" cy="416.6" r="3.9"/>
	<circle class="st2" cx="1438.3" cy="439.7" r="3.9"/>
</g>
</svg>
```

In Illustrator, I can open a satellite view of a track, trace the relevant details, add metadata (AI waypoints, spawn locations, ect), and export the completed map as an SVG.

## AI

## Netcode

## Dockerization and Deployment to AWS

## Issues, Improvements, and Future Work

The huge, jarring, game ruining issue is the lag. Running on LAN the game performed flawlessly, but introducing the delays of the open internet makes the game nearly unplayable. I would like to revisit the project in the future to

## Details for the Nerds

This post glossed over most implementation details for the sake of brevity, but the code explains the gory details much better than a writeup could. The full source code is available on [my GitHub](), and if you have any questions I am always happy to chat :)