const lintUtil = require('./src/linter/lint')
const tokenType = require('./src/linter/token/type')

const REGEX_VEEVA_TOKENS = /\{\{([^}]+)\}\}/g

/**
 * Retrieves an array of Veeva tokens located in the HTML source code.
 *
 * @param {String} sourceCode - file's HTML source code to read from file system readFile
 * @returns {Array<{line:number, name:String}>|Boolean} Array of strings of Veeva tokens or false if parameter is invalid
 */
const getVeevaTokens = (sourceCode) => {
  if (typeof sourceCode !== 'string') return false

  const tokenList = []

  // Retrieve all Veeva tokens - anything inside of "{{...}}" brackets.
  const veevaTokens = sourceCode.match(REGEX_VEEVA_TOKENS)

  // Determine which line each Veeva token is placed for logging.
  veevaTokens.forEach((token) => {
    tokenList.push({
      line:
        sourceCode.split('\n').findIndex((line) => {
          return line.indexOf(token) > 0
        }) + 1,
      value: token,
    })
  })

  return tokenList
}

/**
 * Determines the token type from the getVeevaTokens function. And stores the value in the 'type' field.
 *
 * @param {Array<{line:number, name:String}>} tokens array of tokens from getVeevaTokens
 * @returns {void}
 */
const determineTokenType = (tokens) => {
  tokens.forEach((token) => {
    const { value } = token

    if (tokenType.isTokenContentType(value)) {
      token.type = tokenType.TYPES.CONTENT
    } else if (tokenType.isTokenInputType(value)) {
      token.type = tokenType.TYPES.USER_INPUT
    } else if (tokenType.isTokenEmailFragmentType(value)) {
      token.type = tokenType.TYPES.EMAIL_FRAGMENT
    } else if (tokenType.isTokenTemplateFragmentType(value)) {
      token.type = tokenType.TYPES.TEMPLATE_FRAGMENT
    } else if (tokenType.isTokenUnsubscribeType(value)) {
      token.type = tokenType.TYPES.UNSUBSCRIBE
    } else if (tokenType.isTokenVaultType(value)) {
      token.type = tokenType.TYPES.VAULT
    } else {
      token.type = tokenType.TYPES.UNKNOWN
    }
  })
}

// Dropdowns/Picklists

/**
 * Builds a Veeva approved email dropdown/picklist token.
 *
 * @param {Array<String>} options - array of string values to concatenate
 * @returns {String|boolean} Veeva picklist/dropdown token containing all the options
 */
const buildDropdownToken = (options) => {
  if (options.length === 0) return false
  else if (options instanceof Array === false) return false

  // Build dropdown token.
  let dropdown = `{{customText[`
  for (let i = 0; i < options.length; i++) {    
    if (options[i] !== options[options.length - 1]) dropdown += `${options[i]}|`
    else {
      dropdown += `${options[i]}]}}`
    }
  }

  return dropdown
}

/**
 * Retrieve all dropdown/picklist options in a {{customText[]}} token.
 *
 * @param {String} dropdown - the entire Veeva dropdown/picklist token
 * @returns {Array<String>} array of string containing each option in the dropdown
 */
const getDropdownOptions = (dropdown) => {
  if (typeof dropdown !== 'string') return false

  const start = dropdown.indexOf('[') + 1
  const end = dropdown.indexOf(']')
  return dropdown.substring(start, end).split('|')
}

module.exports = {
  getVeevaTokens: getVeevaTokens,
  determineTokenType: determineTokenType,
  buildDropdownToken: buildDropdownToken,
  getDropdownOptions: getDropdownOptions,

  lint: lintUtil,
}
