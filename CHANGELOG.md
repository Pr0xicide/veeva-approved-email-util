# Change Log

All notable changes to this repo will be documented in this file.

## [0.2.0] - 2024-04-14

### Added

- [prettier](https://prettier.io/) as a developer dependency for this repo
- determineTokenType
- initial token linting functions and tests for:
  - user input tokens
  - email fragment tokens
  - template fragment tokens

### Changed

- getVeevaTokens - now tracks line in the source code each token is found
- buildDropdownToken - validates parameter value to ensure proper token can be constructed
- getDropdownOptions - validates parameter value to ensure proper token can be constructed

## [0.1.0] - 2024-04-03

Setup for initial general functions.

### Added

- getVeevaTokens
- buildDropdownToken
- getDropdownOptions
- simple unit tests using [jest](https://jestjs.io/)
