import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'
import { HelloComp, Planet, Bulb, Turret, Elevator, ComboCracker, Spinout } from '../components/projects'
import { Header } from '../components/utils'

class ProjectScroller extends React.Component {
	render() {
		return (
			<div className={styles.projectScroller}>
				{this.props.children}
			</div>
		)
	}
}

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
				<span id="top"></span>
				<HelloComp />
				<span id="about"></span>
				<span id="robots"></span>
				<ComboCracker />
				<Turret />
				<Elevator />
				<span id="games"></span>
				<Spinout />
				<span id="graphics"></span>
				<Bulb />
				<Planet />
				<span id="webdev"></span>
			</ProjectScroller>
		</>
	)
}