import express from 'express';
import {json as bodyParser} from 'body-parser';

const app=express();
app.use(bodyParser());






app.listen(3000,()=>{
    console.log("Listening on PORT 3000!!")
})

