


import express,{Request,Response} from 'express';
import {body} from 'express-validator'
import jwt from 'jsonwebtoken'
import { User } from '../modals/user';
import { BadRequestError } from '../Errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';


//Defining a router from express
const router=express.Router();


router.post('/api/users/signup',[
    body('email')
    .isEmail()
    .withMessage('Email must be Valid'),
    body('password')
    .trim()
    .isLength({min:4,max:20})
    .withMessage('Password must be between 4 and 20 characters')
],validateRequest,async (req:Request,res:Response)=>{



const {email,password}=req.body;

const existingUser=await User.findOne({email});

if(existingUser) 
    {
//         console.log("Email in use")
//   return res.send({})

throw new BadRequestError('Email in Use')
    }   
    
    
    const user=User.build({email,password});
    await user.save();

    //Generate JWT store it on session obj
    const userJwt=jwt.sign({
        id:user.id,
        email:user.email
    },process.env.JWT_KEY!)


    req.session={
        
       jwt: userJwt
    }
    console.log("USER",user)

    return res.status(201).send(user)

})

export {router as signUpRouter}