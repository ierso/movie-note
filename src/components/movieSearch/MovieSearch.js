import  React from 'react'

export const MovieSearch = (props) => {

    return (
        <div className="search-field">
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
 