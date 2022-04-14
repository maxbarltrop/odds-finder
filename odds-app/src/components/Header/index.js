import React from "react";

const Header = ({ auth, noSignIn, goBack }) => {
  const SignOut = () => {
    if (noSignIn) {
      return (
        <div className="header-sign-out" onClick={() => goBack()}>
          <p>Sign In</p>
        </div>
      );
    }
    return (
      auth.currentUser && (
        <div className="header-sign-out" onClick={() => auth.signOut()}>
          <p>Sign Out</p>
        </div>
      )
    );
  };

  const Options = () => {
    if (noSignIn || !auth.currentUser) {
      return <div className="header-options">Not Signed In</div>;
    }
    return (
      <div className="header-options">
        Signed In As
        <br />
        <span className="user-name">
          {auth.currentUser._delegate.displayName}
        </span>
      </div>
    );
  };

  return (
    <div className="header">
      <Options />
      <div className="header-title">Max's Odds App</div>
      <SignOut />
    </div>
  );
};

export default Header;
