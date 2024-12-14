const {dummyData} = require('../percistance')
const { allowedDiffFromAverage } = require('../../config')
const { debug } = require('../services/loggerService')

/**
 * validates list
 * @param { { average: ([number]) number } } checkService 
 * @param {{
 *  total: number,
 * sets:[0,1]
 *  rules: [{index: number, min: number, max: number, set: number}]
 * }} definition 
 * @param {[number]} numbers 
 * @param {[number]} forbidden 
 * @returns {boolean} valid
 */
const validate = (checkService, definition, numbers, history, blocklist) =>  {

    const forbidden = [ ...history[history.length -1].slice(0,5).sort((a, b) => {return a - b}), ...blocklist ]
    
    if (numbers.length != definition.total) { return false }
    for (let rule of definition.rules) {
        if (numbers[rule.index] < rule.min) { return false }
        if (numbers[rule.index] > rule.max) { return false }
    }


    for (let n of numbers) {
        if (forbidden.includes(n.id)) { 
            debug(`${forbidden} includes ${n.id}`)
            return false
        }
    }

    for (let s of definition.sets) {
        const set = definition.rules.filter(x => x.set == s)
        const from = fromValue(set)
        const duplicatesCheckSet = numbers.slice(from, set.length)
        if ((new Set(duplicatesCheckSet)).size !== duplicatesCheckSet.length) { 
            debug(`${s} is a duplicate`)
            return false
        } 
    }

    const row = numbers.slice(0,5)
    const sum = row.reduce((n, {id}) => n + id, 0)

    if (sum < checkService.min(dummyData)) { return false }
    if (sum > checkService.max(dummyData)) { return false }

    const average = checkService.average(dummyData)
    if (sum > average + allowedDiffFromAverage || sum < average - allowedDiffFromAverage) 
        { 
            debug(`sum: ${sum}, average: ${average},  upper: ${average + allowedDiffFromAverage}, lower: ${average - allowedDiffFromAverage}`)
            return false
        }

    return true
}


const fromValue = (set) => {
    let index = 9999999
    for (let number of set) {
        if (number.index < index) { index =  number.index }
    }
    return index
}

module.exports = {
    validate
}