const { GRADE } = require('../grading')
const { InvalidTokenMessage, VerifiedTokenMessage } = require('../message')

const standardContentTokens = [
  '{{accTitle}}',
  '{{accFname}}',
  '{{accLname}}',
  '{{accCredentials}}',
  '{{userEmailAddress}}',
  '{{userName}}',
  '{{userPhoto}}',
  '{{parentCallDatetime}}',
]

const lint = (veevaToken) => {
  const { token } = veevaToken

  // Check if token is a valid short hand notation.
  if (standardContentTokens.indexOf(token) >= 0) {
    return new VerifiedTokenMessage()
  }

  // TODO: check for standard fields in the user and account objects.

  return new VerifiedTokenMessage()
}

module.exports = {
  lint,
}
