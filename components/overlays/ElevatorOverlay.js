import React from 'react'
import ReactMarkdown from 'react-markdown'

export default class ElevatorOverlay extends React.Component {
	render() {
		return (
			<ReactMarkdown children={`
## Preseason Project: Elevator Bot

An individual project created to learn about computer aided design and fabrication.
					
Taken from inception to reality in under a month.

The first CAD designed system created by 3648, bringing the team inline with competitive standards and setting precedent for future seasons.

Check out the [CAD on OnShape](https://cad.onshape.com/documents/2638b1fbc9a97c197a516962/w/94baea28c309a62481d243fb/e/dbb2a3ab6cb6bb470a024fb5?renderMode=0&uiState=62abaf3219b28f5d66178544)

And the code on [Github](https://github.com/usedhondacivic/FRC-Elevator-Bot)
			`} />
		)
	}
}