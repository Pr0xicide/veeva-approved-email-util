const {
  buildDropdownToken,
  getDropdownOptions,
} = require('../../lib/tokens/dropdowns')

test('Build Veeva dropdown/picklist token', () => {
  expect(buildDropdownToken(123)).toBe(false)
  expect(buildDropdownToken([])).toBe(false)

  expect(buildDropdownToken([1, 2])).toBe('{{customText[1|2]}}')

  const validOptions = ['1', '2', '3', '4']
  const expected = '{{customText[1|2|3|4]}}'
  expect(buildDropdownToken(validOptions)).toBe(expected)

  expect(buildDropdownToken(['', ''])).toBe('{{customText[|]}}')
  expect(buildDropdownToken([' ', ''])).toBe('{{customText[ |]}}')
  expect(buildDropdownToken(['1', ''])).toBe('{{customText[1|]}}')
})

test('Retrieving dropdown options in a dropdown token', () => {
  const invalid = getDropdownOptions(1)
  expect(invalid).toBe(false)

  const dropdownOptions = getDropdownOptions('{{customText[1|2|3]}}')
  expect(dropdownOptions.length).toBe(3)
  expect(dropdownOptions[0]).toBe('1')
  expect(dropdownOptions[1]).toBe('2')
  expect(dropdownOptions[2]).toBe('3')
})
