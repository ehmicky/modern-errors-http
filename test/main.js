import test from 'ava'
import ModernError from 'modern-errors'
import modernErrorsHttp from 'modern-errors-http'

export const BaseError = ModernError.subclass('BaseError', {
  plugins: [modernErrorsHttp],
})
export const baseError = new BaseError('test')

test('Options are validated', (t) => {
  t.throws(BaseError.httpResponse.bind(undefined, baseError, { title: true }))
})

test('Valid options are kept', (t) => {
  t.is(
    BaseError.httpResponse(baseError, { title: 'testTitle' }).title,
    'testTitle',
  )
})

test('Assign default options', (t) => {
  t.deepEqual(BaseError.httpResponse(baseError), {
    title: baseError.name,
    detail: baseError.message,
    stack: baseError.stack,
  })
})

test('Can be called as error.httpResponse()', (t) => {
  t.is(BaseError.httpResponse(baseError).title, baseError.name)
})
