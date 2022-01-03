import * as THREE from 'three'
import ThreeProject from './threeProject'

import { OBJLoader } from '../../../node_modules/three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from '../../../node_modules/three/examples/jsm/loaders/MTLLoader.js';

class ObjSubject {
    constructor(scene, model, tex, offset) {
        const mtlLoader = new MTLLoader();
        const objLoader = new OBJLoader();
        mtlLoader.load(tex, (mtl) => {
            mtl.preload();
            objLoader.setMaterials(mtl);
            objLoader.load(model, (root) => {
                root.rotation.x = -Math.PI / 2;
                if (offset != null) {
                    root.position.y += offset;
                }
                scene.add(root);
            });
        });
    }

    update(time) {

    }

    onWindowResize(width, height) {

    }
}


export default class ObjProject extends ThreeProject {
    constructor(props, vertex, fragment, uniforms) {
        super(props);
        this.vertex = vertex;
        this.fragment = fragment;
        this.uniforms = uniforms;
    }

    createSceneSubjects(scene) {
        return [
            new ObjSubject(scene, this.vertex, this.fragment, this.uniforms)
        ];
    }
}