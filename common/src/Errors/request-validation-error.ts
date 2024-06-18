import {ValidationError} from 'express-validator'
import { CustomError } from './custom-error';




export class RequestValidationError extends CustomError {
    statusCode=400;
    constructor (public errors:ValidationError[]){
  super('Invalid request parameter');


  // Only because we are extending  a build in class

  Object.setPrototypeOf(this,RequestValidationError.prototype)
    }



    serializeErrors() {
        return this.errors.map((err) => {
          if (err.type === 'field') {
            return { message: err.msg, field: err.path };
          }
          return { message: err.msg };
        });
      }
 
}


// throw new RequestValidationError(errors)