import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'
import Link from 'next/link'

import NoisePlanetProject from '../data/projects/Raymarching/NoisePlanetProject'

import MandlebulbProject from '../data/projects/Raymarching/MandlebulbProject'

import Hello from '../data/projects/Welcome/hello'

import TurretProject from '../data/projects/Robots/TurretProject'

import ElevatorProject from '../data/projects/Robots/ElevatorProject'


class ProjectScroller extends React.Component {
	render() {
		return (
			<div className={styles.projectScroller}>
				{this.props.children}
			</div>
		)
	}
}

class Header extends React.Component {
	render() {
		return (
			<div className={styles.header} >
				<h3>Michael Crum</h3>
				<a>Top</a>
				<a>Robots</a>
				<a>Graphics</a>
				<a>Games</a>
				<a>WebDev</a>
				<a>Bottom</a>
				<Socials />
			</ div>
		)
	}
}

class Socials extends React.Component {
	render() {
		return (
			<div className={styles.socialBar}>
				<a href="https://www.linkedin.com/in/michael-crum-ab3799198/">
					<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
				</a>
				<a href="https://github.com/usedhondacivic">
					<svg fill="white" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>My GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
				</a>
				<a href="https://www.instagram.com/tricycle.boy/">
					<svg fill="white" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>My Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" /></svg>
				</a>
			</div>
		)
	}
}

class HelloOverlay extends React.Component {
	render() {
		return (
			<>
				<span id="top"></span>
				<h1>Hello...</h1>
				<p>I am Michael Crum, welcome to my portfolio.</p>
				<p>I like to make things! </p>


				<p><b>This is a work in progress. More to come soon :)</b></p>
				<p>Scroll to see what I have so far.</p>
			</>
		)
	}
}

class RobotOverlay extends React.Component {

	render() {
		const features = this.props.features.map((f) =>
			<li key={f}>{f}</li>
		);
		const resp = this.props.resp.map((f) =>
			<li key={f}>{f}</li>
		);

		return (
			<div className={styles.robotOverlay}>
				<div>
					<h2>{this.props.title}</h2>
					<p>{this.props.description}</p>
				</div>
				<div style={{ float: 'right' }}>
					<p><b>Features:</b></p>
					<ul>{features}</ul>
					<br></br>
					<p><b>My responsibilities:</b></p>
					<ul>{resp}</ul>
				</div>
			</div >
		)
	}
}

class FRCOverlay extends React.Component {
	render() {
		return (
			<>
				<h2>FRC 2020:<br />Infinite Recharge</h2>
			</>
		)
	}
}

class ElevatorOverlay extends React.Component {
	render() {
		return (
			<>
				<h2>Preseason Project:<br />Elevator Bot</h2>
				<p>
					Created as an individual project over the course of one month,
					this elevator bot was my first experiment with Computer Aided Design and fabrication.
					In fact, it was the first CAD based system ever created at 3648, setting a president for seasons to come.
				</p>
				<p>
					Features:

				</p>
			</>
		)
	}
}

function projectContainer(ProjComp, OverlayComp) {
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
				<>
					<div className={styles.projectContainer} ref={this.containerRef}>
						<ProjComp parentRef={this.containerRef} ref={this.childRef} />
						<div className={styles.overlay}>
							{OverlayComp != null ? <OverlayComp parentRef={this.containerRef} projRef={this.childRef} {...this.props} /> : <></>}
						</div>
					</div>
				</>
			)
		}
	}
}

class KhanTest extends React.Component {
	onActiveChange() {

	}

	render() {
		return (
			<>
				<iframe className="khan" src="https://www.khanacademy.org/computer-programming/rocket-jump/5031586312617984/embedded?id=1641096192235-0.6875093508071066&origin=file%3A%2F%2F&buttons=no&embed=yes&editor=no&author=no" frameBorder="0" scrolling="no" />
				<iframe className="khan" src="https://www.khanacademy.org/computer-programming/planes/5623717173657600/embedded?id=1641097768704-0.19610459693174764&origin=file%3A%2F%2F&buttons=no&embed=yes&editor=no&author=no" frameBorder="0" scrolling="no" />
				<iframe className="khan" src="https://www.khanacademy.org/computer-programming/some-sketchy-game/4823112592785408/embedded?id=1641098160258-0.983890450619725&origin=file%3A%2F%2F&buttons=no&embed=yes&editor=no&author=no" frameBorder="0" scrolling="no" />
				<iframe className="khan" src="https://www.khanacademy.org/computer-programming/writers-block/2966001495/embedded?id=1641098485965-0.7241882868228726&origin=file%3A%2F%2F&buttons=no&embed=yes&editor=no&author=no" frameBorder="0" scrolling="no" />
				<iframe className="khan" src="https://www.khanacademy.org/computer-programming/rocket/5785976875122688/embedded?id=1641099196335-0.25135898971323867&origin=file%3A%2F%2F&buttons=no&embed=yes&editor=no&author=no" frameBorder="0" scrolling="no" />
				<iframe className="khan" src="https://www.khanacademy.org/computer-programming/blok-adventures-5/5391392645578752/embedded?id=1641099422413-0.49102958983390543&origin=file%3A%2F%2F&buttons=no&embed=yes&editor=no&author=no" frameBorder="0" scrolling="no" />
			</>
		)
	}
}

const HelloComp = projectContainer(Hello, HelloOverlay);

const Khan = projectContainer(KhanTest);

const Planet = projectContainer(NoisePlanetProject);

const Bulb = projectContainer(MandlebulbProject);

const Turret = projectContainer(TurretProject, RobotOverlay);

const Elevator = projectContainer(ElevatorProject, RobotOverlay);

export default function Home() {
	return (
		<>
			<Head>
				<title>Michael Crum: Portfolio</title>
				<link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"></link>
				<link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap" rel="stylesheet"></link>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest"></link>
			</Head>
			<Header />
			<ProjectScroller>
				<HelloComp />
				<Turret title={<>FRC 2020:<br />Infinite Recharge</>} description={
					`
					Team 3648: Sparta Robotica's entry into the 2020 First Robotics Competition.
					
					I was responsible for the full development cycle of two subsystems: the turreted shooter and the powercell intake. I was also the team lead, programming lead, and driver.

					This bot placed 8th in the Utah regional and was being prepared for the Denver regional when it was canceled due to COVID-19.

					Check out the CAD on OnShape: PUT LINK HERE

					And the code on GitHub: PUT LINK HERE
					`
				}
					features={["360° autonomously targeting + ranging turret", "Consistent inner-goal shots from beyond the control panel", "Pneumaticity adjustable hood for high angle shots", "Full width, over bumper powercell intake"]}
					resp={["Team Lead", "Programming Lead", "Driver", "CAD design using OnShape", "CNC and manual machining", "Java development of remote operations", "Java development of autonomous routines (pathfinding, motion planning, and computer vision)", "Wiring"]}
				/>
				<Elevator title={<>Preseason Project:<br />Elevator Bot</>} description={
					`An individual project created to learn about computer aided design and fabrication.
					
					Taken from inception to reality in under a month.
					
					The first CAD designed system created by 3648, bringing the team inline with competitive standards and setting precedent for future seasons.
					
					Check out the CAD on OnShape: PUT LINK HERE

					And the code on GitHub: PUT LINK HERE
					`
				}
					features={["Collapsed height: 3' 9\"", "Expanded height: 7' 0\"", "Riveted modular design", "Low profile + cost bearing modules", "Low center of gravity"]}
					resp={["Research and development", "CAD design", "Material sourcing + acquirement", "CNC + manual machining", "Assembly", "Programming", "Testing"]}
				/>
				<Planet />
				<Bulb />
			</ProjectScroller>
		</>
	)
}