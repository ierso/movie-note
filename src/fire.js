import firebase from 'firebase'; 
const config = {  
    apiKey: "AIzaSyCmffj7JtcqnrkgBKf8_SJLaTThx3ad5TE",
    authDomain: "movie-note.firebaseapp.com",
    databaseURL: "https://movie-note.firebaseio.com",
};

var fire = firebase.initializeApp(config);
export default fire;