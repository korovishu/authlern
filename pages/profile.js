import { useState, useEffect } from "react";
import {Auth} from 'aws-amplify'
import '../configureAmplify'
function Profile () {
    useEffect(()=>{
        checkUser();
        async function checkUser(){
            const user = await Auth.currentAuthenticatedUser();
            console.log({user});
        }

    },[]);

    return (
        <div>
            <button 
                onClick = {() => Auth.federatedSignIn({provider: "Google"})}
            >
                Sign in with Google
            </button>
        </div>
    )
}

export default Profile;