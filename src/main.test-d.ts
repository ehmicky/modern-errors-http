import ModernError from 'modern-errors'
import { expectType, expectAssignable, expectNotAssignable } from 'tsd'

import plugin, { type Options, type HttpResponse } from 'modern-errors-http'

const BaseError = ModernError.subclass('BaseError', { plugins: [plugin] })
const error = new BaseError('')
const httpResponse = BaseError.httpResponse(error)

ModernError.subclass('TestError', { plugins: [plugin], http: {} })
BaseError.httpResponse(error, {})
expectAssignable<Options>({})
// @ts-expect-error
BaseError.httpResponse(error, undefined)
expectNotAssignable<Options>(undefined)
// @ts-expect-error
ModernError.subclass('TestError', { plugins: [plugin], http: true })
// @ts-expect-error
BaseError.httpResponse(error, true)
expectNotAssignable<Options>(true)
ModernError.subclass('TestError', {
  plugins: [plugin],
  // @ts-expect-error
  http: { unknown: true },
})
// @ts-expect-error
BaseError.httpResponse(error, { unknown: true })
expectNotAssignable<Options>({ unknown: true })

ModernError.subclass('TestError', { plugins: [plugin], http: { title: '' } })
BaseError.httpResponse(error, { title: '' })
expectAssignable<Options>({ title: '' })
ModernError.subclass('TestError', {
  plugins: [plugin],
  // @ts-expect-error
  http: { title: true },
})
// @ts-expect-error
BaseError.httpResponse(error, { title: true })
expectNotAssignable<Options>({ title: true })

expectType<HttpResponse>(httpResponse)
expectType<string>(httpResponse.title)

expectType<HttpResponse>(error.httpResponse())
// @ts-expect-error
error.httpResponse(true)
