import p5 from "p5";
import { DrawParameters, IGenerator, Metadata } from "./types";

export class Example implements IGenerator {
  num: number;
  iter: number;

  setup(p: p5, params: DrawParameters): p5.Renderer {
    const cnv = p.createCanvas(params.width, params.width);
    p.background(50);

    // Attention: This loses entropy
    p.randomSeed(parseInt(params.seed.toString()));
    this.num = p.round(p.random(5, 20));
    this.iter = 0;

    return cnv;
  }

  draw(p: p5, params: DrawParameters) {
    if (this.iter++ > this.num) {
      p.noLoop();
    }

    let x = p.width / 2;
    let y = p.height / 2;
    let r = p.random(255);
    let g = p.random(255);
    let b = p.random(255);
    for (let i = 0; i < 10000; i++) {
      x += p.random(-1, 1);
      y += p.random(-1, 1);

      x = p.constrain(x, 0, p.width);
      y = p.constrain(y, 0, p.height);

      r += p.random(-1, 1);
      g += p.random(-1, 1);
      b += p.random(-1, 1);

      r = p.constrain(r, 0, 255);
      g = p.constrain(g, 0, 255);
      b = p.constrain(b, 0, 255);

      p.stroke(r, g, b);
      p.point(x, y);
    }
  }

  getMetadata(p: p5, params: DrawParameters): Metadata {
    return [
      {
        name: "Iterations",
        value: this.num,
      },
    ];
  }
}
