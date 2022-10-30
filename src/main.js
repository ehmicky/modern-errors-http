import safeJsonValue from 'safe-json-value'

import { getOptions } from './options.js'

// Turn `error` into a RFC 7807 problem details object.
// Object keys order is significant.
const httpResponse = function ({
  // eslint-disable-next-line no-unused-vars
  error: { name, message, stack, cause, errors, ...errorProps },
  options,
}) {
  return safeJsonValue({
    ...getOptionalProp(options, 'type'),
    ...getOptionalProp(options, 'status'),
    ...getDefaultedProp(options, 'title', String(name)),
    ...getDefaultedProp(options, 'detail', String(message)),
    ...getOptionalProp(options, 'instance'),
    ...getDefaultedProp(options, 'stack', String(stack)),
    ...getExtra(options, errorProps),
  }).value
}

const getOptionalProp = function (options, optName) {
  return options[optName] === undefined ? {} : { [optName]: options[optName] }
}

const getDefaultedProp = function (options, optName, defaultValue) {
  return { [optName]: options[optName] ?? defaultValue }
}

const getExtra = function ({ extra }, errorProps) {
  if (extra !== undefined) {
    return { extra }
  }

  return Object.keys(errorProps).length === 0 ? {} : { extra: errorProps }
}

export default {
  name: 'http',
  getOptions,
  instanceMethods: { httpResponse },
}
