import all from 'it-all';

const IPFS = require('ipfs');

export class MyIPFS {
  static node: any = {};

  static async start(): Promise<void> {
    console.log('Hi static');
    this.node = await IPFS.create();
  }

  static async getHello(name: string): Promise<string> {
    let asset = { BestPhD: name };

    const result = JSON.stringify(asset);

    const version = await this.node.version();
    console.log(`IPFS started, version: ${version.version}`);

    //write to ipfs
    // await this.node.files.mkdir(`/enr`, { parentes: true });

    const writeTo = `/enrico/${name}.json`;

    await this.node.files.write(writeTo, result, { create: true });
    // ...

    // let cid = await this.node.dag.put(asset);

    const results = await all(this.node.files.ls(`/enrico`));

    const stat = await this.node.files.stat(`/enrico`);

    // console.log(results);
    // console.log(stat);

    return result;
  }
}
