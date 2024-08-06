const { lint } = require('../../../lib/linting/file/email-template')
const { GRADE } = require('../../../lib/linting/grading')
const { CATEGORY_TYPES } = require('../../../lib/tokens/category')

test('invalid tokens categories', () => {
  const veevaTokens = [
    {
      line: 1,
      category: CATEGORY_TYPES.CITATION,
      token: '{{insertEmailFragments}}',
    },
  ]

  const logs = lint(veevaTokens)
  expect(logs.length).toBe(1)
  logs.forEach((log) => {
    expect(log.getGrade()).toBe(GRADE.ERROR)
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
