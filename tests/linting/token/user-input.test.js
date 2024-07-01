const { GRADE } = require('../../../lib/linting/grading')
const { CATEGORY_TYPES } = require('../../../lib/tokens/category')
const {
  INPUT_TYPE,
  lint: validate,
  determineUserInputType,
  lintDropdown,
  lintTextInput,
} = require('../../../lib/linting/token/user-input')

const lint = (token) => {
  return validate({
    category: CATEGORY_TYPES.USER_INPUT,
    line: 1,
    token: token,
  })
}

const validateTextInput = (token) => {
  return lintTextInput({
    line: 1,
    token: CATEGORY_TYPES.USER_INPUT,
    value: token,
  })
}

const validateDropdown = (token) => {
  return lintDropdown({
    line: 1,
    token: CATEGORY_TYPES.USER_INPUT,
    value: token,
  })
}

test('User input type detection', () => {
  expect(determineUserInputType('{{customText[1|2|3]}}')).toBe(
    INPUT_TYPE.DROPDOWN
  )
  expect(determineUserInputType('{{customText[1|2|3}}')).toBe(
    INPUT_TYPE.UNKNOWN
  )

  expect(determineUserInputType('{{customText()}}')).toBe(INPUT_TYPE.UNKNOWN)
  expect(determineUserInputType('{{customText(dfdf)}}')).toBe(
    INPUT_TYPE.UNKNOWN
  )
  expect(determineUserInputType('{{customText(1)}}')).toBe(INPUT_TYPE.TEXT)
  expect(determineUserInputType('{{customText(1|Placeholder)}}')).toBe(
    INPUT_TYPE.TEXT
  )
})

test('Standard user input tokens', () => {
  expect(lint('{{customText}}').grade).toBe(GRADE.PASS)
  expect(lint('{{customText:Required}}').grade).toBe(GRADE.PASS)
  expect(lint('{{customRichText}}').grade).toBe(GRADE.PASS)
})

test('Text user input tokens', () => {
  expect(validateTextInput('{{customText(10)}}').grade).toBe(GRADE.PASS)
  expect(validateTextInput('{{customText(10|ddd)}}').grade).toBe(GRADE.PASS)

  expect(validateTextInput('{{customText()}}').grade).toBe(GRADE.ERROR)
  expect(validateTextInput('{{customText(txt|2|3)}}').grade).toBe(GRADE.ERROR)
  expect(validateTextInput('{{customText(hi)}}').grade).toBe(GRADE.ERROR)
  expect(validateTextInput('{{customText(-10)}}').grade).toBe(GRADE.ERROR)
  expect(validateTextInput('{{customText(dfdf|ddd)}}').grade).toBe(GRADE.ERROR)
  expect(validateTextInput('{{customText(-10|ddd)}}').grade).toBe(GRADE.ERROR)
})

test('Dropdown input token syntax', () => {
  expect(validateDropdown('{{customText[1|2]}}').grade).toBe(GRADE.PASS)

  expect(validateDropdown('{{customText]}}').grade).toBe(GRADE.ERROR)
  expect(validateDropdown('{{customText[}}').grade).toBe(GRADE.ERROR)
  expect(validateDropdown('{{customText}}').grade).toBe(GRADE.ERROR)
  expect(validateDropdown('{customText}}').grade).toBe(GRADE.ERROR)
  expect(validateDropdown('{{customText}').grade).toBe(GRADE.ERROR)
  expect(validateDropdown('{{customText[[}}').grade).toBe(GRADE.ERROR)
  expect(validateDropdown('{{customText]]}}').grade).toBe(GRADE.ERROR)
  expect(validateDropdown('{{customText[[]]}}').grade).toBe(GRADE.ERROR)

  expect(validateDropdown('{{customText[]}}').grade).toBe(GRADE.WARNING)
})

test('Dropdown options are valid', () => {
  expect(validateDropdown('{{customText[https://google.com]}}').grade).toBe(
    GRADE.WARNING
  )
  expect(validateDropdown('{{customText[<sup>&reg;</sup>]}}').grade).toBe(
    GRADE.ERROR
  )
  expect(validateDropdown('{{customText[{{accLname}}]}}').grade).toBe(
    GRADE.ERROR
  )
  expect(validateDropdown('{{customText[1|]}}').grade).toBe(GRADE.ERROR)
  expect(validateDropdown('{{customText[{{customText[1]}}|2]}}').grade).toBe(
    GRADE.ERROR
  )
})
