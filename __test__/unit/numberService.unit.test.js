const {
    generateNumbersLists,
    weighNumber,
    countInstances,
    getMinIndexOfSet,
    getMaxIndexOfSet,
    populateCandidates,
    pickANumber
} = require('../../app/services/numberService')

const definitionMock = {
    total: 7,
    sets: [0,1],
    rules: [
        { index: 0, min: 1, max: 50, set: 0, },
        { index: 1, min: 1, max: 50, set: 0, },
        { index: 2, min: 1, max: 50, set: 0, },
        { index: 3, min: 1, max: 50, set: 0, },
        { index: 4, min: 1, max: 50, set: 0, },
        { index: 5, min: 1, max: 12, set: 1, },
        { index: 6, min: 1, max: 12, set: 1, },
    ]
}

const dataMock = [
    [1,12,13,14,15,1,2],
    [1,12,13,14,15,3,2],
    [1,12,13,14,15,3,2],
    [1,12,13,14,15,1,2],
    [16,12,13,14,1,3,1],
    [10,12,13,14,15,1,2]
]

describe('number service', () => {
    test('generateNumbersList should be instance of function', () => {
        expect(generateNumbersLists).toBeInstanceOf(Function)
    })

    test('weighNumber should be instance of function', () => {
        expect(weighNumber).toBeInstanceOf(Function)
    })

    test('countInstances should be instance of function', () => {
        expect(countInstances).toBeInstanceOf(Function)
    })

    test('getMinIndexOfSet should be instance of function', () => {
        expect(getMinIndexOfSet).toBeInstanceOf(Function)
    })

    test('getMaxIndexOfSet should be instance of function', () => {
        expect(getMaxIndexOfSet).toBeInstanceOf(Function)
    })

    test('populateCandidates should be instance of function', () => {
        expect(populateCandidates).toBeInstanceOf(Function)
    })

    test('pickANumber should be instance of function', () => {
        expect(pickANumber).toBeInstanceOf(Function)
    })


    test('getMinIndexOfSet should return lowest index of set 0', () => {
        const actual = getMinIndexOfSet(2, definitionMock)
        expect(actual).toBe(0)
    })

    test('getMinIndexOfSet should return lowest index of set 1', () => {
        const actual = getMinIndexOfSet(6, definitionMock)
        expect(actual).toBe(5)
    })

    test('getMaxIndexOfSet should return highest index of set 0', () => {
        const actual = getMaxIndexOfSet(2, definitionMock)
        expect(actual).toBe(5)
    })

    test('getMaxIndexOfSet should return highest index of set 1', () => {
        const actual = getMaxIndexOfSet(6, definitionMock)
        expect(actual).toBe(7)
    })

    test('count instances should number of instances from set 0', () => {
        const actual = countInstances(0, 1, dataMock, definitionMock)
        expect(actual).toBe(5)
    })
    test('count instances should number of instances from set 1', () => {
        const actual = countInstances(5, 1, dataMock, definitionMock)
        expect(actual).toBe(4)
    })

    test('weigh number should return', () => {
        const actual = weighNumber(0, 1, dataMock, definitionMock)
        expect(actual).toBe(5)
    })
    
})

