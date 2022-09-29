import React from 'react'


import styles from '../../styles/projects/raymarch.module.css'

export default class PlanetOverlay extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <h2>Noise Planet</h2>
                <p>
                    A strange looking planet, created using 4D simplex noise to warp the SDF of a torus and a sphere.
                </p>
            </div>
        )
    }
}