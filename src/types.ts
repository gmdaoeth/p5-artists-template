import p5 from "p5";

export type DrawParameters = {
  tokenId: number;
  seed: BigInt;
  width: number;
};

type MetadataAttribute = {
  name?: string;
  value: string | number;
};

export type Metadata = MetadataAttribute[];

export type IGenerator = {
  setup(p: p5, params: DrawParameters): p5.Renderer;
  draw(p: p5, params: DrawParameters);
  getMetadata(p: p5, params: DrawParameters): Metadata;
};
