import express from 'express';
import {json as bodyParser} from 'body-parser';
import 'express-async-errors';

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';

import { errorHandler,NotFoundError } from '@nabhamsharma/common';

import cookieSession from 'cookie-session';

export const app=express();
app.set('trust proxy',true)
app.use(bodyParser());
app.use(cookieSession({
  signed:false,
  secure:process.env.NODE_ENV !=='test'
}))

//CurrentUserRoute
app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)
app.all('*',async (req,res,next)=>{
throw new NotFoundError();
})
app.use(errorHandler);


