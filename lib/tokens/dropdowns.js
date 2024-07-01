/**
 * Builds a Veeva approved email dropdown/picklist token.
 *
 * @param {Array<String>} options - array of string values to concatenate
 * @returns {String|boolean} Veeva picklist/dropdown token containing all the options
 */
const buildDropdownToken = (options) => {
  // Options parameter needs to be an array with at least one element.
  if (options instanceof Array === false) return false
  else if (options.length === 0) return false

  const delimeter = '|'
  let dropdownToken = `{{customText[`

  // Build dropdownToken token.
  for (let i = 0; i < options.length; i++) {
    dropdownToken += `${options[i]}`

    // Append delimeter for additional options.
    if (i !== options.length - 1) {
      dropdownToken += delimeter
    }
  }

  dropdownToken += ']}}'

  return dropdownToken
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
  buildDropdownToken,
  getDropdownOptions,
}
