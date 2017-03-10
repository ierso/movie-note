import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router';
import {MovieSearch} from './components/movieSearch/MovieSearch'
import {MovieList} from './components/movieList/'
import {loadMovies} from './lib/movieService'

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      movies: [],
      currentMovie: 'Home Alone',
      searchValue: '',
      poster: 'https://secure.static.tumblr.com/opuuuju/lWjn7izq1/coming-soon.png',
      showMenu: false
    }
  }
  

  componentWillMount(){
    // Called the first time the component is loaded right before the component is added to the page
    this.search();
  }

  componentDidMount(){
    // Called after the component has been rendered into the page
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

  showMenu = () => {
    this.setState({
      showMenu: true
    })
    console.log('hello')
  }

  hideMenu = () => {
    this.setState({
      showMenu: false
    })
    console.log('goodbye')
  }
  

  render() {
    
    return (
      <div className="App">
        
        <h1>Movie-Note</h1>
        
        <div className="Movie-Search">
          <MovieSearch 
          updateSearch={this.updateSearch}
          searchValue={this.state.searchValue}
          showMenu={this.showMenu}
          hideMenu={this.hideMenu}
          />

          {}
          
          <div className="Movie-Info">
            <MovieList 
              showMenu={this.state.showMenu}
              movies={this.state.movies} 
              poster={this.state.poster}/>
          </div>

        </div>

        {this.props.children}
        
        <div className="Movie-Note">
          <h1>Movie Note</h1>
          <ul>
            <li><Link activeStyle={{color: 'green'}} to="/movie">Movie</Link></li>
          </ul>
        </div>

      </div>
    );
  }
}

export default App;
