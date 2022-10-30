import modernErrors from 'modern-errors'
import modernErrorsHttp from 'modern-errors-http'

const AnyError = modernErrors([modernErrorsHttp])
AnyError.subclass('UnknownError')
export const TestError = AnyError.subclass('TestError')
export const testError = new TestError('test')
