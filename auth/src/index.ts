import express from 'express';
import {json as bodyParser} from 'body-parser';

const app=express();
app.use(bodyParser());

app.get('/api/users/currentuser',(req,res)=>{
    res.send('hi there')
})






app.listen(3000,()=>{
    console.log("Listening on PORT 3000!!")
})

