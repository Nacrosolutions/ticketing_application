
import request from "supertest";
import { app } from "../../app";



//Write a test statement

it('returns a 201  on successful signup',async()=>{
    return request(app)
      .post('/api/users/signup')
      .send({
        email:'test@test.com',
        password:'123456'

      })
      .expect(201);


})


it('it returns a 400 with an invalid email ',async () =>{
    return request(app)
    .post('/api/users/signup')
    .send({
      email:'testtest.com',
      password:'123456'

    })
    .expect(400);
 
})

it('it returns a 400 with an invalid password ',async () =>{
    return request(app)
    .post('/api/users/signup')
    .send({
      email:'test@test.com',
      password:'12'

    })
    .expect(400);
 
})


it('it returns a 400 with an empty  password  and email',async () =>{
    return request(app)
    .post('/api/users/signup')

    .send({

    })
    .expect(400);
 
})


it('disallow duplicates emails',async () =>{
    await request(app)
    .post('/api/users/signup')
    .send({
        email:"t@t.com",
        password:'123456'
    })
    .expect(201);

         await request(app)
    .post('/api/users/signup')
    .send({
        email:"t@t.com",
        password:'123456'
    })
    .expect(400);
}) 
it('sets a cookie aftr succesfull signup',async () =>{
   const response= await request(app)
    .post('/api/users/signup')
    .send({
        email:"t@t.com",
        password:'123456'
    })
    .expect(201);
    expect(response.get('Set-Cookie')).toBeDefined();
})