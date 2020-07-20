import * as path from 'path';
import { Express, Request, Response, NextFunction } from 'express';
const express = require('express');

import fileUpload from 'express-fileupload';
import cors from 'cors';
import bodyParser from 'body-parser';

import { PORT } from './config';
import { MyIPFS } from './ipfs';

const app: Express = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

const port = PORT || 8110;
app.listen(port, async () => {
  console.log(`IPFS Service is running on port ${port}`);
});

app.get('/api/v0/hello', getHello);

app.get('/api/v0/pino', getPino);
app.get('/api/v0/gino', getGino);

// API Functions
MyIPFS.start();

async function getHello(req: Request, res: Response, next: NextFunction) {
  let p = await MyIPFS.getHello('pino');

  let pino = JSON.parse(p);

  console.log(`Pino : ${pino}`);

  let g = await MyIPFS.getHello('gino');

  let gino = JSON.parse(g);

  console.log(`Gino : ${gino}`);

  res.json(pino);
}

async function getPino(req: Request, res: Response, next: NextFunction) {
  let p = await MyIPFS.getHello('pino');

  let pino = JSON.parse(p);

  console.log(`Pino : ${pino}`);

  res.json(pino);
}

async function getGino(req: Request, res: Response, next: NextFunction) {
  let g = await MyIPFS.getHello('gino');

  let gino = JSON.parse(g);

  console.log(`Gino : ${gino}`);

  res.json(gino);
}
