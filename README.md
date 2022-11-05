<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ehmicky/design/main/modern-errors/modern-errors_dark.svg"/>
  <img alt="modern-errors logo" src="https://raw.githubusercontent.com/ehmicky/design/main/modern-errors/modern-errors.svg" width="600"/>
</picture>

[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/modern-errors-http.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/modern-errors-http)
[![TypeScript](https://img.shields.io/badge/-typed-brightgreen?logo=typescript&colorA=gray&logoColor=0096ff)](/types/main.d.ts)
[![Node](https://img.shields.io/node/v/modern-errors-http.svg?logo=node.js&logoColor=66cc33)](https://www.npmjs.com/package/modern-errors-http)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-brightgreen.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-brightgreen.svg?logo=medium)](https://medium.com/@ehmicky)

`modern-errors` plugin to create HTTP error responses.

This adds [`error.httpResponse()`](#errorhttpresponse) which converts `error` to
a plain object ([RFC 7807](https://www.rfc-editor.org/rfc/rfc7807), "problem
details") to use in an HTTP response.

# Example

[Adding the plugin](https://github.com/ehmicky/modern-errors#adding-plugins) to
[`modern-errors`](https://github.com/ehmicky/modern-errors).

```js
// `errors.js`
import modernErrors from 'modern-errors'
import modernErrorsHttp from 'modern-errors-http'

export const AnyError = modernErrors([modernErrorsHttp])
```

[Configuring](#configuration) error fields.

```js
export const AuthError = AnyError.subclass('AuthError', {
  http: {
    type: 'https://example.com/probs/auth',
    status: 401,
  },
})
```

[Creating](#errorhttpresponse) an HTTP error response.

```js
const error = new AuthError('Could not authenticate.', {
  http: {
    instance: '/users/62',
    extra: { userId: 62 },
  },
})
const object = error.httpResponse()
// {
//   type: 'https://example.com/probs/auth',
//   status: 401,
//   title: 'AuthError',
//   detail: 'Could not authenticate.',
//   instance: '/users/62',
//   stack: `AuthError: Could not authenticate.
//     at ...`,
//   extra: { userId: 62 },
// }
```

# Install

```bash
npm install modern-errors-http
```

This package is an ES module and must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`.

# API

## modernErrorsHttp

_Type_: `Plugin`

Plugin object to
[pass to `modernErrors()`](https://github.com/ehmicky/modern-errors#adding-plugins).

## error.httpResponse()

_Return value_: `HttpResponse`

Converts `error` to a plain object to use in an HTTP response. Its shape follows
[RFC 7807](https://www.rfc-editor.org/rfc/rfc7807) ("problem details").

## Options

_Type_: `object`

### type

_Type_: `urlString`\
_Default_: `undefined`

URI identifying and documenting the error class. Ideally, each error class
[should set one](#configuration).

### status

_Type_: `integer`\
_Default_: `undefined`

HTTP status code.

### title

_Type_: `string`\
_Default_: `error.name`

Error class name.

### detail

_Type_: `string`\
_Default_: `error.message`

Error description.

### instance

_Type_: `urlString`\
_Default_: `undefined`

URI identifying the value which errored.

### stack

_Type_: `string`\
_Default_: `error.stack`

Error stack trace. Can be set to an empty string.

### extra

_Type_: `object`\
_Default_: any additional `error` properties

Additional information. This is always
[safe to serialize as JSON](https://github.com/ehmicky/safe-json-value). Can be
set to an empty object.

## Configuration

[Options](#options) can apply to (in priority order):

- Any error: second argument to
  [`modernErrors()`](https://github.com/ehmicky/modern-errors#modernerrorsplugins-options)

```js
export const AnyError = modernErrors(plugins, { http: { ...options } })
```

- Any error of multiple classes: using
  [`ErrorClass.subclass()`](https://github.com/ehmicky/modern-errors#anyerrorsubclassname-options)

```js
export const SharedError = AnyError.subclass('SharedError', {
  http: { ...options },
})

export const AuthError = SharedError.subclass('AuthError')
export const InputError = SharedError.subclass('InputError')
```

- Any error of a specific class: second argument to
  [`AnyError.subclass()`](https://github.com/ehmicky/modern-errors#anyerrorsubclassname-options)

```js
export const AuthError = AnyError.subclass('AuthError', {
  http: { ...options },
})
```

- A specific error: second argument to the error's constructor

```js
throw new AuthError('...', { http: { ...options } })
```

- A specific [`error.httpResponse()`](#errorhttpresponse) call

```js
error.httpResponse(...args, { ...options })
```

# Related projects

- [`safe-json-value`](https://github.com/ehmicky/safe-json-value): ⛑️ JSON
  serialization should never fail
- [`modern-errors`](https://github.com/ehmicky/modern-errors): Handle errors
  like it's 2022 🔮
- [`modern-errors-cli`](https://github.com/ehmicky/modern-errors-cli): Handle
  errors in CLI modules
- [`modern-errors-process`](https://github.com/ehmicky/modern-errors-process):
  Handle process errors
- [`modern-errors-bugs`](https://github.com/ehmicky/modern-errors-bugs): Print
  where to report bugs
- [`modern-errors-serialize`](https://github.com/ehmicky/modern-errors-serialize):
  Serialize/parse errors
- [`modern-errors-stack`](https://github.com/ehmicky/modern-errors-stack): Clean
  stack traces
- [`modern-errors-winston`](https://github.com/ehmicky/modern-errors-winston):
  Log errors with Winston

# Support

For any question, _don't hesitate_ to [submit an issue on GitHub](../../issues).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix a bug or add a new feature, please check our
[guidelines](CONTRIBUTING.md). Pull requests are welcome!

<!-- Thanks go to our wonderful contributors: -->

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore -->
<!--
<table><tr><td align="center"><a href="https://twitter.com/ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/modern-errors-http/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/modern-errors-http/commits?author=ehmicky" title="Documentation">📖</a></td></tr></table>
 -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
