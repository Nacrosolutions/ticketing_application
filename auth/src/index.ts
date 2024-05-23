import express from 'express';
import {json as bodyParser} from 'body-parser';
import 'express-async-errors';
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


app.use(errorHandler)


app.listen(3000,()=>{
    console.log("Listening on PORT 3000!!")
})

