import p5 from "p5";
import { DrawParameters, IGenerator, Metadata } from "./types";

type Results = {
  dataURI: string;
  metadata: Metadata;
};

export function execute(
  generator: IGenerator,
  params: DrawParameters
): Promise<Results> {
  return new Promise<Results>((resolve, reject) => {
    const sketch = (p: p5) => {
      let cnv: p5.Renderer;

      p.setup = () => {
        cnv = generator.setup(p, params);
      };

      p.draw = () => {
        generator.draw(p, params);

        // Meaning we are done
        if (!p.isLooping()) {
          resolve({
            metadata: generator.getMetadata(p, params),
            dataURI: cnv.elt.toDataURL(),
          });
        }
      };
    };
    new p5(sketch);
  });
}

import { Example } from "./example";

function parseSeedFromUrl(): BigInt {
  let seed = BigInt(Math.round(Math.random() * 1e18));
  const url = window.location.href.split("/");
  try {
    seed = BigInt(parseInt(url[url.length - 1]));
  } catch {}
  return seed;
}

(async () => {
  const results = await execute(new Example(), {
    seed: parseSeedFromUrl(),
    tokenId: 1,
    width: 500,
  });

  const meta = document.createElement("div");
  meta.innerHTML = `<pre>${JSON.stringify(results.metadata, null, 2)}</pre>`;
  document.body.appendChild(meta);

  const dataURI = document.createElement("div");
  dataURI.innerHTML = `<pre>${results.dataURI}</pre>`;
  document.body.appendChild(dataURI);
})();
