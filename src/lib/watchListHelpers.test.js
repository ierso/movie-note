import {addMovie, findId, toggleComplete} from './watchListHelpers'

test('addMovie should add a movie to the watch list', () => {
    const startList = [
        {id: 1, title: 'one', remove: false},
        {id: 2, title: 'two', remove: false}
    ]
    const newMovie = {id: 3, title: 'three', remove: false}
    const expected = [
        {id: 1, title: 'one', remove: false},
        {id: 2, title: 'two', remove: false},
        {id: 3, title: 'three', remove: false}
    ]
    const result = addMovie(startList, newMovie)

    expect(result).not.toBe(startList)
})

test('findId should return the expected item from the array', ()=>{
    const startList = [
        {id: 1, title: 'one', remove: false},
        {id: 2, title: 'two', remove: false}
    ]
    const expected = {id: 2, title: 'two', remove: false}
    const result = findId(2, startList)
    expect(result).toEqual(expected)
})

test('toggleComplete toggles the complete of the movie', ()=>{
    const movie = {id: 2, title: 'two', remove: false}
    const expected = {id: 2, title: 'two', remove: true}
    const result = toggleComplete(movie)
    expect(result).toEqual(expected)
})