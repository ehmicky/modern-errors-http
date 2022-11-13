import test from 'ava'
import { each } from 'test-each'

import { BaseError, baseError } from './helpers/main.js'

each(
  [
    true,
    { unknown: true },
    { title: true },
    { detail: true },
    { stack: true },
    { status: '200' },
    { status: 600 },
    ...['type', 'instance'].flatMap((optName) => [
      { [optName]: true },
      { [optName]: '//' },
    ]),
    { extra: true },
  ],
  ({ title }, options) => {
    test(`Options are validated | ${title}`, (t) => {
      t.throws(BaseError.httpResponse.bind(undefined, baseError, options))
    })
  },
)
