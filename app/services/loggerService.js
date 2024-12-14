const { debugMode } = require('../../config')

const debug = text => {
    if (debugMode) {
        console.log(text)
    }
}

module.exports = {
    debug
}