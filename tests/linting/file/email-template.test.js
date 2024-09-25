const { lint } = require('../../../lib/linting/file/email-template')
const { GRADE } = require('../../../lib/linting/grading')

test('supported tokens', () => {
  const veevaTokens = [
    '{{accLname}}',
    '{{insertEmailFragments}}',
    '{{emailTemplateFragment}}',
    '{{InsertFootnotes}}',
    '{{InsertCitations}}',
    '{{InsertCitationSummaries}}',
  ]

  const log = lint(veevaTokens.join(' '))
  expect(log.length).toBe(0)
})

test('unsupported tokens', () => {
  const veevaTokens = [
    '{{FootnoteSymbol[1]}}',
    '{{CitationNumber[1]}}',
    '{{CitationSummaryStart}}',
    '{{CitationSummaryEnd}}',
  ]

  const log = lint(veevaTokens.join(' '))
  expect(log.length).toBe(veevaTokens.length)
  log.forEach((veevaToken) => {
    expect(veevaToken.getGrade()).toBe(GRADE.ERROR)
  })
})

test('duplicate token categories', () => {
  const veevaTokens = [
    '{{insertEmailFragments}}',
    '{{insertEmailFragments[1,2]}}', //
    '{{insertEmailFragments[2,2]}}', // duplicate category
    '{{emailTemplateFragment}}',
    '{{emailTemplateFragment}}', // duplicate category
    '{{unsubscribe_product_link}}',
  ]

  const logs = lint(veevaTokens.join(' '))
  expect(logs.length).toBe(2)
  logs.forEach((log) => {
    expect(log.getGrade()).toBe(GRADE.ERROR)
  })
})

test('duplicate tokens', () => {
  const veevaTokens = [
    '{{InsertFootnotes}}',
    '{{InsertFootnotes}}', // duplicate token
    '{{InsertCitations}}',
    '{{InsertCitations}}', // duplicate token
    '{{InsertCitationSummaries}}',
    '{{InsertCitationSummaries}}', // duplicate token
  ]

  const logs = lint(veevaTokens.join(' '))
  expect(logs.length).toBe(3)
  logs.forEach((log) => {
    expect(log.getGrade()).toBe(GRADE.ERROR)
  })
})
