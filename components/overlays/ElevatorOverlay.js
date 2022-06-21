import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

export default class ElevatorOverlay extends React.Component {
	render() {
		return (
			<>
			<ReactMarkdown children={`
## Preseason Project: Elevator Bot

An individual project created to learn about computer aided design and fabrication.
					
Taken from inception to reality in under a month.

The first CAD designed system created by 3648, bringing the team inline with competitive standards and setting precedent for future seasons.

Check out the [CAD on OnShape](https://cad.onshape.com/documents/2638b1fbc9a97c197a516962/w/94baea28c309a62481d243fb/e/dbb2a3ab6cb6bb470a024fb5?renderMode=0&uiState=62abaf3219b28f5d66178544)

And the code on [Github](https://github.com/usedhondacivic/FRC-Elevator-Bot)
			`} />
			<details>
				<summary>Read the write up</summary>
				<ReactMarkdown rehypePlugins={[rehypeRaw]} children={`
### Preseason Project
Before the season began, I experimented with the CAD program OnShape. I decided to model and build an elevator as practice before the real season. One of our mentors had recently bought a CNC router and was happy to help me fabricate the parts for my design. In just over four weeks, I designed and built a functional elevator robot with the help of a few friends. The elevator worked phenomenally, and it was the first subsystem to ever be produced by 3648 using computer-aided design.

<p float="left">
    <img alt="Elevator bot from the back" src="pictures/FRC_2020/elevator_back.jpg" height="280">
    <img alt="Elevator CAD" src="pictures/FRC_2020/elevator_cad.jpg" height="280"/> 
    <img alt="Elevator bot from the front" src="pictures/FRC_2020/elevator_front.jpg" height="280"/>
</p>

> ##### The CAD model for the elevator bot next to the fabricated version

This project proved the feasibility of using CAD in our shop and paved the way for using CAD for design and rapid prototyping for the rest of the season.
				`} />
			</details>
			</>
		)
	}
}