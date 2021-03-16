import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { useContext, useState } from "react";
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";

firebase.initializeApp(firebaseConfig);

function Login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const signedIn = {
          isSignedIn: true,
          name: displayName,
          email,
          photo: photoURL,
        };
        setUser(signedIn);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.meassage);
      });
  };

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const signedOut = {
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
          error: "",
          sucess: false,
        };
        setUser(signedOut);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleBlur = (e) => {
    let isFieldValid = true;

    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }

    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }

    if (isFieldValid) {
      const userInfo = { ...user };
      userInfo[e.target.name] = e.target.value;
      setUser(userInfo);
    }
  };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          // Signed in
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.sucess = true;
          setUser(newUserInfo);
          updateUserName(user.name);

          // ...
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.sucess = false;
          setUser(newUserInfo);

          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ..
        });
    }

    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          // Signed in
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.sucess = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log(res.user, "sign in info");
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.sucess = false;
          setUser(newUserInfo);

          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }

    e.preventDefault();
  };

  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        // Update successful.
        console.log("updtaed sucessfully");
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Home</h1>
      <p>Email {user.email}</p>
      <p>Password {user.password}</p>

      {user.isSignedIn ? (
        <button onClick={handleSignOut}>Sign out</button>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}

      {user.isSignedIn && (
        <div>
          <img src={user.photo} alt={user.name} />
        </div>
      )}
      <br />
      <button>Log in using Facebook</button>
      <h3>Welcome {user.name}</h3>
      <p>{user.email}</p>

      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
      />
      <label htmlFor="newUser">New User Sign up</label>

      <form onSubmit={handleBlur}>
        {newUser && (
          <input
            type="text"
            name="name"
            onBlur={handleBlur}
            placeholder="Name"
          />
        )}
        <br />
        <input
          type="text"
          onBlur={handleBlur}
          name="email"
          placeholder="Email"
          required
        />
        <br />
        <input
          onBlur={handleBlur}
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <br />
        <input
          type="submit"
          onClick={handleSubmit}
          value={newUser ? "Sign Up" : "Sign in"}
        />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.sucess && (
        <p style={{ color: "green" }}>
          Account SuccessFully {newUser ? "created" : "logedIN"}
        </p>
      )}
    </div>
  );
}

export default Login;
