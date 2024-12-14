const { validate } = require('../../app/services/validationService')

const checkServiceMock = {
    min: () => { return 0 },
    max: () => { return 99 },
    average: () => { return 30 },
}
const historyMock = [[99,88,77,66,55,0,9]]
const blockListMock = []

describe('validation serive', () => {
    test('validate should be instance of funcrtion', () => {
        expect(validate).toBeInstanceOf(Function)
    })

    // (checkService, definition, numbers, history, blocklist)
    test('validate should return false when length of array is diffrent from definition', () => {
        const test = [ 1,2,3]
        const actual = validate(checkServiceMock, { total: 7 }, test, historyMock, blockListMock)
        expect(actual).toBe(false)
    })
    test('validate should return false when number is lower than allowed', () => {
        const test = [0]
        const actual = validate(checkServiceMock, { total: 1, rules:[ { index: 0, min: 1, max: 50 }] }, test, historyMock, blockListMock)
        expect(actual).toBe(false)
    })
    test('validate should return false when number is higher than allowed', () => {
        const test = [51]
        const actual = validate(checkServiceMock, { total: 1, rules:[ { index: 0, min: 1, max: 50 }] }, test, historyMock, blockListMock)
        expect(actual).toBe(false)
    })

    test('validate should return false when numbers have duplicates', () => {
        const test = [10,10,20]
        const actual = validate(
            checkServiceMock, { 
            total: 3, 
            sets: [0],
            rules:[ 
            { index: 0, min: 1, max: 50, set: 0 },
            { index: 1, min: 1, max: 50, set: 0 },
            { index: 2, min: 1, max: 50, set: 0 }
        ] }, test, historyMock, blockListMock)
        expect(actual).toBe(false)
    })

    test('validate should return true when test is correct', () => {
        const test = [10,20,20]
        const actual = validate(checkServiceMock, { 
            total: 3, 
            sets: [0,1],
            rules:[ 
            { index: 0, min: 1, max: 50, set: 0 },
            { index: 1, min: 1, max: 50, set: 0 },
            { index: 2, min: 1, max: 50, set: 1 }
        ] }, test, historyMock, blockListMock)
        expect(actual).toBe(true)
    })
})
