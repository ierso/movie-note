import {addMovie} from './watchListHelpers'

test('addMovie should add a movie to the watch list', () => {
    const startList = [
        {id: 1, title: 'one'},
        {id: 2, title: 'two'}
    ]
    const newMovie = {id: 3, title: 'three'}
    const expected = [
        {id: 1, title: 'one'},
        {id: 2, title: 'two'},
        {id: 3, title: 'three'}
    ]
    const result = addMovie(startList, newMovie)

    expect(result).not.toBe(startList)
})