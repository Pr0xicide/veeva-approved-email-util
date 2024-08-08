const { lint } = require('../../../lib/linting/file/email-fragment')
const { GRADE } = require('../../../lib/linting/grading')

test('supported tokens categories', () => {
  const veevaTokens = [
    '{{accLname}}',
    '{{addToCalendar}}',
    '{{$20}}',
    '{{unsubscribe_product_link}}',
    '{{CitationStart}}',
    '{{FootnoteStart}}',
  ]

  const log = lint(veevaTokens.join(' '))
  expect(log.length).toBe(0)
})

test('unsupported tokens categories', () => {
  const veevaTokens = [
    '{{customText(1)}}',
    '{{insertConsentLines}}',
    '{{insertSignature}}',
  ]

  const log = lint(veevaTokens.join(' '))
  expect(log.length).toBe(3)
  log.forEach((veevaToken) => {
    expect(veevaToken.getGrade()).toBe(GRADE.ERROR)
  })
})

test('supported tokens', () => {
  const veevaTokens = [
    '{{addToCalendar}}',
    '{{approvedEmailAction}}',
    '{{schedulerLink}}',
  ]

  const log = lint(veevaTokens.join(' '))
  expect(log.length).toBe(0)
})

test('unsupported tokens', () => {
  const veevaTokens = [
    '{{EventSession}}',
    '{{EventSpeaker}}',
    '{{requiresReview}}',
    '{{insertEngageAndZoomJoinURL[]}}',
    '{{insertZoomDialInNumbers[]}}',
  ]

  const log = lint(veevaTokens.join(' '))
  expect(log.length).toBe(5)
  log.forEach((veevaToken) => {
    expect(veevaToken.getGrade()).toBe(GRADE.ERROR)
  })
})
