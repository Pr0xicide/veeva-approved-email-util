const { GRADE } = require('./grading')

/**
 *
 */
class TokenMessage {
  constructor(messageObj) {
    const { grade, message } = messageObj
    this.grade = grade
    this.message = message ? message : ''
  }

  /**
   * @returns {GRADE}
   */
  getGrade = () => {
    return this.grade
  }

  /**
   * @returns {String}
   */
  getMessage = () => {
    return this.message
  }
}

/**
 *
 */
class VerifiedTokenMessage extends TokenMessage {
  constructor() {
    super({
      grade: GRADE.PASS,
    })
  }
}

/**
 *
 */
class InvalidTokenMessage extends TokenMessage {
  constructor(messageObj) {
    super(messageObj)

    const { line, token } = messageObj
    this.line = line
    this.token = token
  }

  /**
   * @returns {String}
   */
  getMessage = () => {
    return `line: ${this.line}\t${this.token}\n\t ${this.message}\n`
  }
}

/**
 *
 */
class DuplicateTokenMessage extends TokenMessage {
  constructor(messageObj) {
    super(messageObj)
  }
}

module.exports = {
  TokenMessage,
  VerifiedTokenMessage,
  InvalidTokenMessage,
  DuplicateTokenMessage,
}
