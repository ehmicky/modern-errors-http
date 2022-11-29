import ModernError from 'modern-errors'
import plugin, { Options, HttpResponse } from 'modern-errors-http'
import {
  expectType,
  expectAssignable,
  expectNotAssignable,
  expectError,
} from 'tsd'

const BaseError = ModernError.subclass('BaseError', { plugins: [plugin] })
const error = new BaseError('')
const httpResponse = BaseError.httpResponse(error)

ModernError.subclass('TestError', { plugins: [plugin], http: {} })
BaseError.httpResponse(error, {})
expectAssignable<Options>({})
expectError(BaseError.httpResponse(error, undefined))
expectNotAssignable<Options>(undefined)
expectError(
  ModernError.subclass('TestError', { plugins: [plugin], http: true }),
)
expectError(BaseError.httpResponse(error, true))
expectNotAssignable<Options>(true)
expectError(
  ModernError.subclass('TestError', {
    plugins: [plugin],
    http: { unknown: true },
  }),
)
expectError(BaseError.httpResponse(error, { unknown: true }))
expectNotAssignable<Options>({ unknown: true })

ModernError.subclass('TestError', { plugins: [plugin], http: { title: '' } })
BaseError.httpResponse(error, { title: '' })
expectAssignable<Options>({ title: '' })
expectError(
  ModernError.subclass('TestError', {
    plugins: [plugin],
    http: { title: true },
  }),
)
expectError(BaseError.httpResponse(error, { title: true }))
expectNotAssignable<Options>({ title: true })

expectType<HttpResponse>(httpResponse)
expectType<string>(httpResponse.title)

expectType<HttpResponse>(error.httpResponse())
expectError(error.httpResponse(true))
