const { TYPES } = require('../../enums')
const {dummyData: history} = require('../percistance')
const { maxAllowedAtempts } = require('../../config')
const { debug } = require('./loggerService')

/**
 * @param { { numbersDefinition: (TYPES) {} } } definitionService 
 * @param { { validate: ([number]) bool } } validationService 
 * @param { { average: ([number]) number } } checkService 
 * @param { TYPES } type 
 * @param { { numberOfLists: number, blocklist: [number] } } options
 * @returns { { lists: [ { numbers: [ number: number ] } ] } } lists
 */
const generateNumbersLists = (definitionService, validationService, checkService, type,  options = { }) => {
    let atempts = 0
    const listsToGenerate = (options.numberOfLists != undefined) ? options.numberOfLists : 1
    const blocklist = (options.blocklist != undefined) ? options.blocklist : []
    const lists = []
    while (lists.length < listsToGenerate) {
        atempts+=1
        const definition = definitionService.numbersDefinition(type)
        const list = generateList(definition, history) 
        const success = validationService.validate(checkService, definition, list, history, blocklist)
        debug(`success: ${success}`)
        if(success) { lists.push(list) }
        if (atempts >= maxAllowedAtempts) {
            break
        }
    }
    return lists
}

/**
 * 
 * @param {*} definition 
 * @param {*} history 
 * @returns {[number]}
 */
const generateList = (definition, history) => {
    const numbers = []
    for (const rule of definition.rules) {
        const candidates = populateCandidates(rule.min, rule.max, rule.set, numbers)
        candidates.forEach(x => x.weight = weighNumber(rule.index, x.id, history, definition))
        numbers.push(pickANumber(candidates))
    }
    const list = sortList(numbers, definition)
    return list
}

const getMinIndexOfSet = (index, definition) => {
    const rule = definition.rules.find(r => r.index == index)
    let min = Number.POSITIVE_INFINITY
    for (let i = 0, l = definition.rules.length; i < l; i++) {
        if (rule.set == definition.rules[i].set) {
            min = Math.min(min, definition.rules[i].index)
        }
        
    }
    return min
}

const getMaxIndexOfSet = (index, definition) => {
    const rule = definition.rules.find(r => r.index == index)
    let max = 0
    for (let i = 0, l = definition.rules.length; i < l; i++) {
        if (rule.set == definition.rules[i].set) {
            max = Math.max(max, definition.rules[i].index)
        }
    }
    return max + 1
}

/**
 * 
 * @param {[{ id: number, weight: number }]} candidates 
 * @returns {number} id
 */
const pickANumber = candidates => {
    const divider = getRandomNumberInRange(2, 5)
    const sorted = candidates.sort((x, y) => {return x.weight-y.weight})
    const position = getRandomNumberInRange(0, Math.floor(sorted.length / divider))
    return sorted[position]
}

/**
 * populate candidates array
 * @param { number } from 
 * @param { number } to 
 * @param { [number] } [exclusions = []] exclusions
 * @returns {{ id: number, weight: number }} candidates
 */
const populateCandidates = (from, to, set, exclusions = []) => { 
    const candidates = []
    for (let j = from; j <= to; j++) {
        if (exclusions.find(x => x.id == j) == undefined) {
            candidates.push({
                id: j,
                weight: 0,
                set
            })
        }
    }
    return candidates
}

/**
 * 
 * @param {[number]} list 
 * @param {{ total: number, sets: [], rules: [{}] }} definition 
 */
const sortList = (list, definition) => {
    const sorted = []
    definition.sets.forEach(set => {
        const from = getMinIndexOfSet(getFirstIndexOfSet(set, definition), definition)
        const to = getMaxIndexOfSet(getFirstIndexOfSet(set, definition), definition)
        const part = list.slice(from, to)
        part.sort((a, b) => {return a.id-b.id})
        sorted.push(...part)
    });
    return sorted
}

const getFirstIndexOfSet = (set, definition) => {
    for (let i = 0, l = definition.rules.length; i < l; i++) {
        if (definition.rules[i].set == set) {
            return definition.rules[i].index
        }
    }
}

/**
 * return number with weight
 * @param {number} index 
 * @param {{ id: number, instances: number }} number 
 * @param { lists:[ [number] ] } history
 * @returns { number } weight
 */
const weighNumber = (index, id, history, definition, ) => {
    const count = countInstances(index, id, history, definition)
    return weight = count * 1
}



/**
 * returns instances 
 * @param {number} index 
 * @param {number} id 
 * @param { lists:[ [number] ] } history
 * @returns {number} instances
 */
const countInstances = (index, id, history, definition) => {
    let count = 0
    history.forEach(list => {
        const from = getMinIndexOfSet(index, definition)
        const to = getMaxIndexOfSet(index, definition)
        const set = list.slice(from, to)


        if (set.includes(id)) { count++ }
    })
    return count
}

const getRandomNumberInRange = (from, to) => {
    let i = from
    let j = to
    if (from > to) {
        i = to
        j = from
    }
    let k = j + 1 - i
    return Math.floor(i + Math.random() * k)
}


module.exports = {
    generateNumbersLists,
    weighNumber,
    countInstances,
    getMinIndexOfSet,
    getMaxIndexOfSet,
    pickANumber,
    populateCandidates
}

