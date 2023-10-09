<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ehmicky/design/main/modern-errors/modern-errors_dark.svg"/>
  <img alt="modern-errors logo" src="https://raw.githubusercontent.com/ehmicky/design/main/modern-errors/modern-errors.svg" width="600"/>
</picture>

[![Node](https://img.shields.io/badge/-Node.js-808080?logo=node.js&colorA=404040&logoColor=66cc33)](https://www.npmjs.com/package/modern-errors-http)
[![Browsers](https://img.shields.io/badge/-Browsers-808080?logo=firefox&colorA=404040)](https://unpkg.com/modern-errors-http?module)
[![TypeScript](https://img.shields.io/badge/-Typed-808080?logo=typescript&colorA=404040&logoColor=0096ff)](/src/main.d.ts)
[![Codecov](https://img.shields.io/badge/-Tested%20100%25-808080?logo=codecov&colorA=404040)](https://codecov.io/gh/ehmicky/modern-errors-http)
[![Minified size](https://img.shields.io/bundlephobia/minzip/modern-errors-http?label&colorA=404040&colorB=808080&logo=webpack)](https://bundlephobia.com/package/modern-errors-http)
[![Mastodon](https://img.shields.io/badge/-Mastodon-808080.svg?logo=mastodon&colorA=404040&logoColor=9590F9)](https://fosstodon.org/@ehmicky)
[![Medium](https://img.shields.io/badge/-Medium-808080.svg?logo=medium&colorA=404040)](https://medium.com/@ehmicky)

[`modern-errors`](https://github.com/ehmicky/modern-errors)
[plugin](https://github.com/ehmicky/modern-errors#-plugins) to create HTTP error
responses.

This adds [`BaseError.httpResponse(error)`](#baseerrorhttpresponseerror) which
converts `error` to a plain object
([RFC 7807](https://www.rfc-editor.org/rfc/rfc7807), "problem details") to use
in an HTTP response.

# Hire me

Please
[reach out](https://www.linkedin.com/feed/update/urn:li:activity:7117265228068716545/)
if you're looking for a Node.js API or CLI engineer (11 years of experience).
Most recently I have been [Netlify Build](https://github.com/netlify/build)'s
and [Netlify Plugins](https://www.netlify.com/products/build/plugins/)'
technical lead for 2.5 years. I am available for full-time remote positions.

# Example

[Adding the plugin](https://github.com/ehmicky/modern-errors#adding-plugins) to
[`modern-errors`](https://github.com/ehmicky/modern-errors).

```js
import ModernError from 'modern-errors'

import modernErrorsHttp from 'modern-errors-http'

export const BaseError = ModernError.subclass('BaseError', {
  plugins: [modernErrorsHttp],
})
```

[Configuring](#configuration) error fields.

```js
export const AuthError = BaseError.subclass('AuthError', {
  http: {
    type: 'https://example.com/probs/auth',
    status: 401,
  },
})
```

[Creating](#baseerrorhttpresponseerror) an HTTP error response.

```js
const error = new AuthError('Could not authenticate.', {
  http: {
    instance: '/users/62',
    extra: { userId: 62 },
  },
})
const object = BaseError.httpResponse(error)
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

This package works in both Node.js >=16.17.0 and
[browsers](https://raw.githubusercontent.com/ehmicky/dev-tasks/main/src/browserslist).

This is an ES module. It must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`. If TypeScript is used, it must be configured to
[output ES modules](https://www.typescriptlang.org/docs/handbook/esm-node.html),
not CommonJS.

# API

## modernErrorsHttp

_Type_: `Plugin`

Plugin object to pass to the
[`plugins` option](https://github.com/ehmicky/modern-errors#adding-plugins) of
`ErrorClass.subclass()`.

## BaseError.httpResponse(error)

`error`: `Error`\
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
  [`ModernError.subclass()`](https://github.com/ehmicky/modern-errors#options-1)

```js
export const BaseError = ModernError.subclass('BaseError', {
  plugins: [modernErrorsHttp],
  http: options,
})
```

- Any error of a specific class (and its subclasses): second argument to
  [`ErrorClass.subclass()`](https://github.com/ehmicky/modern-errors#options-1)

```js
export const AuthError = BaseError.subclass('AuthError', { http: options })
```

- A specific error: second argument to
  [`new ErrorClass()`](https://github.com/ehmicky/modern-errors#options-3)

```js
throw new AuthError('...', { http: options })
```

- A specific [`BaseError.httpResponse(error)`](#baseerrorhttpresponseerror) call

```js
BaseError.httpResponse(error, options)
```

# Related projects

- [`error-http-response`](https://github.com/ehmicky/error-http-response):
  Create HTTP error responses
- [`safe-json-value`](https://github.com/ehmicky/safe-json-value): ⛑️ JSON
  serialization should never fail
- [`modern-errors`](https://github.com/ehmicky/modern-errors): Handle errors in
  a simple, stable, consistent way
- [`modern-errors-cli`](https://github.com/ehmicky/modern-errors-cli): Handle
  errors in CLI modules
- [`modern-errors-process`](https://github.com/ehmicky/modern-errors-process):
  Handle process errors
- [`modern-errors-bugs`](https://github.com/ehmicky/modern-errors-bugs): Print
  where to report bugs
- [`modern-errors-serialize`](https://github.com/ehmicky/modern-errors-serialize):
  Serialize/parse errors
- [`modern-errors-clean`](https://github.com/ehmicky/modern-errors-clean): Clean
  stack traces
- [`modern-errors-winston`](https://github.com/ehmicky/modern-errors-winston):
  Log errors with Winston
- [`modern-errors-switch`](https://github.com/ehmicky/modern-errors-switch):
  Execute class-specific logic

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
<table><tr><td align="center"><a href="https://fosstodon.org/@ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/modern-errors-http/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/modern-errors-http/commits?author=ehmicky" title="Documentation">📖</a></td></tr></table>
 -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
