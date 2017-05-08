import  React from 'react'
import searchIcon from '../../search.svg'

import './MovieSearch.css'

export const MovieSearch = (props) => {

    let search = {
        height: '30px',
        width: '30px',
        backgroundColor: '#eee',
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
                onChange={props.updateSearch}
                value={props.searchValue}
                placeholder="Search movies..."
                />
            </form>
        </div>
    )
}
 