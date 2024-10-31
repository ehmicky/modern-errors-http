import type { HttpResponse, Options } from 'error-http-response'
import type { Info } from 'modern-errors'

export type { HttpResponse, Options }

/**
 * `modern-errors-http` plugin
 */
declare const plugin: {
  name: 'http'
  getOptions: (input: Options) => Options
  instanceMethods: {
    /**
     * Converts `error` to a plain object to use in an HTTP response.
     * Its shape follows [RFC 7807](https://www.rfc-editor.org/rfc/rfc7807)
     * ("problem details").
     *
     * @example
     * ```js
     * const object = BaseError.httpResponse(error)
     * // {
     * //   type: 'https://example.com/probs/auth',
     * //   status: 401,
     * //   title: 'AuthError',
     * //   detail: 'Could not authenticate.',
     * //   instance: '/users/62',
     * //   stack: `AuthError: Could not authenticate.
     * //     at ...`,
     * //   extra: { userId: 62 },
     * // }
     * ```
     */
    httpResponse: (info: Info['staticMethods']) => HttpResponse
  }
}
export default plugin
