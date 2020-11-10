import * as React from 'react';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import Socket from './Socket';

export default function GoogleButton(params) {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  console.log(clientId);
  function success(response) {
    const { code } = response;
    let profilePic;
   
    if(code != undefined)
    {
      Socket.emit('login with code', {
      "code":code
      });
    }
    else
    {
      const { email } = response.profileObj;
      Socket.emit('login with email', {
      "email":email
      });
    }
    
    Socket.emit('sendCalendar',{ 
      "email":"jme5@njit.edu"  //hardcoded value; email address cannot be retrieved on client side when auth
    });                         //code is retreived on client side.  
    params.setAuthenticated(true);
    params.setCode(code);
  }

  function failure() {
    params.setAuthenticated(false);
  }

  function logout(){
    const name = "";
    const email = "";
    const accessToken= "";
    let profilePic = "";
    console.log("logout");
    Socket.emit('logout', {
      name,
      email,
      profilePic,
    });

    params.setAuthenticated(false);
  }
  


  if(!params.authenticated)
  {
    return (
    <GoogleLogin
      className="googleLoginButton"
      clientId={clientId}
      buttonText="Log in with Google"
      onSuccess={success}
      onFailure={failure}
      isSignedIn={true}
      cookiePolicy="single_host_origin"
       responseType="code"
      accessType="offline"
      prompt="consent"
      scope={"https://www.googleapis.com/auth/calendar"}
      
    />
    );
  }
  else
  {
    return (
    <GoogleLogout
      className="googleLogoutButton"
      isSignedIn={false}
      clientId="25700182333-kan1soef90krqdbho3mogdbr35k4fpd6.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
      onFailure={failure}
    />
    );
  }
  
}