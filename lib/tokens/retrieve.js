/**
 * Retrieves an array of Veeva tokens located in the HTML source code enclosed in {{}} brackets.
 *
 * @param {String} sourceCode - HTML source code to read from fs.readFile
 * @returns {Array<{line:number, token:String}>} Array of objects containing details about each Veeva token found
 */
const getVeevaTokens = (sourceCode) => {
  if (typeof sourceCode !== 'string') return false

  const tokenList = []

  // Retrieve all Veeva tokens - anything inside of "{{}}" brackets.
  const veevaTokens = sourceCode.match(/\{\{([^}]+)\}\}/g)

  // Determine which line each Veeva token is placed for logging.
  veevaTokens.forEach((token) => {
    tokenList.push({
      line:
        sourceCode.split('\n').findIndex((line) => {
          return line.indexOf(token) > 0
        }) + 1,
      token: token,
    })
  })

  return tokenList
}

module.exports = {
  getVeevaTokens,
}
