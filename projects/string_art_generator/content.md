See the code here: [https://github.com/usedhondacivic/string-art-gen](https://github.com/usedhondacivic/string-art-gen)

<iframe src="https://michael-crum.com/string-art-gen/?showUI=false" title="String art demo"></iframe>

*Use the full tool at [https://michael-crum.com/string-art-gen/](https://michael-crum.com/string-art-gen/)*

## What is string art?

String art, the process of creating images using a continous string wrapped around a frame of nails, was pioneered by engineer and artist [Petros Vrellis](https://www.instagram.com/pvrellis/?hl=en). The process seems like magic, creating order from a fundamentally chaotic tangle of string. The problem's unique mix of elegant engineering with physical beauty spoke to me, so I decided to create my own open source implementation. Heres the final product of a two string, black and white piece.

*insert images*

There a many videos attempting to explain the string art algorithm in simple ways, but they all leave out crucial details required for an actually decent result. [Some people even have good reason](https://www.etsy.com/listing/1327763781/personalized-couple-string-art-portrait?gpla=1&gao=1&&utm_source=google&utm_medium=cpc&utm_campaign=shopping_us_-craft_supplies_and_tools&utm_custom1=_k_Cj0KCQjwtJKqBhCaARIsAN_yS_mGeFugi4R-d-7-MYH1H85DCjKGxe5mnfCua8gPwnzKw2axQa2KG4MaAqgBEALw_wcB_k_&utm_content=go_12665398257_121762925993_511610210343_pla-295462056867_c__1327763781_156087082&utm_custom2=12665398257&gad_source=1&gclid=Cj0KCQjwtJKqBhCaARIsAN_yS_mGeFugi4R-d-7-MYH1H85DCjKGxe5mnfCua8gPwnzKw2axQa2KG4MaAqgBEALw_wcB) to keep the algorithm obfuscated for monetary gain. However, I believe the math and logic behind the algorithm is just as beautiful as the end result. This article is meant to give some insight to those hoping to write their own implementation.

Of course I had to add my own spice to the algorithm. Publicly available implementations all make a variety of limiting assumptions that reduce the creative freedom of the user. Commonly the size and shape of the frame is completely fixed (and a just boring circle), the color of the thread is fixed, and the number of colors is limited to one or two. Using principled software development, I was able to avoid all of these constraints and give the user ultimate creative control over their piece. Now, how does it actually work?

## From string to image

When developing a new algorithm, I like to avoid information paralysis by first breaking it down to it's core components. Thinking of the algorithm as a blank box, what are the desired inputs and outputs? Obviously we have an image, and we should also supply information about the frame (number of nails, shape, size, ect). On the other side of the algorithm we need some reprentation of the string that will allow us to actually construct the image in the real world. My choice was to number each nail $1 ... \#nails$ and output the "instructions" as an ordered list of nails.

<img src="./assets/flow_one.svg" alt="flow chart one" style="max-height:200px"/>

Knowing the output provides a good starting point for our algorithm - at each iteration, we need to pick which nail we want to connect to our current nail. This nail will be next in the list, and so on until we have the whole image.

<img src="./assets/flow_two.svg" alt="flow chart two" style="max-height:500px"/>

What I've described so far is known as a "greedy algorithm". It's greedy in the sense that at each iteration, the algorithm makes the decision that is best for it only in that moment. It doesn't consider the effect down the road or on any previous steps, just the current state. This is good because it durastically decreases the compute time for each step, but is bad because the algorithm will have no sense of how the strings "work together" in the final product. In this instance the greedy approach gives a good approximation in excelent time, but in other cases you might look into [dynamic programming](https://en.wikipedia.org/wiki/Dynamic_programming) to get a better solution.

### We have gradient descent at home

Now we a tractable greedy step: given our current nail, find the best nail to move to next. Best, in this context, means the nail that, when connected to, will cause the greatest improvement in the approximated image. It can also be thought of as the connection that minimizes the difference between the approximated image and the real image (also known as the error). By repeatedly following the connections that minimize error, the approximated image will eventally converge to the real image.

If you've studied computer science, optimization, or machine learning, the steps I outlined may sound very familiar. The greedy approach to the string art algorithm reduces to [gradient descent](https://www.youtube.com/watch?v=IHZwWFHWa-w)! While knowledge of gradient descent isn't necessary to understand this article, it's a great algorithm for your toolkit and is useful for many optimization problems.

<img src="./assets/flow_three.svg" alt="flow chart three" style="max-height:500px"/>

To use gradient descent we need to be able to calculate the error. As stated above, the error is the difference between the approximated image (the one being built from the string) and the original error. On computers, images are represented as pixels. Each pixel, in turn, is represented by three numbers representing red, blue, and green. For an image of size $n$ by $m$, this results in $n \cdot m \cdot 3$ values to represent the whole image. Therefore, the original image can be represented by a vector $\vec{o} \in \R^{3nm}$, and the approximated image as $\vec{a} \in \R^{3nm}$. We can then use any standard measure of distance between points to calculate the error. I chose to use the Euclidan norm

$$||\vec{o} - \vec{a}||_2 = \sqrt{(o_1 - a_1)^2 + (o_2 - a_2)^2 + ... + (o_n - a_n)^2}$$

### Tying it all together



## UI that doesn't scare people away

### How to make a tool people will actually use

### A love letter to D3.js (and SVG)

## Further research

* Radon transform

## Resources

