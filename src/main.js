import errorHttpResponse from 'error-http-response'

// Validate options
const getOptions = function (options) {
  errorHttpResponse('', options)
  return options
}

// Turn `error` into a RFC 7807 problem details object
const httpResponse = function ({ error, options }) {
  return errorHttpResponse(error, options)
}

export default {
  name: 'http',
  getOptions,
  instanceMethods: { httpResponse },
}
