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

ModernError.subclass('TestError', { plugins: [plugin], http: { type: '' } })
BaseError.httpResponse(error, { type: '' })
expectAssignable<Options>({ type: '' })
expectError(
  ModernError.subclass('TestError', {
    plugins: [plugin],
    http: { type: true },
  }),
)
expectError(BaseError.httpResponse(error, { type: true }))
expectNotAssignable<Options>({ type: true })

ModernError.subclass('TestError', { plugins: [plugin], http: { status: 200 } })
BaseError.httpResponse(error, { status: 200 })
expectAssignable<Options>({ status: 200 })
expectError(
  ModernError.subclass('TestError', {
    plugins: [plugin],
    http: { status: true },
  }),
)
expectError(BaseError.httpResponse(error, { status: true }))
expectNotAssignable<Options>({ status: true })

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

ModernError.subclass('TestError', { plugins: [plugin], http: { detail: '' } })
BaseError.httpResponse(error, { detail: '' })
expectAssignable<Options>({ detail: '' })
expectError(
  ModernError.subclass('TestError', {
    plugins: [plugin],
    http: { detail: true },
  }),
)
expectError(BaseError.httpResponse(error, { detail: true }))
expectNotAssignable<Options>({ detail: true })

ModernError.subclass('TestError', { plugins: [plugin], http: { instance: '' } })
BaseError.httpResponse(error, { instance: '' })
expectAssignable<Options>({ instance: '' })
expectError(
  ModernError.subclass('TestError', {
    plugins: [plugin],
    http: { instance: true },
  }),
)
expectError(BaseError.httpResponse(error, { instance: true }))
expectNotAssignable<Options>({ instance: true })

ModernError.subclass('TestError', { plugins: [plugin], http: { stack: '' } })
BaseError.httpResponse(error, { stack: '' })
expectAssignable<Options>({ stack: '' })
expectError(
  ModernError.subclass('TestError', {
    plugins: [plugin],
    http: { stack: true },
  }),
)
expectError(BaseError.httpResponse(error, { stack: true }))
expectNotAssignable<Options>({ stack: true })

ModernError.subclass('TestError', { plugins: [plugin], http: { extra: {} } })
BaseError.httpResponse(error, { extra: {} })
expectAssignable<Options>({ extra: {} })
ModernError.subclass('TestError', {
  plugins: [plugin],
  http: { extra: { prop: true } },
})
BaseError.httpResponse(error, { extra: { prop: true } })
expectAssignable<Options>({ extra: { prop: true } })
expectError(
  ModernError.subclass('TestError', {
    plugins: [plugin],
    http: { extra: true },
  }),
)
expectError(BaseError.httpResponse(error, { extra: true }))
expectNotAssignable<Options>({ extra: true })

expectType<HttpResponse>(httpResponse)
expectType<string | undefined>(httpResponse.type)
expectType<number | undefined>(httpResponse.status)
expectType<string>(httpResponse.title)
expectType<string>(httpResponse.detail)
expectType<string | undefined>(httpResponse.instance)
expectType<string>(httpResponse.stack)
expectType<object | undefined>(httpResponse.extra)
expectError(httpResponse.extra?.prop)

expectType<HttpResponse>(error.httpResponse())
expectError(error.httpResponse(true))
