


import express from 'express';

import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

//Defining a router from express
const router=express.Router();


router.get('/api/users/currentuser',currentUser,(req,res)=>{

  
res.send({currentUser:req.currentUser || null})


})

export {router as currentUserRouter}