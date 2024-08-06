const { lint } = require('../../../lib/linting/file/email-fragment')
const { GRADE } = require('../../../lib/linting/grading')
const { CATEGORY_TYPES } = require('../../../lib/tokens/category')

test('valid tokens categories', () => {
  const veevaTokens = [
    {
      line: 1,
      category: CATEGORY_TYPES.CONTENT,
      token: '{{accLname}}',
    },
    {
      line: 1,
      category: CATEGORY_TYPES.FUNCTIONALITY,
      token: '{{addToCalendar}}',
    },
    {
      line: 1,
      category: CATEGORY_TYPES.VAULT,
      token: '{{$20}}',
    },
    {
      line: 1,
      category: CATEGORY_TYPES.UNSUBSCRIBE,
      token: '{{unsubscribe_product_link}}',
    },
    {
      line: 1,
      category: CATEGORY_TYPES.CITATION,
      token: '{{CitationStart}}',
    },
    {
      line: 1,
      category: CATEGORY_TYPES.FOOTNOTE,
      token: '{{FootnoteStart}}',
    },
  ]

  const log = lint(veevaTokens)
  expect(log.length).toBe(0)
})

test('invalid tokens categories', () => {
  const veevaTokens = [
    {
      line: 1,
      category: CATEGORY_TYPES.USER_INPUT,
      token: '{{customText(1)}}',
    },
    {
      line: 1,
      category: CATEGORY_TYPES.CONSENT,
      token: '{{insertConsentLines}}',
    },
    {
      line: 1,
      category: CATEGORY_TYPES.SIGNATURE,
      token: '{{insertSignature}}',
    },
  ]

  const log = lint(veevaTokens)
  expect(log.length).toBe(3)
  log.forEach((veevaToken) => {
    expect(veevaToken.getGrade()).toBe(GRADE.ERROR)
  })
})

test('valid tokens in supported token category', () => {
  const veevaTokens = [
    {
      line: 1,
      category: CATEGORY_TYPES.FUNCTIONALITY,
      token: '{{addToCalendar}}',
    },
    {
      line: 1,
      category: CATEGORY_TYPES.FUNCTIONALITY,
      token: '{{approvedEmailAction}}',
    },
    {
      line: 1,
      category: CATEGORY_TYPES.FUNCTIONALITY,
      token: '{{schedulerLink}}',
    },
  ]

  const log = lint(veevaTokens)
  expect(log.length).toBe(0)
})

test('invalid tokens in supported token category', () => {
  const veevaTokens = [
    {
      line: 1,
      category: CATEGORY_TYPES.FUNCTIONALITY,
      token: '{{EventSession}}',
    },
    {
      line: 1,
      category: CATEGORY_TYPES.FUNCTIONALITY,
      token: '{{EventSpeaker}}',
    },
    {
      line: 1,
      category: CATEGORY_TYPES.FUNCTIONALITY,
      token: '{{requiresReview}}',
    },
    {
      line: 1,
      category: CATEGORY_TYPES.FUNCTIONALITY,
      token: '{{insertEngageAndZoomJoinURL[]}}',
    },
    {
      line: 1,
      category: CATEGORY_TYPES.FUNCTIONALITY,
      token: '{{insertZoomDialInNumbers[]}}',
    },
  ]

  const log = lint(veevaTokens)
  expect(log.length).toBe(5)
  log.forEach((veevaToken) => {
    expect(veevaToken.getGrade()).toBe(GRADE.ERROR)
  })
})
