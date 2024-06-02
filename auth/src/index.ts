import express from 'express';
import {json as bodyParser} from 'body-parser';
import 'express-async-errors';
import mongoose from 'mongoose'

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './Errors/not-found-error';

const app=express();
app.use(bodyParser());

//CurrentUserRoute
app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)
app.all('*',async (req,res,next)=>{
throw new NotFoundError();
})
app.use(errorHandler);


const start=async()=>{
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log("Connected to Mongodb")

  }
  catch(err) {
    console.log(err)
  }
  app.listen(3000,()=>{
    console.log("Listening on PORT 3000!!")
})
}



start();