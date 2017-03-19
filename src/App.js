import React, { Component } from 'react';
import './App.css';
import {MovieSearch} from './components/movieSearch/MovieSearch'
import {SideBar} from './components/sideBar/'
import {MovieList} from './components/movieList/'
import {loadMovies} from './lib/movieService'

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      movies: [],
      currentMovie: 'Home Alone',
      searchValue: '',
      poster: 'https://secure.static.tumblr.com/opuuuju/lWjn7izq1/coming-soon.png'
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
          <div className="row test">
            <div className="col-md-8 test">
              {this.props.children}
            </div>
            <div className="col-md-4 test">
              <SideBar />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
