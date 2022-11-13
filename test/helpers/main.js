import modernErrors from 'modern-errors'
import modernErrorsHttp from 'modern-errors-http'

const BaseError = modernErrors([modernErrorsHttp])
BaseError.subclass('UnknownError')
export const TestError = BaseError.subclass('TestError')
export const testError = new TestError('test')
