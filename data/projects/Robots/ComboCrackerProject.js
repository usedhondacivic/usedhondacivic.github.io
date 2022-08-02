import ObjProject from "../../Project Utils/THREE/objProject";

import * as THREE from 'three'

export default class ComboCrackerProject extends ObjProject {
    orbitControls = true;
    cameraLight = true;

    constructor(props) {
        super(props, "./models/combo_cracker/combo_cracker.obj", "./models/combo_cracker/combo_cracker.mtl", [0, -0.025, 0]);
    }

    postBuild() {
        this.camera.position.set(-0.07, 0.1, -0.15);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
        this.camera.updateProjectionMatrix();

        const color = 0xffffff;
        const intensity = 0.5;
        const amb = new THREE.AmbientLight(color, intensity);

        this.scene.add(amb);

        //this.scene.background.set("#fffefa");
        this.scene.background.set("#141414");
    }
};