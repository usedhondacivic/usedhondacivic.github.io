import React from 'react'
import styles from '../../styles/projects/spinout.module.css'

import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

export default class SpinoutOverlay extends React.Component {
	render() {
		return (
			<div className={styles.spinout} >
				<object data="pictures/Spinout/Spinout.svg" type="image/svg+xml" id="title"></object>
				<p>Spinout is an online muli-player, top down, arcade style racer.
					Slide, drift, and bounce your way to victory on recreations of real F1 tracks.</p>
				<p>I built Spinout over the course of two years, creating both the front and back end from scratch.
					This includes networking, graphics, physics, database management, AI, and more.</p>
				<p>Play the <a href="http://spinout.eba-njr4i9hj.us-west-2.elasticbeanstalk.com">game</a></p>
				<p>And see the code on <a href="https://github.com/usedhondacivic/Node-Drift-Car">github</a></p>
				<details>
					<summary>Read the write up</summary>
					<ReactMarkdown rehypePlugins={[rehypeRaw]} children={`
## Overview
From my elevator pitch submitted with Spinout to the 2019 SkillsUSA Game Design Competition:
>Spinout is a top-down multiplayer racing game designed to feel arcadey, fast-paced, and drifty. Players compete against their friends in chaotic 10 person races across beautifully minimalist tracks modeled after real-life circuits. Knock around your opponents and squeeze around corners with one of many customizable pixel art cars. Talk strategy or trash over the fully-featured chat system in customizable game rooms. Spinout offers simple controls that are effortless to pick up for beginners, yet deep enough for advanced techniques like drifting, shortcuts, and bouncing. Top players can compete for spots on worldwide leaderboards for the fastest lap and circuit time on each map.

## Design and development
Spinout was a game of many firsts. It was my first multiplayer game, first racing game, and first time using Node.js or really any server-side language at all. 

I started by prototyping driving mechanics in a Processing.js sandbox, to make sure I nailed the feel of the controls. Satisfied with the handling, I started converting my code to work over the network. I decided to go with the simplest network topography I could manage, in which all physics and game calculations were run on the server-side, and all the client did was send input and render what the server sent back. This ended up working great, so I moved on to flesh out the rest of the mechanics. At this point, I had was some colored blocks driving around a map together over LAN. I implemented walls as straight-line "fences" that the players would rebound off if they ran into them. I also implemented collision between players, which made the game feel chaotic and fun.

<p float="left">
    <img alt="Spinout progression one" src="pictures/Spinout/spinout_1.jpg" width="325"/>
    <img alt="Spinout progression two" src="pictures/Spinout/spinout_2.jpg" width="325"/>
</p>
<p float="left">
    <img alt="Spinout progression three" src="pictures/Spinout/spinout_3.jpg" width="325"/>
    <img alt="Spinout progression four" src="pictures/Spinout/spinout_4.jpg" width="325"/>
</p>

> ##### Progression of the game as it was developed

I still didn't have a track to work with, so it wasn't much of a game yet. I toyed around with programming a custom track generator but eventually binned the idea because it was turning into a complicated mess. Instead, I looked into the SVG file format. SVG's are vector graphics files, where each shape is defined by a series of equations. This is great because I could rip the data from the file to generate the walls, track, decorations, and AI data. I used Illustrator to design my tracks based on real-life race circuits. In Illustrator I could put different objects on different layers, and parse them separately in my code. I used this feature to embed spawn points, walls, and the AI navigation waypoints all into the same file as the background textures. Using this method I could turn out a playable track in under 30 minutes. 

To get an approximation of what surface the car was on (be it grass, sand, or pavement), I used a scaled-down version of the track texture and ran a color check on the pixel under the middle of the car. 

<img alt="Mugello circuit, SVG" src="pictures/Spinout/mugello_mainboard.svg" height="280"/>
<img alt="Mugello circuit, satilite view" src="pictures/Spinout/mugello_sat.jpg" height="280"/>

> ##### Mugello Circuit, Tuscany, Italy <br> Stylized SVG track (top), Satilite view of real track (bottom)

At this point, I had a playable game, and it was time to add some bells and whistles. I used Photoshop to design some car sprites and invited my friends to make some as well. I added AI bots that follow waypoints and have varying levels of difficulty, which I could randomize to give the computer players character. A racing game would be incomplete without a good UI, so I added a rank display, a chat bar, and a welcome screen. The welcome screen features character customization where the player can pick a name and color their car, which was great for making the player's car stick out among the rest of the pack. Finally, I made a server select screen where players could host or find a game. 

<img alt="Spinout home screen" src="pictures/Spinout/spinout_home.jpg" width="325"/>
<img alt="Spinout character select screen" src="pictures/Spinout/spinout_character.jpg" width="325"/>
<img alt="Spinout server screen" src="pictures/Spinout/spinout_server.jpg" width="325"/>

> ##### Spinout UI

## Review
Spinout is one of my favorite projects I've worked on, but it came with more challenges than I would have hoped. The major problems surfaced near the end of the project, where several bad design decisions I made with my networking came back to bite me. The game lagged significantly when loaded with just 10 players, and I hadn't programmed it in a way that I could split the load across multiple threads or servers. Fatal net code means that this version will never see a public release, but I learned how to build it correctly the next time I attempt something like this. I hope to one day go back and implement the backend in something more flexible and efficient then Node, but for now, you can find my source code on [my GitHub](https://github.com/usedhondacivic/Node-Drift-Car). 
				`} />
				</details>
			</div>

		)
	}
}