

import { Request,Response,NextFunction } from "express"
import { RequestValidationError } from "../Errors/request-validation-error"
import { DatabaseConnectionError } from "../Errors/database-connection-error";
import { CustomError } from "../Errors/custom-error";


// err.req,res,next

export const errorHandler=(err:Error,req:Request,res:Response,next:NextFunction)=>{


if(err instanceof CustomError) {

  return res.status(err.statusCode).send({errors:err.serializeErrors()})
}



    //2 Make sure to send consiteent error message (One generic message)
    res.status(400).send({
      errors:[
        {message:"Something went wrong"}
      ] 
    })

}