

const checkAndAdd = (totals, sum) => {
    for (let row of totals) {
        if (row.sum == sum ) {
            row.count++
            return true
        }
    }
    return false
}

const average = data => {
    let totals = []
    data.forEach(row => {
        const numbers = row.slice(0,5)
        let sum = numbers.reduce((a, b) => a + b, 0)
        if (!checkAndAdd(totals, sum)) {
            totals.push({ sum, count: 1 })
        }
    })
    totals.sort((a,b) => a.count - b.count)
    return totals[totals.length - 1].sum
}

/**
 * return 
 * @param {[]} data 
 * @returns 
 */
const min = data => {
    let minSum = 999999
    data.forEach(row => {
        const numbers = row.slice(0,5)
        rowSum = numbers.reduce((a, b) => a + b, 0)
        if (rowSum < minSum) {
            minSum = rowSum
        }
    })
    return minSum
}

/**
 * 
 * @param {[]} data 
 * @returns 
 */
const max = data => {
    let maxSum = 0
    data.forEach(row => {
        const numbers = row.slice(0,5)
        rowSum = numbers.reduce((a, b) => a + b, 0)
        if (rowSum > maxSum) {
            maxSum = rowSum
        }
    })
    return maxSum
}

module.exports = {
    average,
    min,
    max
}