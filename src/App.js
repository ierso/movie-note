import React, { Component } from 'react';
import {fire} from './fire';
import firebase from 'firebase';

import { Link } from 'react-router';

import './App.css';

//Modal
import Modal from './components/modal/Modal'

// Auth
import LoginButtons from './components/loginButtons/LoginButtons'
import Login from './components/login/Login'
import Register from './components/register/Register'

// import {Movie} from './components/movie/Movie'
import {MovieSearch} from './components/movieSearch/MovieSearch'
import {SideBar} from './components/sideBar'
import {MovieList} from './components/movieList'

import {loadMovies} from './lib/movieService'


import {findId, toggleRemove, removeMovie, updateRemove} from './lib/watchListHelpers'



import {ModulePoster} from './components/movieList/ModulePoster'

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

  loggedIn(){
    this.setState({
      login: true
    })
  }
  loggedOut(){
    this.setState({
      login: false
    })
  }

  componentWillMount(){
    // Called the first time the component is loaded right before the component is added to the page
 
    // Listen to auth state changes
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {

        // this.setLogInMessage()
        this.loggedIn()
        
        let self = this
        let ref = firebase.database().ref().child('/users/'+firebaseUser.uid)
        let watchRef = ref.child('watchlist')
        
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
        
      } else {
        this.loggedOut()
        console.log('not logged in');
        // this.setLogOutMessage()

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

    let user = firebase.auth().currentUser;
   
    if (user != null) {
     
      let uid = user.uid;
     
     
      console.log(newMovie.id)
      console.log(this.state.watchList)
      // adding data to user
      firebase.database()
      .ref('/users/'+uid+'/watchlist/'+newMovie.id)
      .set(newMovie)
      
    }
  }

  removeMovie = (id) => {


    //i want to get the actual id of the Object
    //i cant use the id because if i delete 0 to the end it wont work properly 

    // here's my idea - add the object with a unique id rather than use the index
    // that way when you remove the object you are using the uid instead of index
    
    let movie = findId(id, this.state.watchList)
    let removed = toggleRemove(movie)
    let index = this.state.watchList.indexOf(movie);
    let updatedWatchList = updateRemove(this.state.watchList, removed)

    let movieUID = this.state.watchList[index].id
    console.log(movieUID)

    
    
    this.setState({
      watchList: updatedWatchList
    })
    
    if(!movie.remove){
      let updatedWatchList = removeMovie(this.state.watchList, index)
      this.setState({
        watchList: updatedWatchList
      })
    }

    firebase.auth().onAuthStateChanged(firebaseUser => {
     
      if(firebaseUser) {
       
        // this.setLogInMessage()
        
        firebase.database()
        .ref('/users/'+firebaseUser.uid+'/watchlist/'+movieUID)
        .remove()
      
      } else {
        
        // this.setLogOutMessage()

      }
    });
    
  }
  
  render() {


    return (
      <div className="app">
        <ModulePoster />

        <div className="sidebar">
          <Link to="/">GO HOME</Link>     
          <SideBar removeMovie={this.removeMovie} watchList={this.state.watchList}/>
   
        </div>

        <div className="movie-note">
        
          <div className="header">
            
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
            <div className="login-user">
              <LoginButtons 
                loggedIn={this.state.login} 
                openModalLogin={this.openModalLogin}
                openModalRegister={this.openModalRegister}
                handleLogOut={this.handleLogOut}
              />
            </div>
              
            <Modal isOpen={this.state.isModalOpen} onClose={this.closeModal}>
              
              { this.state.login ? <Login closeModal={this.closeModal}/> : null }
              { this.state.register ? <Register closeModal={this.closeModal}/> : null }
              
              <p><button onClick={this.closeModal}>Close</button></p>
            </Modal>
              
            
          </div> 
              
          <div className="main">
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
    );
  }
}

export default App;
