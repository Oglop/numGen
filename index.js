const { type } = require('./config')
const numberService = require('./app/services/numberService')
const definitionsService = require('./app/services/definitionsService')
const validationService = require('./app/services/validationService')
const prepService = require('./app/services/prepService')
const checkService = require('./app/services/checkService')
const { debug } = require('./app/services/loggerService')

/**
 * Given array of strings
 * @param {[Text]} args 
 */
const getBlocklist = args => {
    for (let arg of args) {
        if (arg.toLowerCase().startsWith('blocklist') && arg.indexOf('=') != -1) {
            const numbers = arg.substring(arg.indexOf('=') + 1).split(',')
            return numbers.map((str) => {
                return parseInt(str)
            })
        }
    }
    return []
}

/**
 * Given array of strings
 * @param {[Text]} args 
 */
const getNumberOfLists = args => {
    return (args[0] != undefined) ? args[0] : 4
}


const run = () => {
    const args = process.argv.slice(2)

    const numberOfLists = getNumberOfLists(args)
    debug(`numberOfLists: ${numberOfLists}`)
    const blocklist = getBlocklist(args)
    debug(`blocklist: ${blocklist}`)

    for (let arg of args) {
        debug(`arg: ${arg}`)
    }

    const lists = numberService.generateNumbersLists(definitionsService, validationService, checkService, type, { numberOfLists, blocklist })

    lists.forEach(item => {
        console.log(prepService.stringify(item))
    });
    
}

run()