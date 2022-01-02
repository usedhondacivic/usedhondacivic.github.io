import React from "react";
import ProjectBase from "../projectBase";
import loadable from '@loadable/component'

export default class P5Project extends ProjectBase {
    x = 50;
    y = 50;

    canvasSetup = (p5, canvasParentRef) => {
        let container = this.props.parentRef.current;
        p5.createCanvas(container.offsetWidth, container.offsetHeight).parent(canvasParentRef);
        this.sketchSetup(p5);
    }

    sketchSetup = (p5) => { }

    sketchDraw = (p5) => {
        p5.background(0);
        p5.ellipse(this.x, this.y, 70, 70);
        // NOTE: Do not use setState in the draw function or in functions that are executed
        // in the draw function...
        // please use normal variables or class properties for these purposes
        this.x += 2;
        this.y++;
    }

    windowResized = (p5) => {
        let container = this.props.parentRef.current;
        p5.resizeCanvas(container.offsetWidth, container.offsetHeight);
        this.sketchSetup(p5);
    }

    render() {
        if (typeof window !== 'undefined') {
            const Sketch = loadable(() => import('react-p5'));
            return <Sketch setup={this.canvasSetup} draw={this.sketchDraw} windowResized={this.windowResized} />
        } else {
            return null;
        }
    }
}