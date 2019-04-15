// Type definitions for http-json-errors
// Project: https://github.com/JoBrad/http-json-errors
// Definitions by: Joseph T. Bradley
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
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
export declare function getStatusCode(value: any): number | undefined;
/**
 * Returns HttpError options parsed from the provided parameters
 * @param errorOptions
 * @returns HttpErrorOptions
 */
export declare function parseErrorOptions(...errorOptions: Array<string | number | HttpErrorOptions | Array<string | number>>): HttpErrorOptions;
/**
 * The HttpError class extends the Error object, providing Http status
 * code and message detail. Pass it an HttpErrorOptions object, a status
 * code, an error message, or an Error object.
 *
 * @export
 * @class HttpError
 * @extends {Error}
 */
export declare class HttpError extends Error {
    status: number;
    title: string;
    message: string;
    constructor(...errorOptions: Array<number | string | HttpErrorOptions>);
    /**
     * The HTTP Status code
     * Included for compatibility
     *
     * @memberof HttpError
     */
    statusCode: number;
}
//# sourceMappingURL=HttpError.d.ts.map