const { GRADE } = require('../../src/linter/logger')
const { TYPES } = require('../../src/linter/token/type')
const emailFragment = require('../../src/linter/token/email-fragment')

test('Email fragment syntax', () => {
  expect(
    emailFragment.isValid({
      type: TYPES.CONTENT,
    }).grade
  ).toBe(GRADE.ERROR)

  expect(
    emailFragment.isValid({
      type: TYPES.EMAIL_FRAGMENT,
      value: '{{insertEmailFragments}}',
    })
  ).toBe(true)

  expect(
    emailFragment.isValid({
      type: TYPES.EMAIL_FRAGMENT,
      value: '{{insertEmailFragments]}}',
    }).grade
  ).toBe(GRADE.CRITICAL)

  expect(
    emailFragment.isValid({
      type: TYPES.EMAIL_FRAGMENT,
      value: '{{insertEmailFragments[}}',
    }).grade
  ).toBe(GRADE.CRITICAL)

  expect(
    emailFragment.isValid({
      type: TYPES.EMAIL_FRAGMENT,
      value: '{{insertEmailFragments[]}}',
    }).grade
  ).toBe(GRADE.CRITICAL)
})

test('Email fragment limit', () => {
  expect(
    emailFragment.isValid({
      type: TYPES.EMAIL_FRAGMENT,
      value: '{{insertEmailFragments[1,2]}}',
    })
  ).toBe(true)

  expect(
    emailFragment.isValid({
      type: TYPES.EMAIL_FRAGMENT,
      value: '{{insertEmailFragments[2,2]}}',
    })
  ).toBe(true)

  expect(
    emailFragment.isValid({
      type: TYPES.EMAIL_FRAGMENT,
      value: '{{insertEmailFragments[1,]}}',
    }).grade
  ).toBe(GRADE.CRITICAL)

  expect(
    emailFragment.isValid({
      type: TYPES.EMAIL_FRAGMENT,
      value: '{{insertEmailFragments[,1]}}',
    }).grade
  ).toBe(GRADE.CRITICAL)

  expect(
    emailFragment.isValid({
      type: TYPES.EMAIL_FRAGMENT,
      value: '{{insertEmailFragments[1]}}',
    }).grade
  ).toBe(GRADE.CRITICAL)

  expect(
    emailFragment.isValid({
      type: TYPES.EMAIL_FRAGMENT,
      value: '{{insertEmailFragments[-1]}}',
    }).grade
  ).toBe(GRADE.CRITICAL)

  expect(
    emailFragment.isValid({
      type: TYPES.EMAIL_FRAGMENT,
      value: '{{insertEmailFragments[-1,2]}}',
    }).grade
  ).toBe(GRADE.ERROR)

  expect(
    emailFragment.isValid({
      type: TYPES.EMAIL_FRAGMENT,
      value: '{{insertEmailFragments[5,2]}}',
    }).grade
  ).toBe(GRADE.ERROR)
})
