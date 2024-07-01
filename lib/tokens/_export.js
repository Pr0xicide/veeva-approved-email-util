const { getVeevaTokens } = require('./retrieve')
const { determineTokenCategory } = require('./category')
const { buildDropdownToken, getDropdownOptions } = require('./dropdowns')

module.exports = {
  getVeevaTokens,
  determineTokenCategory,
  dropdown: {
    buildDropdownToken,
    getDropdownOptions,
  },
}
