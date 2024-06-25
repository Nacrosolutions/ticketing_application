import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
     
    reason='Error conecting to Database';
    statusCode=500;
    constructor(){
super('Error coneecting to DB');


Object.setPrototypeOf(this,DatabaseConnectionError.prototype)
     }


     serializeErrors () {
        return [
            {message:this.reason}
        ]
     }
}