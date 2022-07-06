import React from 'react'

import total_overlay from '../styles/layouts/total_overlay.module.css'
import side_by_side_overlay from '../styles/layouts/side_by_side_overlay.module.css'

import NoisePlanetProject from '../data/projects/Raymarching/NoisePlanetProject'
import MandlebulbProject from '../data/projects/Raymarching/MandlebulbProject'
import Hello from '../data/projects/Welcome/hello'
import TurretProject from '../data/projects/Robots/TurretProject'
import { ElevatorUpProject, ElevatorDownProject } from '../data/projects/Robots/ElevatorProject'
import IntakeProject from '../data/projects/Robots/IntakeProject'
import FullBotProject from '../data/projects/Robots/FullBotProject'

import FRCOverlay from './overlays/FRCOverlay'
import ElevatorOverlay from './overlays/ElevatorOverlay'
import HelloOverlay from './overlays/Hello'

let isArray = function (a) {
	return (!!a) && (a.constructor === Array);
};

function projectContainer(ProjComp, OverlayComp, layout) {
	return class Ret extends React.Component {
		constructor(props) {
			super(props);

			this.checkActive = this.checkActive.bind(this);
			this.setTab = this.setTab.bind(this);
			this.containerRef = React.createRef();
			this.childRef = React.createRef();
			this.state = {
				current: Object.keys(ProjComp)[0]
			}
		}

		componentDidMount() {
			window.addEventListener('scroll', () => { this.checkActive() });
			this.checkActive();
		}

		componentDidUpdate() {
			if (this.childRef.current) {
				this.childRef.current.onActiveChange(this.active);
			}
		}

		checkActive() {
			let visible = this.checkVisible(this.containerRef.current);
			if (this.active != visible) {
				this.active = visible;
				if (this.childRef.current) {
					this.childRef.current.onActiveChange(this.active);
				}
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

		setTab(name) {
			this.setState({
				current: name
			});
		}

		render() {
			let CurProj = null;
			if (typeof ProjComp !== 'object') {
				CurProj = <ProjComp parentRef={this.containerRef} ref={this.childRef} />;
			} else {
				if (this.childRef.current) {
					this.childRef.current.onActiveChange(false);
				}
				CurProj = [];
				for (var i in ProjComp) {
					let Temp = ProjComp[i];
					CurProj.push(
						<span key={i} style={i == this.state.current ? {} : { display: 'none' }}>
							<Temp parentRef={this.containerRef} ref={i == this.state.current ? this.childRef : null} />
						</span>
					);
				}
			}

			return (
				<div className={layout != null ? layout.slideContainer : total_overlay.slideContainer} >
					<div className={layout != null ? layout.projectContainer : total_overlay.projectContainer} ref={this.containerRef}>
						{CurProj}
					</div>
					<div className={layout != null ? layout.overlayContainer : total_overlay.overlayContainer}>
						{OverlayComp != null ? <OverlayComp tabChange={this.setTab} projRef={this.childRef} {...this.props} /> : <></>}
					</div>
				</div>
			)
		}
	}
}

const HelloComp = projectContainer(Hello, HelloOverlay, total_overlay);

const Planet = projectContainer(NoisePlanetProject);

const Bulb = projectContainer(MandlebulbProject);

const Turret = projectContainer({ "Full": FullBotProject, "Turret": TurretProject, "Intake": IntakeProject }, FRCOverlay, side_by_side_overlay);

const Elevator = projectContainer({ "Retracted": ElevatorDownProject, "Extended": ElevatorUpProject }, ElevatorOverlay, side_by_side_overlay);

export { HelloComp, Planet, Bulb, Turret, Elevator }