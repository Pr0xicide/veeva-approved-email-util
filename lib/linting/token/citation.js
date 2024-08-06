const { VerifiedTokenMessage } = require('../message')

const standardTokens = [
  '{{CitationStart}}',
  '{{CitationEnd}}',
  '{{CitationSummaryStart}}',
  '{{CitationSummaryEnd}}',
  '{{InsertCitationSummaries}}',
  '{{InsertCitations}}',
]

const lint = (veevaToken) => {
  const { token } = veevaToken

  // Check standard tokens with no additional parameters.
  if (standardTokens.indexOf(token) >= 0) return new VerifiedTokenMessage()
}

module.exports = {
  lint,
}
