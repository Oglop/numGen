const { TYPES } = require('../../enums')


const euro = {
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

const numbersDefinition = (type) => {
    switch (type) {
        case TYPES.EURO: return euro
    }
}


module.exports = {
    numbersDefinition
}