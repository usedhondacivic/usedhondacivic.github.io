import ObjProject from "../../Project Utils/THREE/objProject";

import * as THREE from 'three'

export default class FullBotProject extends ObjProject {
    orbitControls = true;
    cameraLight = true;

    constructor(props) {
        super(props, "./models/full_bot/full_bot.obj", "./models/full_bot/full_bot.mtl", [0, -0.2, 0]);
    }

    postBuild() {
        this.camera.position.set(1.0, 1.0, 1.0);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
        this.camera.updateProjectionMatrix();

        const color = 0xFFFFFF;
        const intensity = 0.6;
        const amb = new THREE.AmbientLight(color, intensity);

        this.scene.add(amb);

        this.scene.background.set("#141414");
    }
};