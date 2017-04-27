import React, { Component } from 'react';

export default class LoginButtons extends Component {
  constructor(props){
    super();
    // const isLoggedIn = props.isLoggedIn
  }
  
  

  render () {
    
    return (
      <div>
        {!this.props.loggedIn ? (
            <div>
                <button onClick={this.props.openModalLogin}>Login</button>
                <button onClick={this.props.openModalRegister}>Register</button>
            </div> 
        ) : (
            <button onClick={this.props.handleLogOut}>Log Out</button>
        )}
      </div>
    )
  }
}




