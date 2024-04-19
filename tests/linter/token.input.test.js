const { GRADE } = require('../../src/linter/logger')
const { TYPES } = require('../../src/linter/token/type')
const inputToken = require('../../src/linter/token/input')

test('User input token syntax', () => {
  expect(
    inputToken.isValid({
      type: TYPES.CONTENT,
    }).grade
  ).toBe(GRADE.ERROR)

  expect(
    inputToken.isValid({
      type: TYPES.USER_INPUT,
      value: '{{customText[1|2|3]}}',
    })
  ).toBe(true)  
})

test('Standard user input tokens', () => {
  expect(
    inputToken.isValid({
      type: TYPES.USER_INPUT,
      value: '{{customText}}',
    })
  ).toBe(true)

  expect(
    inputToken.isValid({
      type: TYPES.USER_INPUT,
      value: '{{customText:Required}}',
    })
  ).toBe(true)

  expect(
    inputToken.isValid({
      type: TYPES.USER_INPUT,
      value: '{{customRichText}}',
    })
  ).toBe(true)
})

/**
 * Dropdowns/picklists
 */
test('User input dropdown/picklist syntax', () => {
  expect(
    inputToken.isValid({
      type: TYPES.USER_INPUT,
      value: '{{customText[1|2|3]}}',
    })
  ).toBe(true)

  // Double square brackets.
  expect(
    inputToken.isValid({
      type: TYPES.USER_INPUT,
      value: '{{customText[[1|2|3]]}}',
    }).grade
  ).toBe(GRADE.CRITICAL)

  expect(
    inputToken.isValid({
      type: TYPES.USER_INPUT,
      value: '{{customText[[1|2|3]}}',
    }).grade
  ).toBe(GRADE.CRITICAL)  

  expect(
    inputToken.isValid({
      type: TYPES.USER_INPUT,
      value: '{{customText[1|2|3]]}}',
    }).grade
  ).toBe(GRADE.CRITICAL)
})

test('User input dropdown/picklist options', () => {
  // Empty no options defined.
  expect(
    inputToken.isValid({
      type: TYPES.USER_INPUT,
      value: '{{customText[]}}',
    }).grade
  ).toBe(GRADE.WARNING)

  expect(
    inputToken.isValid({
      type: TYPES.USER_INPUT,
      value: '{{customText[https://crmhelp.veeva.com/|https://www.litmus.com]}}',
    }).grade
  ).toBe(GRADE.WARNING)

  expect(
    inputToken.isValid({
      type: TYPES.USER_INPUT,
      value: '{{customText[1||3]}}',
    }).grade
  ).toBe(GRADE.ERROR)  

  expect(
    inputToken.isValid({
      type: TYPES.USER_INPUT,
      value: '{{customText[1|{{customText[1.1|1.2|1.3]}}|2]}}',
    }).grade
  ).toBe(GRADE.CRITICAL)   

  expect(
    inputToken.isValid({
      type: TYPES.USER_INPUT,
      value: '{{customText[<strong>Hi<strong>]}}',
    }).grade
  ).toBe(GRADE.CRITICAL)  

  expect(
    inputToken.isValid({
      type: TYPES.USER_INPUT,
      value: '{{customText[{{accLname}}]}}',
    }).grade
  ).toBe(GRADE.CRITICAL)    
})

/**
 * TODO: User input text fields
 */
