import ObjProject from "../../Project Utils/THREE/objProject";

import * as THREE from 'three'

export default class ElevatorProject extends ObjProject {
    orbitControls = true;
    cameraLight = true;
    cameraLightDist = 3;

    constructor(props) {
        super(props, "./models/elevator/elevator_down.obj", "./models/elevator/elevator_down.mtl", [0, -0.6, 0]);
    }

    postBuild() {
        this.camera.position.set(1.1, -0.3, 1.1);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
        this.camera.updateProjectionMatrix();

        const color = 0xFFFFFF;
        const intensity = 0.5;
        const amb = new THREE.AmbientLight(color, intensity);

        this.scene.add(amb);

        this.scene.background.set("#141414");
    }
};