import express,{Request,Response} from 'express'
import { body } from 'express-validator'

import {
validateRequest,
NotAuthorizedError,
NotFoundError,
requireAuth
} from '@nabhamsharma/common';
import { Ticket } from '../models/ticket';



const router=express.Router();
router.put('/api/tickets/:id',requireAuth,
    [
body('title').not().isEmpty().withMessage('Title is required'),
body('price').isFloat({gt:0}).withMessage('price must be provided and must be greater than zero ')
    ],
    validateRequest,
    async (req:Request,res:Response) =>{
    const ticket=await Ticket.findById(req.params.id);
    if(!ticket) 
        {
            console.log("Executed")
            throw new NotFoundError();
        }

        if(ticket.userId !==req.currentUser!.id){
            throw new NotAuthorizedError()
        }

        ticket.set({
            title:req.body.title,
            price:req.body.price
        });

        await ticket.save();

    res.send(ticket)

})

export {router as updateTicketRouter}