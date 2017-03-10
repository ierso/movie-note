import  React from 'react'

export const MovieSearch = (props) => {

    return (
        <div className="Search-Field">
            <form>
                <input type="text" 
                onChange={props.updateSearch}
                value={props.searchValue}
                onFocus={props.showMenu}
                onBlur={props.hideMenu}
                />
            </form>
        </div>
    )
}
