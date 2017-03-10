import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import App from './App';
import MovieList from './components/movieList/MovieList';
import Movie from './components/movie/Movie';
import NotFound from './pages/NotFound/NotFound';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={App}>
            <IndexRoute component={MovieList}/>
            <Route path="/movie" component={Movie}/>
            <Route path="*" component={NotFound}/>
        </Route>
    </Router>
);

export default Routes;