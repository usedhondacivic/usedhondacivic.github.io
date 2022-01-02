import React from 'react'
import * as THREE from 'three'

import ProjectBase from '../projectBase';

export default class ThreeProject extends ProjectBase {
    component = <canvas ref={element => this.canvas = element}></canvas>;

    clock = new THREE.Clock();
    origin = new THREE.Vector3(0, 0, 0);

    active = false;

    mousePosition = {
        x: 0,
        y: 0
    }

    constructor(props) {
        super(props);
    }

    setup() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;

        this.screenDimensions = {
            width: this.canvas.width,
            height: this.canvas.height
        }

        this.scene = this.buildScene();
        this.renderer = this.buildRenderer(this.screenDimensions);
        this.camera = this.buildCamera(this.screenDimensions);
        this.sceneSubjects = this.createSceneSubjects(this.scene);

        this.postBuild();

        this.resizeCanvas();

        this.display();
    }

    postBuild() { }

    buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#32a852");

        return scene;
    }

    buildRenderer({ width, height }) {
        const renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
        renderer.setSize(width, height);

        return renderer;
    }

    buildCamera({ width, height }) {
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 4;
        const farPlane = 100;
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

        camera.position.z = 40;

        return camera;
    }

    createSceneSubjects(scene) {
        const sceneSubjects = [
            //new SceneSubject(scene)
        ];

        return sceneSubjects;
    }

    display(time) {
        if (this.active) {
            requestAnimationFrame(() => { this.display(time) });
        }
        this.update(time);
    }

    onActiveChange(active) {
        this.active = active;
        if (active) {
            this.display();
        }
    }

    update(time) {
        const elapsedTime = this.clock.getElapsedTime();

        for (let i = 0; i < this.sceneSubjects.length; i++)
            this.sceneSubjects[i].update(elapsedTime);


        this.renderer.render(this.scene, this.camera);
    }

    resizeCanvas = () => {
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';

        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;

        const { width, height } = this.canvas;

        this.screenDimensions.width = width;
        this.screenDimensions.height = height;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);

        for (let i = 0; i < this.sceneSubjects.length; i++)
            this.sceneSubjects[i].onWindowResize(width, height);
    }

    render() {
        return this.component;
    }
}