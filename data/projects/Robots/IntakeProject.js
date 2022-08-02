import ObjProject from "../../Project Utils/THREE/objProject";

import * as THREE from 'three'

export default class IntakeProject extends ObjProject {
    orbitControls = true;
    cameraLight = true;

    constructor(props) {
        super(props, "./models/intake/Intake.obj", "./models/intake/Intake.mtl", [-0.25, 0, 0.2]);
    }

    postBuild() {
        this.camera.position.set(0.55, 0.55, -0.55);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
        this.camera.updateProjectionMatrix();
        this.light.distance = 4;

        const color = 0xFFFFFF;
        const intensity = 0.5;
        const amb = new THREE.AmbientLight(color, intensity);

        this.scene.add(amb);

        this.scene.background.set("#141414");
    }
};