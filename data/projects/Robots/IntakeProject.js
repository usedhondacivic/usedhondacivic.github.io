import ObjProject from "../../Project Utils/THREE/objProject";

import * as THREE from 'three'

export default class TurretProject extends ObjProject {
    orbitControls = true;
    cameraLight = true;

    constructor(props) {
        //super(props, "./models/turret/Turret.obj", "./models/turret/Turret.mtl", -0.05);
        super(props, "./models/intake/Intake.obj", "./models/intake/Intake.mtl");
    }

    postBuild() {
        this.camera.position.set(0.35, 0.35, -0.35);
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