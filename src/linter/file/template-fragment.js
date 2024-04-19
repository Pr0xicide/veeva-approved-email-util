const util = require('../../../veeva-email-util')
const { TYPES } = require('../token/type')

const VALID_TOKEN_TYPES = [TYPES.CONTENT]

/**
 * Validates template fragment source code and check for any Veeva tokens not
 * supported in template fragments.
 *
 * @param {String} sourceCode
 * @returns {boolean|Array<{type:TYPES, name:string, line:number}>} true if valid, OR an array of invalid tokens found
 */
const isValid = (sourceCode) => {
  const invalidTokens = []
  const tokens = util.getVeevaTokens(sourceCode)
  util.determineTokenType(tokens)

  tokens.forEach((token) => {
    const { type } = token

    // Check for invalid tokens.
    if (!VALID_TOKEN_TYPES.includes(type)) invalidTokens.push(token)
  })

  return invalidTokens.length === 0 ? true : invalidTokens
}

module.exports = {
  isValid: isValid,
}
