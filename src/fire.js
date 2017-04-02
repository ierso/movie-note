import firebase from 'firebase'; 
const config = {  
    apiKey: "AIzaSyCmffj7JtcqnrkgBKf8_SJLaTThx3ad5TE",
    authDomain: "movie-note.firebaseapp.com",
    databaseURL: "https://movie-note.firebaseio.com",
};


export const fire = firebase.initializeApp(config);

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

export default fire;