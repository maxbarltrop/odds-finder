import React from "react";
import GOOGLE from "../../assets/images/google-logo.svg"
import REACT from "../../assets/images/react.svg";
import FIREBASE from "../../assets/images/firebase.svg"
import EXTERNAL from "../../assets/images/external.svg"

export const About = () => {
  return (
    <div className="site-about">
      <div className="site-about-title">About</div>Single-page application made in <img className="site-about-icon" src={REACT} alt="React"></img>React that fetches betting on upcoming games for from {" "}
      <a href="https://www.cloudbet.com/api/">Cloudbet</a> and returns the <a href="https://sportshandle.com/moneyline/">moneyline.</a> Sign-in with <img className="site-about-icon" src={GOOGLE} alt="Google"></img>Google Auth is done through{" "}
      <img className="site-about-icon" src={FIREBASE} alt="Firebase"></img>Firebase, and adding favorites persists them in Firestore.
      <div className="source-code" onClick={() => window.location.href = 'https://github.com/maxbarltrop/odds-finder'}>Source Code<img className="external-icon" alt="Github" src={EXTERNAL} /></div>
    </div >
  );
};

export default About;
