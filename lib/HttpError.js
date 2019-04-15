"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns the value if it is a number between 100 and 699.
 * Otherwise returns undefined.
 * Supports strings containing numbers.
 *
 * @param {any} value
 * @returns {(number|undefined)}
 */
function getStatusCode(value) {
    let returnValue, numValue;
    if (typeof value === 'string') {
        numValue = parseInt(value);
    }
    else if (typeof value === 'number') {
        numValue = value;
    }
    if (numValue && numValue >= 100 && numValue <= 699) {
        returnValue = numValue;
    }
    return returnValue;
}
exports.getStatusCode = getStatusCode;
/**
 * Returns an object with HttpErrorOptions values from obj,
 * if it is an object, or an instance of Error or HttpError
 *
 * @param {any} obj
 * @returns {HttpErrorOptions}
 */
function getOptionsFromObject(obj) {
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
function parseErrorOptions(...errorOptions) {
    let options = {};
    errorOptions.map(opt => {
        if (Array.isArray(opt)) {
            Object.assign(options, parseErrorOptions(...opt));
        }
        else {
            let statusCode = getStatusCode(opt);
            if (statusCode) {
                options.status = statusCode;
            }
            else if (typeof opt === 'string') {
                options.message = opt;
            }
            else {
                Object.assign(options, getOptionsFromObject(opt));
            }
        }
    });
    return options;
}
exports.parseErrorOptions = parseErrorOptions;
/**
 * The HttpError class extends the Error object, providing Http status
 * code and message detail. Pass it an HttpErrorOptions object, a status
 * code, an error message, or an Error object.
 *
 * @export
 * @class HttpError
 * @extends {Error}
 */
class HttpError extends Error {
    constructor(...errorOptions) {
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
exports.HttpError = HttpError;
//# sourceMappingURL=HttpError.js.map