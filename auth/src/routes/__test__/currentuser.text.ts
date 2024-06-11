import request from 'supertest';
import { app } from '../../app';
import { globalAny } from '../../test/setup';



it('Response wit details with current User',async ()=>{
   const authResponse= await request(app)
    .post('/api/users/signup')
    .send({
        email:'test@test.com',
        password:'123456'
    })
    .expect(201);

    const cookie=await globalAny.signin();


    const response=await request(app).get('/api/users/currentuser').set('Cookie',cookie!).send().expect(200);

    expect(response.body.currentUser.email).toEqual('test@test.com')
}) ;


it('responds with null if not auhtenicated ',async ()=>{
    const response=await request(app).get('/api/users/currentuser').send().expect(200);


    expect(response.body.currentUser).toEqual(null)
})