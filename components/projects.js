import React from 'react'

import total_overlay from '../styles/layouts/total_overlay.module.css'
import side_by_side_overlay from '../styles/layouts/side_by_side_overlay.module.css'

import NoisePlanetProject from '../data/projects/Raymarching/NoisePlanetProject'
import MandlebulbProject from '../data/projects/Raymarching/MandlebulbProject'
import Hello from '../data/projects/Welcome/hello'
import TurretProject from '../data/projects/Robots/TurretProject'
import ElevatorProject from '../data/projects/Robots/ElevatorProject'

import FRCOverlay from './overlays/FRCOverlay'
import ElevatorOverlay from './overlays/ElevatorOverlay'
import HelloOverlay from './overlays/Hello'

function projectContainer(ProjComp, OverlayComp, layout) {
	return class Ret extends React.Component {
		active = false;

		constructor(props) {
			super(props);
			this.checkActive = this.checkActive.bind(this);
			this.containerRef = React.createRef();
			this.childRef = React.createRef();
		}

		componentDidMount() {
			window.addEventListener('scroll', () => { this.checkActive() });
			this.checkActive();
		}

		checkActive() {
			let visible = this.checkVisible(this.containerRef.current);
			if (this.active != visible) {
				this.active = visible;
				this.childRef.current.onActiveChange(this.active);
			}
		}

		checkVisible(elm) {
			let threshold = 100;
			let mode = 'visible';

			var rect = elm.getBoundingClientRect();
			var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
			var above = rect.bottom - threshold < 0;
			var below = rect.top - viewHeight + threshold >= 0;

			return mode === 'above' ? above : (mode === 'below' ? below : !above && !below);
		}

		render() {
			return (
				<div className={layout != null ? layout.slideContainer : total_overlay.slideContainer}>
					<div className={layout != null ? layout.projectContainer : total_overlay.projectContainer} ref={this.containerRef}>
						<ProjComp parentRef={this.containerRef} ref={this.childRef} />
					</div>
					<div className={layout != null ? layout.overlayContainer : total_overlay.overlayContainer}>
						{OverlayComp != null ? <OverlayComp projRef={this.childRef} {...this.props} /> : <></>}
					</div>
				</div>
			)
		}
	}
}

const HelloComp = projectContainer(Hello, HelloOverlay, total_overlay);

const Planet = projectContainer(NoisePlanetProject);

const Bulb = projectContainer(MandlebulbProject);

const Turret = projectContainer(TurretProject, FRCOverlay, side_by_side_overlay);

const Elevator = projectContainer(ElevatorProject, ElevatorOverlay, side_by_side_overlay);

export { HelloComp, Planet, Bulb, Turret, Elevator }