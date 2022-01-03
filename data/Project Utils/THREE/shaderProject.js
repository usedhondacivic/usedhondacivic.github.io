import * as THREE from 'three'

import ThreeProject from './threeProject'

class ShaderSubject {
    constructor(scene, vertex, fragment, uniforms) {
        this.shaderUniforms = uniforms;
        this.shaderUniforms.iTime = { value: 0 };
        this.shaderUniforms.iResolution = { value: new THREE.Vector2(0, 0) };

        let shaderMaterial = new THREE.ShaderMaterial({
            uniforms: this.shaderUniforms,
            vertexShader: vertex,
            fragmentShader: fragment
        });

        const planeGeometry = new THREE.PlaneBufferGeometry(2, 2);
        var plane = new THREE.Mesh(planeGeometry, shaderMaterial);
        plane.x = -1;
        plane.y = -1;
        scene.add(plane);
    }

    update(time) {
        this.shaderUniforms.iTime.value = time;
    }

    onWindowResize(width, height) {
        this.shaderUniforms.iResolution.value.x = width;
        this.shaderUniforms.iResolution.value.y = height;
    }
}

export default class ShaderProject extends ThreeProject {
    constructor(props, vertex, fragment, uniforms) {
        super(props);
        this.vertex = vertex;
        this.fragment = fragment;
        this.uniforms = uniforms;
    }

    createSceneSubjects(scene) {
        return [
            new ShaderSubject(scene, this.vertex, this.fragment, this.uniforms)
        ];
    }
}