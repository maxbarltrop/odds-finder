import React from "react";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import GoogleLogo from "../../assets/images/google-logo.svg";

const SignIn = ({ auth }) => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <div className="sign-in">
        <div className="sign-in-header">Choose a Sign-In Option to Begin:</div>
        <div className="sign-in-break" />
        <div className="sign-in-button" onClick={signInWithGoogle}>
          <img className="sign-in-icon" src={GoogleLogo} alt="google-logo" />
          <span className="sign-in-button-text">Sign in with Google</span>
        </div>
      </div>
    </>
  );
};

export default SignIn;
