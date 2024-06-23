const { buildDropdownToken, getDropdownOptions } = require('../src/dropdowns')

test('Build Veeva dropdown/picklist token', () => {
  const validOptions = ['1', '2', '3', '4']
  const expected = '{{customText[1|2|3|4]}}'

  expect(buildDropdownToken([])).toBe(false)
  expect(buildDropdownToken(123)).toBe(false)
  expect(buildDropdownToken(validOptions)).toBe(expected)
  expect(buildDropdownToken(['', ''])).toBe('{{customText[|]}}')
})

test('Retrieving dropdown options in a dropdown token', () => {
  const invalid = getDropdownOptions(1)
  const options = getDropdownOptions('{{customText[1|2|3]}}')

  expect(invalid).toBe(false)
  expect(options.length).toBe(3)
  expect(options[0]).toBe('1')
  expect(options[1]).toBe('2')
  expect(options[2]).toBe('3')
})
