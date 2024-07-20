const { GRADE } = require('../grading')
const { InvalidTokenMessage, VerifiedTokenMessage } = require('../message')
const { fields: AccountFields } = require('../object/Account')
const { fields: ApprovedDocFields } = require('../object/ApprovedDocument')
const { fields: CallFields } = require('../object/Call')
const { fields: UserFields } = require('../object/User')
const { fields: UserDetailFields } = require('../object/UserDetail')

const SHORT_HAND_CONTENT_TOKENS = [
  '{{accTitle}}',
  '{{accFname}}',
  '{{accLname}}',
  '{{accCredentials}}',
  '{{userEmailAddress}}',
  '{{userName}}',
  '{{userPhoto}}',
  '{{parentCallDatetime}}',
  '{{timeZone}}',
]
const VALID_CONTENT_OBJECTS = {
  Account: AccountFields,
  Approved_Document_vod: ApprovedDocFields, // Email templates only.
  Call2_vod: CallFields,
  User: UserFields,
  User_Detail_vod: UserDetailFields,
}

/**
 * Returns an JSON object of the object and field pair found in the content token.
 *
 * @param {String} token Veeva token to extract object field pair
 * @returns {{objectName: String, fieldName: String}}
 */
const getObjectFieldPair = (token) => {
  const objectName = token.substr(2).split('.')[0]
  const field = token.split('.')[1]

  return {
    objectName: objectName,
    fieldName: field.substr(0, field.length - 2),
  }
}

/**
 * Checks if the defined field exists in the object.
 *
 * @param {Object} veevaToken
 * @returns {InvalidTokenMessage|VerifiedTokenMessage}
 */
const checkObjectField = (veevaToken) => {
  const { token, line } = veevaToken
  const { objectName, fieldName } = getObjectFieldPair(token)

  // Unsupported object.
  if (!VALID_CONTENT_OBJECTS[objectName]) {
    return new InvalidTokenMessage({
      grade: GRADE.ERROR,
      line,
      token,
      message: `Object ${objectName} is not supported with content tokens`,
    })
  }

  // Object/Field pair is valid.
  if (VALID_CONTENT_OBJECTS[objectName].includes(fieldName)) {
    return new VerifiedTokenMessage()
  }

  return new InvalidTokenMessage({
    grade: GRADE.WARNING,
    line,
    token,
    message: `Unknown field ${fieldName} detected inside the ${objectName} object`,
  })
}

const lint = (veevaToken) => {
  const { token, line } = veevaToken

  // Check if token is a valid short hand notation.
  if (SHORT_HAND_CONTENT_TOKENS.indexOf(token) >= 0) {
    return new VerifiedTokenMessage()
  }

  // Check syntax.
  else if (token.match(/\./g).length > 1) {
    return new InvalidTokenMessage({
      grade: GRADE.ERROR,
      line,
      token,
      message: 'Cannot have 2 or more "." in a content token',
    })
  }

  return checkObjectField(veevaToken)
}

module.exports = {
  lint,
}
