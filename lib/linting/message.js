const { GRADE } = require('./grading')

/**
 * Parent class for all token messages for logging purposes.
 */
class TokenMessage {
  constructor(messageObj) {
    const { grade, message } = messageObj
    this.grade = grade
    this.message = message ? message : ''
  }

  /**
   * Returns the grade of the token.
   * @returns {GRADE}
   */
  getGrade = () => {
    return this.grade
  }

  /**
   * Returns the warning/error message to display to the user.
   * @returns {String}
   */
  getMessage = () => {
    return this.message
  }
}

class VerifiedTokenMessage extends TokenMessage {
  constructor() {
    super({
      grade: GRADE.PASS,
    })
  }
}

class UnknownTokenMessage extends TokenMessage {
  constructor(messageObj) {
    const { line, token } = messageObj
    super({
      grade: GRADE.ERROR,
      token,
      token,
    })

    this.line = line
    this.token = token
  }

  /**
   * Returns the warning/error message to display to the user.
   * @returns {String}
   */
  getMessage = () => {
    return `line: ${this.line}\t${this.token}\n\t Unknown token, refer to https://crmhelp.veeva.com/doc/Content/CRM_topics/Multichannel/ApprovedEmail/ManageCreateContent/CreatingContent/ConfigTokens.htm for a full list of Veeva supported tokens\n`
  }
}

class InvalidTokenMessage extends TokenMessage {
  constructor(messageObj) {
    super(messageObj)

    const { line, token } = messageObj
    this.line = line
    this.token = token
  }

  /**
   * Returns the warning/error message to display to the user.
   * @returns {String}
   */
  getMessage = () => {
    return `line: ${this.line}\t${this.token}\n\t ${this.message}\n`
  }
}

/**
 * Duplicate token error messages, only applicable for email templates.
 */
class DuplicateTokenMessage extends TokenMessage {
  constructor(messageObj) {
    const { category, duplicateTokens, message } = messageObj
    super({
      grade: GRADE.ERROR,
      message,
    })

    this.category = category
    this.duplicateTokens = duplicateTokens
  }

  /**
   * Returns a message with all duplicate tokens found.
   * @returns {String}
   */
  getMessage = () => {
    let msg = `Can only have only one ${this.category} token in email templates but found ${this.duplicateTokens.length} on\n`

    // Print out the location for each duplicate token found.
    this.duplicateTokens.forEach((token) => {
      msg += `\t line ${token.line}: ${token.token} \n`
    })

    return msg
  }
}

module.exports = {
  TokenMessage,
  VerifiedTokenMessage,
  UnknownTokenMessage,
  InvalidTokenMessage,
  DuplicateTokenMessage,
}
