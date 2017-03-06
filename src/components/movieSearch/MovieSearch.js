import  React from 'react'

export const MovieSearch = (props) => {
    return (
        <div className="Search-Field">
            <form onSubmit={props.handleSubmit}>
                <input type="text" 
                onChange={props.handleInputChange} 
                value={props.searchValue}/>
            </form>
        </div>
    )
}
