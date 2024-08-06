const { GRADE } = require('../grading')
const { VerifiedTokenMessage } = require('../message')

const standardTokens = [
  '{{FootnoteStart}}',
  '{{FootnoteEnd}}',
  '{{InsertFootnotes}}',
]

const lint = (veevaToken) => {
  const { token, line } = veevaToken

  // Check standard tokens with no additional parameters.
  if (standardTokens.indexOf(token) >= 0) return new VerifiedTokenMessage()
}

module.exports = {
  lint,
}
