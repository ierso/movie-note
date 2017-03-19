import React, { Component } from 'react';
import { Link } from 'react-router';

class Home extends Component {
  
  render() {
    return (
      <div className="Home">
        <h1>Home</h1>
        <h2><Link to={'movie/pumpkin'}>test</Link></h2> 
      </div>
    );
  }
}

export default Home;
