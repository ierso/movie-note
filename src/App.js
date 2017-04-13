import React, { Component } from 'react';
import {fire} from './fire';
import firebase from 'firebase';

import { Link } from 'react-router';

import './App.css';

//Modal
import Modal from './components/modal/Modal'

// Auth
import Login from './components/login/Login'
import Register from './components/register/Register'

// import {Movie} from './components/movie/Movie'
import {MovieSearch} from './components/movieSearch/MovieSearch'
import {SideBar} from './components/sideBar'
import {MovieList} from './components/movieList'

import {loadMovies} from './lib/movieService'


import {findId, toggleRemove, removeMovie, updateRemove} from './lib/watchListHelpers'


// import {addMovie} from './lib/watchListHelpers'



class App extends Component {
  
  constructor(props){
    super(props);
  
    this.state = {
      test: [],
      keys: [],
      movies: [],
      loggedIn: "not logged in",
      watchList: [],
      searchValue: '',
      poster: 'http://image.tmdb.org/t/p/w185/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg',
      isModalOpen: false,
      login: false,
      register: false
    }
  }

  componentWillMount(){
    // Called the first time the component is loaded right before the component is added to the page
  console.log(this.state.keys)
   
  //  this.firebaseRef = new Firebase("https://ReactFireTodoApp.firebaseio.com/items/");
  //  this.firebaseRef.on("child_added", function(dataSnapshot) {

  //  do i need this bottom code?
  //  findId(2, this.state.watchList)
    
    // Listen to auth state changes
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
        console.log(firebaseUser);
        this.setState({
          loggedIn: "logged in"
        })
        
        const self = this
        const ref = firebase.database().ref().child('/users/'+firebaseUser.uid)
        const watchRef = ref.child('watchlist')
        
        // if there is no data in the database ignore this bottom part

        watchRef.on('value', function(snapshot){
         
          let watchList = []
          let movies = snapshot.val()
          let keys = Object.keys(movies)
          
          keys.map(function(key){
            watchList.push(movies[key])
            return watchList
          })

          if( watchList != null){
            self.setState({
              watchList: watchList
            })
          }

          

        })
          


        //hide login
        //hide register
        //show log out button
      } else {
        console.log('not logged in');
        this.setState({
          loggedIn: "not logged in"
        })
        //show login
        //show register
        //hide log out button
      }
    });
  
    
    let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    })
  }


  componentWillUnmount() {  
    this.firebaseRef.off();
  };

  
  addMessage(e){
    e.preventDefault();
    /* Send the message to Firebase */
    fire.database().ref('messages').push( this.inputEl.value );
    this.inputEl.value = ''; // <- clear the input
  }

  updateSearch = (e) => {
    this.search(e.target.value)
    this.setState({
      searchValue: e.target.value
    })
  }

  search = (query) => {
    loadMovies(query).then(
      movies => {
        this.setState({movies})
      }
    )
  }

  


  hideMenu = () => {
    this.setState({
      searchValue: ''
    })
    console.log('hiding menu')
  }
  

  removeData = (e) => {
    e.preventDefault();
    
  }

  handleLogOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    console.log('logged out');
  }

  // Modal

  openModalLogin = (e) => {
    e.preventDefault();
    this.setState({ 
      isModalOpen: true,
      login: true,
      register: false
    })
  }

  openModalRegister = (e) => {
    e.preventDefault();
    this.setState({ 
      isModalOpen: true,
      register: true,
      login: false
    })
  }

  closeModal = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ 
      isModalOpen: false
    })
  }

  addToWatchList = (newState) => {
     
    let counter = newState.length
    let newMovie = newState[counter-1]

    this.setState({
      watchList: newState
    })

    console.log('Adding data to user')
    var user = firebase.auth().currentUser;
   
    if (user != null) {
     
      let uid = user.uid;
     
      console.log(newMovie)
      // adding data to user
      firebase.database()
      .ref('/users/'+uid+'/watchlist/'+this.state.watchList.length)
      .set(newMovie)
      
    }
  }

  removeMovie = (id) => {
   
    const movie = findId(id, this.state.watchList)
    const removed = toggleRemove(movie)
    const index = this.state.watchList.indexOf(movie);
    const updatedWatchList = updateRemove(this.state.watchList, removed)
    this.setState({
      watchList: updatedWatchList
    })
    
    if(!movie.remove){
      const updatedWatchList = removeMovie(this.state.watchList, index)
      this.setState({
        watchList: updatedWatchList
      })
    }

    firebase.auth().onAuthStateChanged(firebaseUser => {
     
      if(firebaseUser) {
       
        this.setState({
          loggedIn: "logged in"
        })
        

        firebase.database()
        .ref('/users/'+firebaseUser.uid+'/watchlist/'+id)
        .remove()
      
      
      } else {
        console.log('not logged in');
        this.setState({
          loggedIn: "not logged in"
        })

      }
    });
    
  }
  
  render() {


    return (
      <div className="App">
        <h2>{this.state.test}</h2>

        <h1>{this.state.loggedIn}</h1>
        <Link to="/">GO HOME</Link>
        <button onClick={this.openModalLogin}>Login</button>
        <button onClick={this.openModalRegister}>Register</button>
        <button onClick={this.handleLogOut}>Log Out</button>
        
        <Modal isOpen={this.state.isModalOpen} onClose={this.closeModal}>
          
          { this.state.login ? <Login closeModal={this.closeModal}/> : null }
          { this.state.register ? <Register closeModal={this.closeModal}/> : null }
          
          <p><button onClick={this.closeModal}>Close</button></p>
        </Modal>
      
        
        <div className="container test">
          <div className="row test">
            <div className="col-md-12">
              <h1 onClick={this.newPage}>Movie-Note</h1>
              <div className="Movie-Search">
                <MovieSearch 
                updateSearch={this.updateSearch}
                searchValue={this.state.searchValue}
                />
                <div className="Movie-Info">
                  <MovieList
                    newPage={this.newPage}
                    searchValue={this.state.searchValue} 
                    hideMenu={this.hideMenu}
                    movies={this.state.movies} 
                    poster={this.state.poster}/>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 test">
              <SideBar removeMovie={this.removeMovie} watchList={this.state.watchList}/>
            </div>
            <div className="col-md-9 test">
             
              {React.cloneElement(
                this.props.children,
                {watchList:this.state.watchList,
                addToWatchList: this.addToWatchList
                }
                )
              } 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
