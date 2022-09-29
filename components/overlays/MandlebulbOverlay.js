import React from 'react'

import styles from '../../styles/projects/raymarch.module.css'

export default class MandlebulbOverlay extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <h2>The Mandlebulb</h2>
                <p>
                    The 3D analog to the mandlebrot set. Rendered using signed distance fields (SDFs) and raymarching.
                </p>
            </div>
        )
    }
}