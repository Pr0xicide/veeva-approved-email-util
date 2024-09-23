const { GRADE } = require('../grading')
const { VerifiedTokenMessage, InvalidTokenMessage } = require('../message')

const REGEX_CITATION_NUMBER = /\{\{CitationNumber\[\d+\]\}\}/
const standardTokens = [
  '{{CitationStart}}',
  '{{CitationEnd}}',
  //'{{CitationNumber[Sequence Number]}}',
  '{{CitationSummaryStart}}',
  '{{CitationSummaryEnd}}',
  '{{InsertCitationSummaries}}',
  '{{InsertCitations}}',
]

const isValidCitationSyntax = (token) => {
  const isValidSyntax = token.match(REGEX_CITATION_NUMBER)

  if (!isValidSyntax) return false
  else return true
}

const lint = (veevaToken) => {
  const { token, line } = veevaToken

  // Check standard tokens with no additional parameters.
  if (standardTokens.indexOf(token) >= 0) return new VerifiedTokenMessage()

  // Checking syntax for valid definition.
  if (isValidCitationSyntax(token)) return new VerifiedTokenMessage()
  else {
    return new InvalidTokenMessage({
      grade: GRADE.ERROR,
      line,
      token,
      message:
        'Incorrect syntax for defining citation numbers, expecting "{{CitationNumber[Sequence Number]}}"',
    })
  }
}

module.exports = {
  lint,
}
