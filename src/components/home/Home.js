import React, { Component } from 'react';

class Home extends Component {

  componentWillMount(){
    console.log('load recent movies');
  }
  
  render() {
    return (
      <div className="Home">
        <h1>Home</h1>
        
      </div>
    );
  }
}

export default Home;
