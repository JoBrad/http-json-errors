/**
 * Options for creating an HttpError object
 *
 * @param {string} name A custom name for the Error object
 * @param {string} title Short descriptor for the error
 * @param {string} statusCode The HTTP Status code
 * @param {string} message Info about the error (usually generic)
 * @param {string} detail Additional detail about this particular error
 * @param {string} stack Stack trace from the Error object
 * @param {string} type Link to info about the error
 */
export interface HttpErrorOptions {
  name?: string
  title?: string
  statusCode?: number
  body?: Record<string, any> | string
  message?: string
  detail?: string
  stack?: string
  type?: string
}

/**
 * Returns the value if it is a number between 100 and 699.
 * Otherwise returns undefined.
 * Supports strings containing numbers.
 *
 * @param {any} value
 * @returns {(number|undefined)}
 */
export const getStatusCode = (value: string | number): Maybe<number> => {
  let returnValue: Maybe<number>
  if (typeof value === 'string' || typeof value === 'number') {
    const numValue = parseInt(`${value}`.split('.')[0], 10)
    if (numValue && numValue >= 100 && numValue <= 699) {
      returnValue = numValue
    }
  }
  return returnValue
}

/**
 * Returns HttpError options parsed from the provided parameters
 *
 * @param errorOptions
 * @returns HttpErrorOptions
 */
export const parseErrorOptions = (...errorOptions: OptionsArg[]): HttpErrorOptions => {
  let options: HttpErrorOptions = {}
  errorOptions.map(opt => {
    if (opt) {
      if (typeof opt === 'string' || typeof opt === 'number') {
        const statusCode = getStatusCode(opt)
        if (statusCode) {
          options.statusCode = statusCode
        } else if (typeof opt === 'string') {
          options.message = opt
        }
      } else if (opt instanceof Error || hasKeys(opt)) {
        options = {
          ...options,
          ...getErrorProperties(opt),
        }
      }
    }
  })
  return options
}

/**
 * The HttpError class extends the Error object, providing Http status
 * code and message detail. Pass it an HttpErrorOptions object, a status
 * code, an error message, or an Error object.
 *
 * @export
 * @class HttpError
 * @extends {Error}
 */
export class HttpError extends Error {
  readonly isHttpError = true
  statusCode: number
  title: string
  body?: Record<string, any>
  message: string

  constructor(...errorOptions: OptionsArg[]) {
    super()
    this.statusCode = DEFAULT_STATUS_CODE
    this.title = DEFAULT_REASON_CODE
    this.message = DEFAULT_ERROR_MESSAGE
    Object.assign(this, parseErrorOptions(...errorOptions))
    if (!this.body && this.statusCode < 500) {
      this.body = {
        // eslint-disable-next-line camelcase
        error_text: this.message || DEFAULT_ERROR_MESSAGE,
      }
    }
  }

  get status(): number {
    return this.statusCode
  }
}

/**
 * Extracts HttpErrorOptions properties from obj
 *
 * @param obj
 */
const getErrorProperties = (obj: Record<string, any>): HttpErrorOptions => {
  const returnObj: HttpErrorOptions = {}
  if ( (isObj(obj) && hasKeys(obj)) || isErr(obj) ) {
    const {
      name, title, message, detail,
      stack, type, statusCode, body,
    } = obj
    if (isString(name)) {
      returnObj.name = name
    }
    if (isString(title)) {
      returnObj.title = title
    }
    if (isString(message)) {
      returnObj.message = message
    }
    if (isString(detail)) {
      returnObj.detail = detail
    }
    if (isString(stack)) {
      returnObj.stack = stack
    }
    if (isString(type)) {
      returnObj.type = type
    }
    if (statusCode && isNumber(statusCode)) {
      returnObj.statusCode = statusCode
    }
    if (body && ( isString(body) || isObj(body)) ) {
      returnObj.body = body
    }
  }
  return returnObj
}

/**
 * Returns true if obj is null or undefined
 *
 * @param obj
 */
const isNil = (obj: unknown): obj is null | undefined => {
  return null === obj || typeof obj === 'undefined'
}

/**
 * Returns true if obj is a string
 *
 * @param obj
 */
const isString = (obj: unknown): obj is string => {
  return typeof obj === 'string'
}

/**
 * Returns true if obj is a plain object, but is not null or undefined
 *
 * @param obj
 */
const isObj = (obj: unknown): obj is NonNullable<Record<string, unknown>> => {
  return !isNil(obj) && Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * Returns true if obj is an Error instance
 *
 * @param obj
 */
const isErr = (obj: unknown): obj is Error | HttpError => {
  return obj instanceof Error
}

/**
 * Returns true if obj is a number, but not NaN
 *
 * @param obj
 */
const isNumber = (obj: unknown): obj is number => {
  return typeof obj === 'number' && !isNaN(obj)
}

/**
 * Returns true if obj has at least one of it's own keys
 *
 * @param {any} obj
 * @returns {boolean}
 */
const hasKeys = (obj: any): boolean => {
  let keyCount = 0
  try {
    keyCount = Object.keys(obj).length
  } catch (_er) { }
  return keyCount > 0
}

const DEFAULT_STATUS_CODE = 500
const DEFAULT_REASON_CODE = 'Internal Server Error'
// eslint-disable-line max-len
const DEFAULT_ERROR_MESSAGE = 'The server encountered an unexpected condition that prevented it from fulfilling the request'
type Maybe<T> = T | undefined
type OptionsArg = Maybe<string|number|HttpErrorOptions|HttpError>
