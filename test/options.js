import test from 'ava'
import { each } from 'test-each'

import { testError } from './helpers/main.js'

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
  ({ title }, http) => {
    test(`Options are validated | ${title}`, (t) => {
      t.throws(testError.httpResponse.bind(testError, http))
    })
  },
)
