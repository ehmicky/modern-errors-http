import test from 'ava'
import { each } from 'test-each'

import { BaseError, baseError } from './helpers/main.js'

each(
  [
    ['title', 'testTitle'],
    ['detail', 'testDetails'],
    ['stack', 'testStack'],
    // eslint-disable-next-line no-magic-numbers
    ['status', 200],
    ...['type', 'instance'].flatMap((optName) => [
      [optName, ''],
      [optName, '#hash'],
      [optName, '/path'],
      [optName, 'https://example.com/path'],
    ]),
    ['extra', {}],
    ['extra', { prop: true }],
  ],
  ({ title }, [propName, propValue]) => {
    test(`Valid options are kept | ${title}`, (t) => {
      const httpResponse = baseError.httpResponse({ [propName]: propValue })
      t.deepEqual(httpResponse[propName], propValue)
    })
  },
)

each(
  [
    undefined,
    {},
    ...['title', 'detail', 'status', 'type', 'instance', 'stack', 'extra'].map(
      (optName) => ({ [optName]: undefined }),
    ),
  ],
  ({ title }, http) => {
    test(`Assign default options | ${title}`, (t) => {
      const { name, message, stack } = baseError
      const httpResponse = baseError.httpResponse(http)
      t.deepEqual(httpResponse, { title: name, detail: message, stack })
    })
  },
)

test('Assign default extra', (t) => {
  const props = { prop: true }
  t.deepEqual(new BaseError('test', { props }).httpResponse().extra, props)
})

test('Keep extra JSON-safe', (t) => {
  t.deepEqual(baseError.httpResponse({ extra: { one: true, two: 0n } }).extra, {
    one: true,
  })
})

test('Keep object keys order', (t) => {
  t.deepEqual(
    Object.keys(
      baseError.httpResponse({
        extra: {},
        stack: '',
        instance: '',
        type: '',
        status: 200,
        title: '',
        detail: '',
      }),
    ),
    ['type', 'status', 'title', 'detail', 'instance', 'stack', 'extra'],
  )
})
