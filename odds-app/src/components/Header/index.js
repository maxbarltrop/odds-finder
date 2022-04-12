import React from "react";

const Header = ({ auth }) => {
  const SignOut = () => {
    return (
      auth.currentUser && (
        <div className="header-sign-out" onClick={() => auth.signOut()}>
          <p>Sign Out</p>
        </div>
      )
    );
  };

  const Options = () => {
    return <div className="header-options">Options</div>;
  };

  return (
    <div className="header">
      <Options />
      <div className="header-title">Max Barltrop</div>
      <SignOut />
    </div>
  );
};

export default Header;
