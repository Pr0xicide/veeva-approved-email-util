const { GRADE } = require('../grading')

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
  const { value: token, line } = veevaToken

  // Check if token is a valid short hand notation.
  if (standardContentTokens.indexOf(token) >= 0) {
    return {
      grade: GRADE.PASS,
      line,
      token,
      message: '',
    }
  }

  // TODO: check for standard fields in the user and account objects.

  return {
    grade: GRADE.PASS,
    line,
    token,
    message: '',
  }
}

module.exports = {
  lint,
}
