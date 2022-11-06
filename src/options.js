import isPlainObj from 'is-plain-obj'

// Normalize and validate options
export const getOptions = function (options = {}) {
  if (!isPlainObj(options)) {
    throw new TypeError(`It must be a plain object: ${options}`)
  }

  return Object.fromEntries(
    Object.entries(options).map(normalizeOption).filter(Boolean),
  )
}

const normalizeOption = function ([optName, optValue]) {
  const validator = VALIDATORS[optName]

  if (validator === undefined) {
    const availableOpts = Object.keys(VALIDATORS).join(', ')
    throw new TypeError(`Unknown option "${optName}".
Available options: ${availableOpts}`)
  }

  if (optValue === undefined) {
    return
  }

  validator(optValue, optName)
  return [optName, optValue]
}

const validateStatus = function (optValue, optName) {
  if (!Number.isInteger(optValue)) {
    throw new TypeError(`"${optName}" must be an integer: ${optValue}`)
  }

  if (!HTTP_STATUSES.has(optValue)) {
    throw new TypeError(`"${optName}" must be an HTTP status code: ${optValue}`)
  }
}

// TODO: replace with `statuses` package once they become a pure ES module
/* eslint-disable no-magic-numbers */
const HTTP_STATUSES = new Set([
  100, 101, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300,
  301, 302, 303, 304, 305, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407,
  408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424,
  425, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508,
  509, 510, 511,
])
/* eslint-enable no-magic-numbers */

const validateURI = function (optValue, optName) {
  validateString(optValue, optName)

  try {
    // eslint-disable-next-line no-new
    new URL(optValue, EXAMPLE_ORIGIN)
  } catch (error) {
    throw new TypeError(
      `"${optName}" must not be "${optValue}" but a valid URL: ${error.message}`,
    )
  }
}

const EXAMPLE_ORIGIN = 'https://example.com'

const validateString = function (optValue, optName) {
  if (typeof optValue !== 'string') {
    throw new TypeError(`"${optName}" must be a string: ${optValue}`)
  }
}

const validateObject = function (optValue, optName) {
  if (!isPlainObj(optValue)) {
    throw new TypeError(`"${optName}" must be a plain object: ${optValue}`)
  }
}

const VALIDATORS = {
  type: validateURI,
  status: validateStatus,
  title: validateString,
  detail: validateString,
  instance: validateURI,
  stack: validateString,
  extra: validateObject,
}
