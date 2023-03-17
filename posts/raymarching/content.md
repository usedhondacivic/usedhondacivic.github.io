
This write up is under construction, come back soon for more :)

*Warning: Some demos on this page are graphically demanding. I recommend enabling GPU acceleration for your web browser for the best experience.*

<iframe src="https://michael-crum.com/ThreeJS-Raymarcher/mandlebulb" title="Raymarching Demo"></iframe>
> *Click and drag to rotate, scroll to zoom, right click to pan*

## What is Ray Marching?

You might be familiar with ray tracing, ray marching’s better known cousin. Ray tracing is a rendering process that uses math to simulate light bouncing around a scene before entering the camera. By computing the path light takes to enter each pixel of the screen, we can determine the color of that pixel based on material properties and lighting. For a simple one file demo of ray tracing, check out [my Javascript implementation](https://michael-crum.com/Js-Raycaster-V1/). 

Ray tracing gives stunning results, but is exceptionally computationally expensive. The main issue lies in the time complexity of ray intersection math, which must be performed many times for each pixel. 

Ray marching follows the same concept as ray tracing (following rays through space), but lowers the load through some computational cleverness.

### Signed Distance Fields (SDFs)

If computing exact ray-world intersections is too costly, what are our options? Ray marching uses an iterative approach based on Signed Distance Fields (SDFs). Instead of computing an exact intersection, the ray marching algorithm queries the lowest distance between a point and any location on an object.

Once we know the minimum distance to an object, we can safely step along any ray by that amount and not risk intersecting it. Stepping along the ray yields a new point, from which we can find a new minimum distance, step along the ray once more, and repeat.

<iframe src="https://michael-crum.com/ThreeJS-Raymarcher/2d_demo.html" title="2D Demo"></iframe>

SDFs are remarkably efficient, even for many shapes that appear complicated at first glance. Check out [Inigo Quilez's site](https://iquilezles.org/articles/distfunctions/) giving SDFs for a huge number of primitives.

### Combining SDFs

<iframe src="https://michael-crum.com/ThreeJS-Raymarcher/2d_demo_combining.html" title="2D Demo"></iframe>

### Infinite Repetition

### Ambient Occlusion and Glow

### Fractal Distance Fields

## My Implementation

### Using Three.js and GLSL

### Pixel Shaders

## More Resources