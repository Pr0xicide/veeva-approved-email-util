const { lint } = require('../../../lib/linting/file/template-fragment')
const { GRADE } = require('../../../lib/linting/grading')

test('supported tokens categories', () => {
  const veevaTokens = ['{{accLname}}', '{{approvedEmailAction}}']

  const log = lint(veevaTokens.join(' '))
  expect(log.length).toBe(0)
})

test('unsupported tokens categories', () => {
  const veevaTokens = [
    '{{customText(1)}}',
    '{{insertConsentLines}}',
    '{{insertSignature}}',
    '{{$20}}',
    '{{insertEmailFragments}}',
    '{{emailTemplateFragment}}',
    '{{CitationStart}}',
    '{{FootnoteStart}}',
  ]

  const log = lint(veevaTokens.join(' '))
  expect(log.length).toBe(veevaTokens.length)
  log.forEach((veevaToken) => {
    expect(veevaToken.getGrade()).toBe(GRADE.ERROR)
  })
})

test('supported tokens', () => {
  const veevaTokens = ['{{approvedEmailAction}}', '{{schedulerLink}}']

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
  expect(log.length).toBe(veevaTokens.length)
  log.forEach((veevaToken) => {
    expect(veevaToken.getGrade()).toBe(GRADE.ERROR)
  })
})
