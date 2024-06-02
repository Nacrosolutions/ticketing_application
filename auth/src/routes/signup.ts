


import express,{Request,Response} from 'express';
import {body,validationResult} from 'express-validator'
import { RequestValidationError } from '../Errors/request-validation-error';
import { User } from '../modals/user';
import { BadRequestError } from '../Errors/bad-request-error';


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
],async (req:Request,res:Response)=>{



    console.log("REQ",req.body)
const errors=validationResult(req);
if(!errors.isEmpty()){
   throw new RequestValidationError(errors.array());
}


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
    console.log("USER",user)

    return res.status(201).send(user)

})

export {router as signUpRouter}