import React from 'react';
import P5Project from '../../Project Utils/P5/p5Project';

let rotation = 0;
let width = 0;
let height = 0;

let tileSize = 30;
let cornerChance = 0.9;

export default class Hello extends P5Project {

    colorOne;
    colorTwo;

    cornerTile(p5, x, y, rot) {
        p5.push();
        p5.translate(x, y);
        p5.rotate(rot);
        //p5.rect(0, 0, tileSize, tileSize);
        for (let i = 0; i < 7; i++) {
            let rad = 2 * tileSize - 2 * (i + 0.5) * (tileSize / 7);
            let color = i % 2 == 0 ? this.colorOne : this.colorTwo;
            p5.stroke(color);
            p5.arc(-tileSize / 2, -tileSize / 2, rad, rad, 0, p5.HALF_PI);
        }
        for (let i = 0; i < 7; i++) {
            let rad = 2 * tileSize - 2 * (i + 0.5) * (tileSize / 7);
            let color = i % 2 == 0 ? this.colorOne : this.colorTwo;
            p5.stroke(color);
            p5.arc(tileSize / 2, tileSize / 2, rad, rad, p5.PI, p5.PI + p5.HALF_PI);
        }
        p5.pop();
    }

    straightTile(p5, x, y, rot) {
        p5.push();
        p5.translate(x, y);
        p5.rotate(rot);
        for (let i = 0; i < 7; i++) {
            let y = (-tileSize / 2) + (i + 0.5) * (tileSize / 7);
            let color = i % 2 == 0 ? this.colorOne : this.colorTwo;
            p5.stroke(color);
            p5.line(-tileSize / 2, y, tileSize / 2, y);
        }

        //p5.line(0, -tileSize / 2, 0, tileSize / 2);
        p5.pop();
    }

    sketchSetup = (p5) => {
        this.colorOne = p5.color(0);
        this.colorTwo = p5.color(20);
        p5.background(0);
        p5.rectMode(p5.CENTER);
        p5.strokeCap(p5.SQUARE);
        p5.stroke(0);
        p5.strokeWeight(p5.ceil(tileSize / 7));
        p5.noFill();

        for (let x = 0; x < p5.width + tileSize; x += tileSize) {
            for (let y = 0; y < p5.height + tileSize; y += tileSize) {
                let corner = p5.random() < cornerChance ? true : false;
                let rotation = p5.floor(p5.random(0, 4)) * p5.HALF_PI;
                if (corner)
                    this.cornerTile(p5, x, y, rotation);
                else
                    this.straightTile(p5, x, y, rotation);
            }
        }
    }

    sketchDraw = (p5) => {

    };
}