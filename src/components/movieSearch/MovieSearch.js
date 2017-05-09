import React, { Component } from 'react';
import searchIcon from '../../search.svg'

import './MovieSearch.css'

class MovieSearch extends Component {
    
    constructor(props){
      super()
    
    }

    render () {
        const search = {
            height: '30px',
            width: '30px',
            backgroundImage: 'url(' + searchIcon + ')',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundColor: '#212330'
        }
        return (
            <div className="search-field">
                <div style={search}></div>
                <form>
                    <input type="text" 
                    onChange={this.props.updateSearch}
                    value={this.props.searchValue}
                    placeholder="Search movies..."
                    />
                </form>
            </div>
        )
    }
}

export default MovieSearch;