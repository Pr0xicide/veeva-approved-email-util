const { TYPES } = require('./type')
const { GRADE, createLogMessage } = require('../logger')
const { getDropdownOptions } = require('../../../veeva-email-util')

const REGEX_DROPDOWN = /\{\{customText\[(.*?)\]\}\}/g
const REGEX_HTML_TAGS = /<\/?[^>]+(>|$)/g;
const REGEX_VEEVA_TOKENS = /\{\{([^}]+)\}\}/g

const STANDARD_INPUT_TOKENS = [
  '{{customText}}',
  '{{customText:Required}}',
  '{{customRichText}}',
]

/**
 * Validates user input tokens if they are defined correctly or not.
 * 
 * @param {{type:TYPES, value:String}} token an object in the getVeevaTokens array
 * @returns {boolean}
 */
const isValid = (token) => {
  const { value, type } = token

  if (type !== TYPES.USER_INPUT)
    return createLogMessage({
      grade: GRADE.ERROR,
      message: 'Syntax Error: Cannot validate token type as an user input',
    })

  // Check for standard input tokens.
  if (STANDARD_INPUT_TOKENS.indexOf(value) >= 0) return true
  // If token is a dropdown containing the matching syntax.
  else if (value.match(REGEX_DROPDOWN) !== null) return validateDropdown(token)

  // TODO: Input text field validation

  else 
    return createLogMessage({
      grade: GRADE.CRITICAL,
      message: 'Syntax Error: Unknown input token defined'
    })
}

/**
 * Runs all the tests to determine if a dropdown/picklist token is defined
 * correctly.
 *
 * @param {String} token Veeva token for the dropdown in the source code
 * @returns {}
 */
const validateDropdown = (token) => {
  const {value} = token

  // Validate syntax.
  if (value.indexOf('[[') > 0 || value.indexOf(']]') > 0) {
    return createLogMessage({
      grade: GRADE.CRITICAL,
      message: 'Syntax Error: Double square brackets detected in dropdown token.',
    })
  }

  // Validate dropdown options.
  const options = getDropdownOptions(value)

  if (options.length === 1 && options[0] === '')
    return createLogMessage({
      grade: GRADE.WARNING,
      message: 'Warning: Dropdown contains no options.',
    })
  else if (doesContainEmptyOptions(options))
    return createLogMessage({
      grade: GRADE.ERROR,
      message: 'Error: 1 or more dropdown option is empty/blank. Dropdown options need to have at least 1 character mimimum.'
    })
  else if (doesOptionContainNestedDropdowns(value))
    return createLogMessage({
      grade: GRADE.CRITICAL,
      message: 'Syntax Error: Cannot have nested dropdowns within a dropdown token.'
    })      
  else if (doesOptionContainHTML(options)) 
    return createLogMessage({
      grade: GRADE.CRITICAL,
      message: 'Syntax Error: HTML tags are not supported in dropdown tokens.'
    })
  else if (doesOptionContainTokens(options)) 
    return createLogMessage({
      grade: GRADE.CRITICAL,
      message: 'Syntax Error: Cannot have tokens nested within dropdown tokens.'
    })
  else if (doesOptionContainLinks(options))
    return createLogMessage({
      grade: GRADE.WARNING,
      message: 'Warning: 1 or more dropdown option contains a website URL.'
    })    

  return true
}

/**
 * Determine if any dropdown options are blank/empty.
 * 
 * @param {Array<String>} options collected from getDropdownOptions function
 * @returns {boolean} boolean value if any options are blank
 */
const doesContainEmptyOptions = options => {
  for (const option of options) {
    if (option === "") return true
  }

  return false
}

/**
 * Determine if there is a nested dropdown option within a dropdown token. 
 * 
 * @param {String} token in the source code
 * @returns {boolean} boolean value a nested dropdown is detected in any of the options
 */
const doesOptionContainNestedDropdowns = token => {
  if (token.match(/{{customText/g).length > 1) return true
  return false
}

/**
 * Determine if there are any HTML tags detected in an list of dropdown options.
 * 
 * @param {Array<String>} options collected from getDropdownOptions function
 * @returns {boolean} boolean value if HTML tags in any of the options
 */
const doesOptionContainHTML = options => {
  for (const option of options) {
    if (REGEX_HTML_TAGS.test(option)) return true
  }

  return false
}

/**
 * Determine if there are any Veeva tokens defined within a dropdown/picklist.
 * 
 * @param {Array<String>} options collected from getDropdownOptions function
 * @returns {boolean} boolean value if tokens are found in any of the options
 */
const doesOptionContainTokens = options => {
  for (const option of options) {
    if (REGEX_VEEVA_TOKENS.test(option)) return true
  }
  
  return false
}

/**
 * Determine if there are any links detected in an list of dropdown options.
 * 
 * @param {Array<String>} options collected from getDropdownOptions function
 * @returns {boolean} boolean value any option contains links
 */
const doesOptionContainLinks = options => {
  const links = options.filter(option => {
    return option.indexOf("https://") >= 0 || 
    option.indexOf("http://") >= 0 ||
    option.indexOf("www") >= 0
  })

  return links.length > 0 ? true : false
}

module.exports = {
  isValid: isValid,
  doesContainEmptyOptions: doesContainEmptyOptions,
  doesOptionContainNestedDropdowns: doesOptionContainNestedDropdowns,
  doesOptionContainHTML: doesOptionContainHTML,
  doesOptionContainTokens: doesOptionContainTokens,
  doesOptionContainLinks: doesOptionContainLinks,
}
