const general = require('./src/general/main')

module.exports = {
  getVeevaTokens: general.getVeevaTokens,
  determineTokenType: general.determineTokenType,
  buildDropdownToken: general.buildDropdownToken,
  getDropdownOptions: general.getDropdownOptions,
  
  lint: {
    file: {
      emailFragment: require('./src/linter/file/email-fragment'),
      templateFragment: require('./src/linter/file/template-fragment'),
    },
    token: {
      type: require('./src/linter/token/type').TYPES,
      emailFragment: require('./src/linter/token/email-fragment'),
      input: require('./src/linter/token/input'),
    },
  }
}
