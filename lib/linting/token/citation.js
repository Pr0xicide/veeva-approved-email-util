const { GRADE } = require('../grading')

const standardTokens = [
  '{{CitationStart}}',
  '{{CitationEnd}}',
  '{{CitationSummaryStart}}',
  '{{CitationSummaryEnd}}',
  '{{InsertCitationSummaries}}',
  '{{InsertCitations}}',
]

const lint = (veevaToken) => {}

module.exports = {
  lint,
}
