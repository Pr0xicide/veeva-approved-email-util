const { lint } = require('../../../lib/linting/file/email-template')
const { GRADE } = require('../../../lib/linting/grading')
const { CATEGORY_TYPES } = require('../../../lib/tokens/category')

test('unsupported tokens', () => {
  const veevaTokens = [
    {
      line: 1,
      category: CATEGORY_TYPES.FOOTNOTE,
      token: '{{FootnoteSymbol[1]}}',
    },
    {
      line: 1,
      category: CATEGORY_TYPES.CITATION,
      token: '{{CitationNumber[1]}}',
    },
    {
      line: 1,
      category: CATEGORY_TYPES.CITATION,
      token: '{{CitationSummaryStart}}',
    },
    {
      line: 1,
      category: CATEGORY_TYPES.CITATION,
      token: '{{CitationSummaryEnd}}',
    },
  ]

  const log = lint(veevaTokens)
  expect(log.length).toBe(veevaTokens.length)
  log.forEach((veevaToken) => {
    expect(veevaToken.getGrade()).toBe(GRADE.ERROR)
  })
})

test('duplicate tokens', () => {
  const veevaTokens = [
    {
      line: 1,
      category: CATEGORY_TYPES.EMAIL_FRAGMENT,
      token: '{{insertEmailFragments}}',
    },
    {
      line: 10,
      category: CATEGORY_TYPES.EMAIL_FRAGMENT,
      token: '{{insertEmailFragments[1,2]}}',
    },
    {
      line: 11,
      category: CATEGORY_TYPES.EMAIL_FRAGMENT,
      token: '{{insertEmailFragments[2,2]}}',
    },
    {
      line: 100,
      category: CATEGORY_TYPES.TEMPLATE_FRAGMENT,
      token: '{{emailTemplateFragment}}',
    },
    {
      line: 200,
      category: CATEGORY_TYPES.TEMPLATE_FRAGMENT,
      token: '{{emailTemplateFragment}}',
    },
    {
      line: 1,
      category: CATEGORY_TYPES.UNSUBSCRIBE,
      token: '{{unsubscribe_product_link}}',
    },
  ]

  const logs = lint(veevaTokens)
  expect(logs.length).toBe(2)
  logs.forEach((log) => {
    expect(log.getGrade()).toBe(GRADE.ERROR)
  })
})
