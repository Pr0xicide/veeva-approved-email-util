const { lint } = require('../../../lib/linting/file/email-template')
const { GRADE } = require('../../../lib/linting/grading')

test('supported tokens', () => {
  const veevaTokens = [
    '{{accLname}}',
    '{{insertEmailFragments}}',
    '{{emailTemplateFragment}}',
    '{{customContent}}',
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
    '{{FakeToken}}',
  ]

  const log = lint(veevaTokens.join(' '))
  expect(log.length).toBe(veevaTokens.length)
  log.forEach((veevaToken) => {
    expect(veevaToken.getGrade()).toBe(GRADE.ERROR)
  })
})

test('duplicate tokens', () => {
  const veevaTokens = [
    '{{insertEmailFragments}}',
    '{{insertEmailFragments[1,2]}}', // duplicate
    '{{insertEmailFragments[2,2]}}', // duplicate
    '{{emailTemplateFragment}}',
    '{{emailTemplateFragment}}', // duplicate
    '{{unsubscribe_product_link}}',
  ]

  const logs = lint(veevaTokens.join(' '))
  expect(logs.length).toBe(2)
  logs.forEach((log) => {
    expect(log.getGrade()).toBe(GRADE.ERROR)
  })
})
