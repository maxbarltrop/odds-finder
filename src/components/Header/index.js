import React from "react";

const Header = ({ auth, noSignIn, goBack, about, setAbout }) => {
  const SignOut = () => {
    if (about) {
      return (
        <div className="header-sign-out" onClick={() => setAbout(false)}>
          <p>Home</p>
        </div>
      );
    }
    if (noSignIn) {
      return (
        <div className="header-sign-out" onClick={() => goBack()}>
          <p>Sign In</p>
        </div>
      );
    }
    return auth.currentUser ? (
      <div className="header-sign-out" onClick={() => auth.signOut()}>
        <p>Sign Out</p>
      </div>
    ) : (
      <div className="header-sign-out" onClick={() => setAbout(true)}>
        <p>About</p>
      </div>
    );
  };

  const Options = () => {
    if (about) {
      return <div />;
    }
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
      <div className="header-title">Max's React App</div>
      <SignOut />
    </div>
  );
};

export default Header;
