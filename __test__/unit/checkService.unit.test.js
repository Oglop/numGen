const {average, max, min} = require('../../app/services/checkService')

describe('checkservice avereage unit tests', () => {
    test('avereage should be instance of function', () => {
        expect(average).toBeInstanceOf(Function)
    })

    test('average should return the average sum of given sets', () => {
        const expected = 10
        const data = [
            [1,1,1,1,1,98,99],
            [3,3,3,3,3,98,99],
            [2,2,2,2,2,98,99],
            [2,2,2,2,2,98,99],
        ]
        var actual = average(data)
        expect(actual).toBe(expected)
    })
})

describe('checkservice max unit tests', () => {
    test('max should be instance of function', () => {
        expect(max).toBeInstanceOf(Function)
    })

    test('should return the max sum of numbers given array of numbers', () => {
        const expected = 240

        const data = [
            [1,2,3,4,5,1,2],
            [12,13,14,15,16,6,8],
            [46,47,48,49,50,11,12],
        ]

        var actual = max(data)
        expect(actual).toBe(expected)
    
    })

    test('should return zero given empty array', () => {
        const expected = 0
        const data = []
        var actual = max(data)
        expect(actual).toBe(expected)
    })
})

describe('checkservice min unit tests', () => {
    test('min should be instance of function', () => {
        expect(min).toBeInstanceOf(Function)
    })

    test('should return the min sum of numbers', () => {
        const expected = 15
        const data = [
            [1,2,3,4,5,1,2],
            [12,13,14,15,16,6,8],
            [46,47,48,49,50,11,12],
        ]
        var actual = min(data)
        expect(actual).toBe(expected)
    })
})



