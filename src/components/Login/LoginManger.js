import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFrameWork = () => {
  firebase.initializeApp(firebaseConfig);
};
export const handleGoogleSignIn = () => {
  const GoogleProvider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(GoogleProvider)
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

export const handleSignOut = () => {
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

export const createUserWithEmailAndPassword = () => {
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
};

export const signInWithEmailAndPassword = () => {
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
