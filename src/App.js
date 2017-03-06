import React, { Component } from 'react';
import './App.css';
import {MovieSearch} from './components/movieSearch/MovieSearch'
import {MovieList} from './components/movieInfo/'
import {loadMovies} from './lib/movieService'

class App extends Component {

  state = {
    movies: [],
    currentMovie: 'Home Alone',
    searchValue: '',
    poster: 'https://secure.static.tumblr.com/opuuuju/lWjn7izq1/coming-soon.png'
  }

  componentDidMount(){
    loadMovies('inception').then(
      movies => {
        this.setState({movies})
        console.log(this.state.movies)
      }
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()
    loadMovies(this.state.searchValue).then(
      movies => {
        this.setState({movies})
        console.log('new search complete')
      }
    )

    this.setState({
      searchValue: ''
    })
    
  }

  handleInputChange = (e) => {
    this.setState({
      searchValue: e.target.value
    })
  }


  render() {
    return (
      <div className="App">
        <h1>Movie-Note</h1>
        {
          (this.state.currentMovie === 'Home Alone')
            ? <div>Something went wrong</div>
            : <div>Everything is fine</div>
        }
        <div className="Movie-Search">
          <MovieSearch 
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
          searchValue={this.state.searchValue}/>
        </div>
        
        <div className="Movie-Info">
          <MovieList 
          movies={this.state.movies} 
          poster={this.state.poster}/>
        </div>
      </div>
    );
  }
}

export default App;
