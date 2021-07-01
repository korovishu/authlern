import { useState, useEffect } from "react";
import {Auth} from 'aws-amplify'
import '../configureAmplify'
import SignIn from '../components/SignIn'

function Profile () {
    const [uiState, setUiState] = useState('signIn')
    const [formState, setFormState] = useState({
      email: '', password: '', authCode: ''
    })
    const [user,setUser] = useState(null);
    const { email, password, authCode } = formState
    useEffect(()=>{
        checkUser();
        async function checkUser(){
            try {
                const user = await Auth.currentAuthenticatedUser();
                setUser(user);
                setUiState('signedIn');
                console.log(user);
            } catch(err) {
                setUser(null);
                setUiState('signIn');
            }
        }

    },[]);

    function onChange(e) {
        setFormState({ ...formState, [e.target.name]: e.target.value })
      }

    return (
        <div>
            {
                uiState === 'signIn' && (
                    <SignIn 
                        onChange={onChange}
                        setUiState={setUiState}
                    />
                )
            }
            {
                uiState === 'signedIn' && (
                    <div>
                        <p>Welcome, {user.attributes.email} </p>
                        <button
                            onClick={()=>{
                                Auth.signOut();
                                setUiState('signIn');
                                setUser(null);
                            }}
                        >
                            Sign out
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default Profile;