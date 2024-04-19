const GRADE = {
  PASS: 'PASS',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  CRITICAL: 'CRITICAL',
}
const FILE_TYPES = {
  EMAIL_TEMPLATE: 1,
  EMAIL_FRAGMENT: 2,
  TEMPLATE_FRAGMENT: 3,
}

/**
 * Creates a message to log back to the user with a grade and message.
 *
 * @param {Object} log object containing details of the message that needs to be logged to the user
 * @param {GRADE} log.grade grade message
 * @param {String} log.message message details about the error to be logged
 * @returns {{grade:GRADE, message:String}} log object message
 */
const createLogMessage = (log) => {
  const { grade, message } = log
  return {
    grade: grade,
    message: message,
  }
}

module.exports = {
  GRADE: GRADE,
  FILE_TYPES: FILE_TYPES,

  createLogMessage: createLogMessage,
}
