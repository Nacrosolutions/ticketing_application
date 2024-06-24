import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

// declare global {
//   let signin: () => Promise<string[]>;
// }

export const globalAny:any = global;




let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'sdd';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
},500000);



beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
 
  for (let collection of collections) {
    await collection.deleteMany({});
  }
}, 5000000);

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

globalAny.signin = () => {
  // Build a JWT payload. { id, email }
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "ceko@abv.bg",
  };

  // Create JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session object { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // returns a string thats a cookie with the encoded data
  return [`session=${base64}`];
};