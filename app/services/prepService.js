
/**
 * returns stringified representation of array
 * @param { [{ id: number, weight: number }] } list 
 */
const stringify = (list) => {
    let result = ''
    for (let i = 0; i < list.length; i++) {
        result = (i == 0) ? `${list[i].id}` : `${result},${list[i].id}`
    }
    return result
}

module.exports = {
    stringify
}
