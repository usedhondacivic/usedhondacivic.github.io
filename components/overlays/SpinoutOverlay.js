import React from 'react'
import styles from '../../styles/projects/spinout.module.css'

import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

export default class SpinoutOverlay extends React.Component {
	render() {
		return (
			<div className={styles.spinout} >
				<img src="pictures/Spinout/Spinout.svg" id="title" />
				<p>Spinout is an online muli-player, top down, arcade style racer.
					Slide, drift, and bounce your way to victory on recreations of real F1 tracks.</p>
				<p>I built Spinout over the course of two years, creating both the front and back end from scratch.
					This includes networking, graphics, physics, database management, AI, and more.</p>
				<p>Play the <a href="http://spinout.eba-njr4i9hj.us-west-2.elasticbeanstalk.com">game</a></p>
				<p>And see the code on <a href="https://github.com/usedhondacivic/Node-Drift-Car">github</a></p>
				<details>
					<summary>Gallery</summary>
					<ReactMarkdown rehypePlugins={[rehypeRaw]} children={`
<img alt="Spinout progression one" src="pictures/Spinout/spinout_1.jpg" width="500"/>
<img alt="Spinout progression two" src="pictures/Spinout/spinout_2.jpg" width="500"/>
<img alt="Spinout progression three" src="pictures/Spinout/spinout_3.jpg" width="500"/>
<img alt="Spinout progression four" src="pictures/Spinout/spinout_4.jpg" width="500"/>

> ##### Progression of the game as it was developed

<img alt="Mugello circuit, SVG" src="pictures/Spinout/mugello_mainboard.svg" height="280"/>
<img alt="Mugello circuit, satilite view" src="pictures/Spinout/mugello_sat.jpg" height="280"/>

> ##### Mugello Circuit, Tuscany, Italy. Stylized SVG track (top), Satilite view of real track (bottom)

<img alt="Spinout home screen" src="pictures/Spinout/spinout_home.jpg" width="500"/>
<img alt="Spinout character select screen" src="pictures/Spinout/spinout_character.jpg" width="500"/>
<img alt="Spinout server screen" src="pictures/Spinout/spinout_server.jpg" width="500"/>

> ##### Spinout UI
			`} />
				</details>
			</div>

		)
	}
}