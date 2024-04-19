const { TYPES } = require('../token/type')
const { GRADE, createLogMessage } = require('../logger')
const REGEX_FRAGMENT_LIMIT = /\[(.*?)\]/

/**
 * Validates email fragment tokens to determine if they are defined
 * correctly or not.
 *
 * @param {{type:TYPES, value:String }} token an object in the getVeevaTokens array
 * @returns {boolean|{grade:GRADE, message:String}} true if valid, or an object with an error message
 */
const isValid = (token) => {
  const { value, type } = token

  if (type !== TYPES.EMAIL_FRAGMENT)
    return createLogMessage({
      grade: GRADE.ERROR,
      message: 'Syntax Error: Cannot validate token type as an email fragment',
    })

  // If limit is NOT defined, and token exactly '{{insertEmailFragments}}'.
  if (value === '{{insertEmailFragments}}') return true

  // Validate fragment min/max syntax.
  if (value.indexOf('[') != 22)
    return createLogMessage({
      grade: GRADE.CRITICAL,
      message:
        'Syntax Error: Missing opening "[" bracket when defining fragment limits',
    })
  else if (value[value.length - 3] != ']')
    return createLogMessage({
      grade: GRADE.CRITICAL,
      message:
        'Syntax Error: Missing closing "]" bracket when defining fragment limits',
    })
  else if (value.indexOf('[]') > 0)
    return createLogMessage({
      grade: GRADE.CRITICAL,
      message:
        'Syntax Error: Missing minimum and maximum values when defining fragment limits',
    })

  // Validate fragment min/max limit.
  const limit = REGEX_FRAGMENT_LIMIT.exec(value)[1]
  const min = limit.split(',')[0]
  const max = limit.split(',')[1]
  if (!min)
    return createLogMessage({
      grade: GRADE.CRITICAL,
      message: 'Syntax Error: Missing minimum fragment limit value.',
    })
  else if (!max)
    return createLogMessage({
      grade: GRADE.CRITICAL,
      message: 'Syntax Error: Missing maximum fragment limit value.',
    })
  else if (min < 0)
    return createLogMessage({
      grade: GRADE.ERROR,
      message: 'Input Error: Minimum fragment limit cannot be less than zero.',
    })
  else if (max < 0)
    return createLogMessage({
      grade: GRADE.ERROR,
      message: 'Input Error: Maximum fragment limit cannot be less than zero.',
    })
  else if (min > max)
    return createLogMessage({
      grade: GRADE.ERROR,
      message:
        'Input Error: Fragment minimum value cannot be greater than the maximum value.',
    })

  return true
}

module.exports = {
  isValid: isValid,
}
