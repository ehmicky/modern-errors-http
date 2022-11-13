import ModernError from 'modern-errors'
import modernErrorsHttp from 'modern-errors-http'

export const BaseError = ModernError.subclass('BaseError', {
  plugins: [modernErrorsHttp],
})
export const baseError = new BaseError('test')
