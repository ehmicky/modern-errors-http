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
const httpResponse = error.httpResponse()

ModernError.subclass('TestError', { plugins: [plugin], http: {} })
error.httpResponse({})
expectAssignable<Options>({})
expectError(error.httpResponse(undefined))
expectNotAssignable<Options>(undefined)
expectError(
  ModernError.subclass('TestError', { plugins: [plugin], http: true }),
)
expectError(error.httpResponse(true))
expectNotAssignable<Options>(true)
expectError(
  ModernError.subclass('TestError', {
    plugins: [plugin],
    http: { unknown: true },
  }),
)
expectError(error.httpResponse({ unknown: true }))
expectNotAssignable<Options>({ unknown: true })

ModernError.subclass('TestError', { plugins: [plugin], http: { type: '' } })
error.httpResponse({ type: '' })
expectAssignable<Options>({ type: '' })
expectError(
  ModernError.subclass('TestError', {
    plugins: [plugin],
    http: { type: true },
  }),
)
expectError(error.httpResponse({ type: true }))
expectNotAssignable<Options>({ type: true })

ModernError.subclass('TestError', { plugins: [plugin], http: { status: 200 } })
error.httpResponse({ status: 200 })
expectAssignable<Options>({ status: 200 })
expectError(
  ModernError.subclass('TestError', {
    plugins: [plugin],
    http: { status: true },
  }),
)
expectError(error.httpResponse({ status: true }))
expectNotAssignable<Options>({ status: true })

ModernError.subclass('TestError', { plugins: [plugin], http: { title: '' } })
error.httpResponse({ title: '' })
expectAssignable<Options>({ title: '' })
expectError(
  ModernError.subclass('TestError', {
    plugins: [plugin],
    http: { title: true },
  }),
)
expectError(error.httpResponse({ title: true }))
expectNotAssignable<Options>({ title: true })

ModernError.subclass('TestError', { plugins: [plugin], http: { detail: '' } })
error.httpResponse({ detail: '' })
expectAssignable<Options>({ detail: '' })
expectError(
  ModernError.subclass('TestError', {
    plugins: [plugin],
    http: { detail: true },
  }),
)
expectError(error.httpResponse({ detail: true }))
expectNotAssignable<Options>({ detail: true })

ModernError.subclass('TestError', { plugins: [plugin], http: { instance: '' } })
error.httpResponse({ instance: '' })
expectAssignable<Options>({ instance: '' })
expectError(
  ModernError.subclass('TestError', {
    plugins: [plugin],
    http: { instance: true },
  }),
)
expectError(error.httpResponse({ instance: true }))
expectNotAssignable<Options>({ instance: true })

ModernError.subclass('TestError', { plugins: [plugin], http: { stack: '' } })
error.httpResponse({ stack: '' })
expectAssignable<Options>({ stack: '' })
expectError(
  ModernError.subclass('TestError', {
    plugins: [plugin],
    http: { stack: true },
  }),
)
expectError(error.httpResponse({ stack: true }))
expectNotAssignable<Options>({ stack: true })

ModernError.subclass('TestError', { plugins: [plugin], http: { extra: {} } })
error.httpResponse({ extra: {} })
expectAssignable<Options>({ extra: {} })
ModernError.subclass('TestError', {
  plugins: [plugin],
  http: { extra: { prop: true } },
})
error.httpResponse({ extra: { prop: true } })
expectAssignable<Options>({ extra: { prop: true } })
expectError(
  ModernError.subclass('TestError', {
    plugins: [plugin],
    http: { extra: true },
  }),
)
expectError(error.httpResponse({ extra: true }))
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
