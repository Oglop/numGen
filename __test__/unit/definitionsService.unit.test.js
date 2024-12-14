const { numbersDefinition } = require('../../app/services/definitionsService')
const { TYPES } = require('../../enums')

describe('definition service', () => {
    test('numbersDefinition should be instance of function', () => {
        expect(numbersDefinition).toBeInstanceOf(Function)
    })
    test('numbersDefinition should return definition when type is euro', () => {
        const actual = numbersDefinition(TYPES.EURO)
        expect(actual.total).toBe(7)
        expect(actual.sets[0]).toBe(0)
        expect(actual.sets[1]).toBe(1)
        expect(actual.rules[0].index).toBe(0)
        expect(actual.rules[0].set).toBe(0)
        expect(actual.rules[6].index).toBe(6)
        expect(actual.rules[6].set).toBe(1)
    })
})

