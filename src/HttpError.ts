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
  name?: string;
  title?: string;
  status?: number;
  message?: string;
  detail?: string;
  stack?: string;
  type?: string;
}

/**
 * Returns the value if it is a number between 100 and 699.
 * Otherwise returns undefined.
 * Supports strings containing numbers.
 *
 * @param {any} value
 * @returns {(number|undefined)}
 */
export function getStatusCode(value: any): number|undefined {
  let returnValue, numValue;
  if (typeof value === 'string') {
    numValue = parseInt(value);
  } else if (typeof value === 'number') {
    numValue = value;
  }
  if (numValue && numValue >= 100 && numValue <= 699) {
    returnValue = numValue;
  }
  return returnValue;
}

/**
 * Returns an object with HttpErrorOptions values from obj,
 * if it is an object, or an instance of Error or HttpError
 *
 * @param {any} obj
 * @returns {HttpErrorOptions}
 */
function getOptionsFromObject(obj: any): HttpErrorOptions {
  let returnOptions = {};
  if (typeof obj === 'object' || obj instanceof HttpError || obj instanceof Error) {
    [
      'name', 'title', 'status',
      'message', 'detail', 'stack'
    ].map(k => {
      let v = obj[k];
      if (typeof v === 'string' || typeof v === 'number') {
        returnOptions[k] = v;
      }
    });
  }
  return returnOptions;
}

/**
 * Returns HttpError options parsed from the provided parameters
 * @param errorOptions
 * @returns HttpErrorOptions
 */
export function parseErrorOptions(...errorOptions: Array<string | number | HttpErrorOptions | Array<string | number>>): HttpErrorOptions {
  let options: HttpErrorOptions = {};
  errorOptions.map(opt => {
    if (Array.isArray(opt)) {
      Object.assign(options, parseErrorOptions(...opt));
    } else {
      let statusCode = getStatusCode(opt);
      if (statusCode) {
        options.status = statusCode;
      } else if (typeof opt === 'string') {
        options.message = opt;
      } else {
        Object.assign(options, getOptionsFromObject(opt));
      }
    }
  });
  return options;
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
  status: number;
  title: string;
  message: string;
  constructor(...errorOptions: Array<number|string|HttpErrorOptions>) {
    super();
    this.status = 500;
    this.title = 'Internal Server Error';
    this.message = 'Indicates that the server encountered an unexpected condition that prevented it from fulfilling the request';
    let options = parseErrorOptions(...errorOptions);
    Object.assign(this, options);
  }

  /**
   * The HTTP Status code
   * Included for compatibility
   *
   * @memberof HttpError
   */
  get statusCode() {
    return this.status;
  }
  set statusCode(statusCode) {
    this.status = statusCode;
  }
}
