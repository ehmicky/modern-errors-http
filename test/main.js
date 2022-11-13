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
      const httpResponse = BaseError.httpResponse(baseError, {
        [propName]: propValue,
      })
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
  ({ title }, options) => {
    test(`Assign default options | ${title}`, (t) => {
      const { name, message, stack } = baseError
      const httpResponse = BaseError.httpResponse(baseError, options)
      t.deepEqual(httpResponse, { title: name, detail: message, stack })
    })
  },
)

test('Can be called as error.httpResponse()', (t) => {
  t.is(BaseError.httpResponse(baseError).title, baseError.name)
})

test('Assign default extra', (t) => {
  const props = { prop: true }
  const error = new BaseError('test', { props })
  t.deepEqual(BaseError.httpResponse(error).extra, props)
})

test('Keep extra JSON-safe', (t) => {
  t.deepEqual(
    BaseError.httpResponse(baseError, { extra: { one: true, two: 0n } }).extra,
    { one: true },
  )
})

test('Keep object keys order', (t) => {
  t.deepEqual(
    Object.keys(
      BaseError.httpResponse(baseError, {
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
