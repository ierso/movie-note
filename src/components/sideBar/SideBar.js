import React, { Component } from 'react';
import {Menu} from '.././menu/Menu'
import LoginButtons from '.././loginButtons/LoginButtons'

import { Link } from 'react-router';

import './css/index.css'
import '.././menu/index.css'

class SideBar extends Component {
    state = {
    }
    constructor(props){
      super()
      this.state = {
          windowWidth: window.innerWidth,
          sidebarClass: 'sidebar'
      }
    }

    handleResize(e) {
        const winWidth = window.innerWidth
        const maxWidth = 950

        if(winWidth >= maxWidth){
         this.props.showMenu()
        }else{

        } 

        this.setState({
        windowWidth: window.innerWidth
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this))

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this))
    }


    render () {
  
      return (
        <div className={this.props.sideBar}> 
          <div className="movie-note">
            <div className="user">
              {
                (this.props.username) 
                ? <p>Welcome {this.props.username}</p>
                : <p>Welcome to Movie-Note</p>
              }
              <Menu
              toggleMenu={this.props.toggleMenu} 
              menuClass='change menu'
              />
            </div>
            
            <div className="login-user-mobile">
              <LoginButtons 
              loggedIn={this.props.loggedIn} 
              openModalLogin={this.props.openModalLogin}
              openModalRegister={this.props.openModalRegister}
              handleLogOut={this.props.handleLogOut}
              />
            </div>
            
            
            <div className="sidebar-title">
              <h2><Link className="sidebar-title" onlyActiveOnIndex activeStyle={{backgroundColor: '#383a4e', color:'#ff9104'}} to="/">Recent Movies</Link></h2>
            </div>
            <div className="watchlist-title">
              <h2>Watchlist</h2>
            </div>
            <div className="watchlist">
              <ul>
                {this.props.watchList.map((movie)=>{
                  return (
                  <li className="watchlist-module" key={movie.id}>
                    <input className="checkbox" type="checkbox" onChange={() => this.props.removeMovie(movie.id)} defaultChecked={movie.remove}/> 
                    <Link activeStyle={{backgroundColor: '#383a4e', color: '#ff9104'}} to={`/movie/${movie.id}`}>
                      {movie.title}
                    </Link>
                  </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      )
    } 
}

export default SideBar;