/**
 * Options for creating an HttpError object
 *
 * @param {string} name A custom name for the Error object
 * @param {string} title Short descriptor for the error
 * @param {string} status The HTTP Status code
 * @param {string} message Info about the error (usually generic)
 * @param {string} detail Additional detail about this particular error
 * @param {string} stack Stack trace from the Error object
 * @param {string} type Link to info about the error
 */
export interface HttpErrorOptions {
  name?: string
  title?: string
  status?: number
  body?: object | string
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
export function getStatusCode(value: string | number): Maybe<number> {
  let returnValue: Maybe<number>
  if (typeof value === 'string' || typeof value === 'number') {
    const numValue = parseInt(('' + value).split('.')[0], 10)
    if (numValue && numValue >= 100 && numValue <= 699) {
      returnValue = numValue
    }
  }
  return returnValue
}

/**
 * Returns HttpError options parsed from the provided parameters
 * @param errorOptions
 * @returns HttpErrorOptions
 */
export function parseErrorOptions(...errorOptions: Array<string|number|HttpErrorOptions|HttpError>): HttpErrorOptions {
  let options: HttpErrorOptions = {}
  errorOptions.map(opt => {
    if (opt) {
      if (typeof opt === 'string' || typeof opt === 'number') {
        const statusCode = getStatusCode(opt)
        if (statusCode) {
          options.status = statusCode
        } else if (typeof opt === 'string') {
          options.message = opt
        }
      } else if (opt instanceof Error || hasKeys(opt)) {
        options = {
          ...options,
          ...getOptionsFromObject(opt)
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
  status: number
  title: string
  body?: object
  message: string

  constructor(...errorOptions: Array<number | string | HttpErrorOptions>) {
    super()
    this.status = DEFAULT_STATUS_CODE
    this.title = DEFAULT_REASON_CODE
    this.message = DEFAULT_ERROR_MESSAGE
    Object.assign(this, parseErrorOptions(...errorOptions))
    if (!this.body && this.status < 500) {
      this.body = {
        error_text: this.message || DEFAULT_ERROR_MESSAGE
      }
    }
  }

  /**
   * The HTTP Status code
   * Included for compatibility
   *
   * @memberof HttpError
   */
  get statusCode() {
    return this.status
  }
  set statusCode(statusCode) {
    this.status = statusCode
  }
}

/**
 * Returns an object with HttpErrorOptions values from obj,
 * if it is an object, or an instance of Error or HttpError
 *
 * @param {any} obj
 * @returns {HttpErrorOptions}
 */
function getOptionsFromObject(obj: any): HttpErrorOptions {
  const returnOptions = {}
  ERROR_PROPERTIES
    .map(getPropGetter(obj))
    .filter(kvPair => typeof kvPair[1] !== 'undefined')
    .map(([key, value]) => {
      returnOptions[key] = value
    })
  return returnOptions
}

/**
 * Accepts an object, and returns a function that accepts a property name. If obj
 * has keys and the property name exists on it, this function will return a
 * tuple of [property_name, property_value]. If either of those criteria are
 * not met, property_value will be undefined.
 *
 * @param obj
 */
const getPropGetter = <T>(obj: T) => {
  return <P extends keyof T>(propName: P) => {
    let propValue
    try {
      propValue = obj[propName]
    } catch (_er) { }
    return [propName, propValue]
  }
}

/**
 * Returns true if obj has at least one of it's own keys
 *
 * @param {any} obj
 * @returns {boolean}
 */
function hasKeys(obj: any): boolean {
  let keyCount
  try {
    keyCount = Object.keys(obj).length
  } catch (_er) { }
  return (keyCount && keyCount > 0)
}

const ERROR_PROPERTIES = [
  'name', 'title', 'status', 'body',
  'message', 'detail', 'stack', 'type'
]
const DEFAULT_STATUS_CODE = 500
const DEFAULT_REASON_CODE = 'Internal Server Error'
// tslint:disable-next-line: max-line-length
const DEFAULT_ERROR_MESSAGE = 'The server encountered an unexpected condition that prevented it from fulfilling the request'

type Maybe<T> = T | undefined
