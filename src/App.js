import React, { Component } from 'react';
import fire from './fire';
import './App.css';
import {MovieSearch} from './components/movieSearch/MovieSearch'
import {SideBar} from './components/sideBar/'
import {MovieList} from './components/movieList/'
import {loadMovies} from './lib/movieService'
// import {addMovie} from './lib/watchListHelpers'



class App extends Component {
  
  constructor(props){
    super(props);
  
    this.state = {
      movies: [],
      messages: [],
      watchList: [
        {id: 1, title: 'Home Alone'},
        {id: 2, title: 'Batman Begins'}
      ],
      searchValue: '',
      poster: 'https://secure.static.tumblr.com/opuuuju/lWjn7izq1/coming-soon.png'
    }
  }

  componentWillMount(){
    // Called the first time the component is loaded right before the component is added to the page
    let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    })
  }
  
  addMessage(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref('messages').push( this.inputEl.value );
    this.inputEl.value = ''; // <- clear the input
  }

  componentWillUnmount() {  
    this.firebaseRef.off();
  };

  componentDidMount(){
    
    // Called after the component has been rendered into the page
    // this.setState({
    //   watchList: [
    //     {id: 1, title: 'Fun Fun'},
    //     {id: 2, title: 'Cool'}
    //   ]
    // })

    // const rootRef = firebase.database().ref().child('react');
    // const currentMovieRef = rootRef.child('currentMovie');
    // currentMovieRef.on('value', snap => {
    //   this.setState({
    //     currentMovie: snap.val()
    //   });
    // });
  }

  pushToFirebase(event) {
    event.preventDefault();
    this.firebaseRef.push({text: this.state.text});
    this.setState({text: ''});
  }

  componentWillUpdate(nextProps, nextState){
    // Called when the props and/or state change
  }


  updateSearch = (e) => {
    this.search(e.target.value)
    this.setState({
      searchValue: e.target.value
    })
  }


  search = (query="star") => {
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
  
  newPage = () => {
    this.history.pushState(null, '/stuff/')
    console.log('test')
  }



  render() {

    return (
      <div className="App">
        <form onSubmit={this.addMessage.bind(this)}>
        <input type="text" ref={ el => this.inputEl = el }/>
        <input type="submit"/>
        <ul>
          { /* Render the list of messages */
            this.state.messages.map( message => <li key={message.id}>{message.text}</li> )
          }
        </ul>
        </form>
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
              <SideBar watchList={this.state.watchList}/>
            </div>
            <div className="col-md-9 test">
              {React.cloneElement(this.props.children,this.state)} 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
