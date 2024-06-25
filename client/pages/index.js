import buildClient from "../api/build-client";

const LandingPage =({currentUser})=>{
return currentUser ? <h1>You are signed In</h1> : <h1>You are not signed in</h1>
}


LandingPage.getInitialProps=async (context)=>{


    // const response= await axios.get('/api/users/currentuser').catch((err=>{
    //     console.log(err)
    // }));


    const {data}=await buildClient(context).get('/api/users/currentuser');

    return   data;


}


export default LandingPage;