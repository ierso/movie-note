export const addMovie = (list, item) => {
    return[...list, item]
}

export const findId = (id, list) => {
    return list.find(item => item.id === id)
}

export const toggleRemove = (item) => {
    return ({...item, remove: !item.remove})
}

export const removeMovie = (list, index) => {
    return [
        ...list.slice(0, index),
        ...list.slice(index + 1)
    ]
}

export const updateRemove = (list, updated) => {
    const updatedIndex = list.findIndex(item => item.id === updated.id)
    return [
        ...list.slice(0, updatedIndex),
        updated,
        ...list.slice(updatedIndex+1)
    ]
}

export const modifyText = (word, letter) => {
    return word.split(letter)[0]
} 
