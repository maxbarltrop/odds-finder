import "./App.scss";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Main from "./components/Main";
import SignIn from "./components/SignIn";
import Header from "./components/Header";
import Background from "./components/Background";
import { useEffect } from "react";

firebase.initializeApp({
  apiKey: "AIzaSyBTic5V4Q8RIndKkpBFdRZmTmwCu_Y-CKw",
  authDomain: "chat-app-82fd7.firebaseapp.com",
  projectId: "chat-app-82fd7",
  storageBucket: "chat-app-82fd7.appspot.com",
  messagingSenderId: "977103886849",
  appId: "1:977103886849:web:748ef4063004972292be00",
  measurementId: "G-FHGFWF6T09",
});

const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="app">
      <section>
        <Header auth={auth} />
      </section>
      <div className="site-content">
        <section>{user ? <Main /> : <SignIn auth={auth} />}</section>
      </div>
      <Background />
    </div>
  );
}

export default App;
