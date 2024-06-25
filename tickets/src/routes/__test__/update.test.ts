import request from 'supertest';
import { app } from '../../app';

import mongoose from 'mongoose';
import { globalAny } from '../../test/setup';

it('returns a 404 if id doesnt exist',async ()=>{

    const id=new mongoose.Types.ObjectId().toHexString();
    await request(app).put(`/api/tickets/${id}`)
    .set('Cookie',globalAny.signin())
    .send({
        title:'ewfwf',
        price:20
    })
    .expect(404)
})
it('returns a 401 if user is not authenticated',async ()=>{
    const id=new mongoose.Types.ObjectId().toHexString();
    await request(app).put(`/api/tickets/${id}`)
    .send({
        title:'ewfwf',
        price:20
    })
    .expect(401)
})
it('returns a 401 if user doesnt own a ticket',async ()=>{

  const response=  await request(app).post('/api/tickets').set('Cookie',globalAny.signin()).
    send({
        title:'assad',
        price:20
    })

    await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie',globalAny.signin()).send({
        title:'efw',
        price:200
    }).expect(401)
})
it('returns a 400 if user provide an invalid title or price',async ()=>{
    const cookie=globalAny.signin();
    const response=  await request(app).post('/api/tickets').set('Cookie',cookie).
    send({
        title:'assad',
        price:20
    })

    await request(app).put(`/api/tickets/${response.body.id}`)
    .set('Cookie',cookie)
    .send({
        title:'',
        price:20
    })
    .expect(400)

    await request(app).put(`/api/tickets/${response.body.id}`)
    .set('Cookie',cookie)
    .send({
        title:'ewfewf',
        price:-10
    })
    .expect(400)
})
it('it updates the ticket provide valid inputs',async ()=>{

    const cookie=globalAny.signin();
    const response=  await request(app).post('/api/tickets').set('Cookie',cookie).
    send({
        title:'assad',
        price:20
    })


    await request(app).put(`/api/tickets/${response.body.id}`)
    .set('Cookie',  cookie)
    .send({
        title:'New title',
        price:100
    })

    .expect(200);


    //Fetch the ticket

    const ticketRes=await request(app).get(`/api/tickets/${response.body.id}`).send();

    expect(ticketRes.body.title).toEqual('New title')
    expect(ticketRes.body.price).toEqual(100)


})