// Type definitions for http-json-errors
// Project: https://github.com/JoBrad/http-json-errors
// Definitions by: Joseph T. Bradley
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export { HttpError, HttpErrorOptions } from './HttpError';
import { HttpError, HttpErrorOptions } from './HttpError';
/**
 * Create a new HttpError with the given statusCode and message
 *
 * @export
 * @param {number} statusCode
 * @param {string} message
 * @returns {HttpError}
 */
export declare function createError(status: number, message?: string): HttpError;
/**
 * Bad Request
 *
 * The server cannot or will not process the request
 * because the received syntax is invalid, nonsensical, or
 * exceeds some limitation on what the server is willing
 * to process.
 *
 */
export declare class BadRequest extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Unauthorized
 *
 * The request has not been applied because it lacks valid
 * authentication credentials for the target resource.
 *
 */
export declare class Unauthorized extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Forbidden
 *
 * The server understood the request but refuses to
 * authorize it.
 *
 */
export declare class Forbidden extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Not Found
 *
 * The origin server did not find a current representation
 * for the target resource or is not willing to disclose
 * that one exists.
 *
 */
export declare class NotFound extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Method Not Allowed
 *
 * The method specified in the request-line is known by
 * the origin server but not supported by the target
 * resource.
 *
 */
export declare class MethodNotAllowed extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Not Acceptable
 *
 * The target resource does not have a current
 * representation that would be acceptable to the user
 * agent, according to the proactive negotiation header
 * fields received in the request, and the server is
 * unwilling to supply a default representation.
 *
 */
export declare class NotAcceptable extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Proxy Authentication Required
 *
 * Is similar to 401 (Unauthorized), but the client needs
 * to authenticate itself in order to use a proxy.
 *
 */
export declare class ProxyAuthenticationRequired extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Request Timeout
 *
 * The server did not receive a complete request message
 * within the time that it was prepared to wait.
 *
 */
export declare class RequestTimeout extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Conflict
 *
 * The request could not be completed due to a conflict
 * with the current state of the resource.
 *
 */
export declare class Conflict extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Gone
 *
 * Indicates that access to the target resource is no
 * longer available at the origin server and that this
 * condition is likely to be permanent.
 *
 */
export declare class Gone extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Length Required
 *
 * The server refuses to accept the request without a
 * defined Content-Length.
 *
 */
export declare class LengthRequired extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Precondition Failed
 *
 * Indicates that one or more preconditions given in the
 * request header fields evaluated to false when tested on
 * the server.
 *
 */
export declare class PreconditionFailed extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Payload Too Large
 *
 * The server is refusing to process a request because the
 * request payload is larger than the server is willing or
 * able to process.
 *
 */
export declare class PayloadTooLarge extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * URI Too Long
 *
 * The server is refusing to service the request because
 * the request-target is longer than the server is willing
 * to interpret.
 *
 */
export declare class URITooLong extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Unsupported Media Type
 *
 * The origin server is refusing to service the request
 * because the payload is in a format not supported by the
 * target resource for this method.
 *
 */
export declare class UnsupportedMediaType extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Range Not Satisfiable
 *
 * Indicates that none of the ranges in the request's
 * Range header field overlap the current extent of the
 * selected resource or that the set of ranges requested
 * has been rejected due to invalid ranges or an excessive
 * request of small or overlapping ranges.
 *
 */
export declare class RangeNotSatisfiable extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Expectation Failed
 *
 * The expectation given in the request's Expect header
 * field could not be met by at least one of the inbound
 * servers.
 *
 */
export declare class ExpectationFailed extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * I'm a teapot
 *
 * Any attempt to brew coffee with a teapot should result
 * in the error code 418 I'm a teapot.
 *
 */
export declare class ImATeapot extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Misdirected request
 *
 * The request was directed at a server that is not able
 * to produce a response.  This can be sent by a server
 * that is not configured to produce responses for the
 * combination of scheme and authority that are included
 * in the request URI.
 *
 */
export declare class MisdirectedRequest extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Unprocessable Entity
 *
 * Means the server understands the content type of the
 * request entity (hence a 415(Unsupported Media Type)
 * status code is inappropriate), and the syntax of the
 * request entity is correct (thus a 400 (Bad Request)
 * status code is inappropriate) but was unable to process
 * the contained instructions.
 *
 */
export declare class UnprocessableEntity extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Locked
 *
 * Means the source or destination resource of a method is
 * locked.
 *
 */
export declare class Locked extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Failed Dependency
 *
 * Means that the method could not be performed on the
 * resource because the requested action depended on
 * another action and that action failed.
 *
 */
export declare class FailedDependency extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Too Early
 *
 * The server is unwilling to risk processing a request
 * that might be replayed
 *
 */
export declare class TooEarly extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Upgrade Required
 *
 * The server refuses to perform the request using the
 * current protocol but might be willing to do so after
 * the client upgrades to a different protocol.
 *
 */
export declare class UpgradeRequired extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Precondition Required
 *
 * The origin server requires the request to be
 * conditional.
 *
 */
export declare class PreconditionRequired extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Too Many Requests
 *
 * The user has sent too many requests in a given amount
 * of time ("rate limiting").
 *
 */
export declare class TooManyRequests extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Request Header Fields Too Large
 *
 * The server is unwilling to process the request because
 * its header fields are too large.
 *
 */
export declare class RequestHeaderFieldsTooLarge extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Unavailable For Legal Reasons
 *
 * This request may not be serviced in the Roman Province
 * of Judea due to the Lex Julia Majestatis, which
 * disallows access to resources hosted on servers deemed
 * to be operated by the People's Front of Judea.
 *
 */
export declare class UnavailableForLegalReasons extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Internal Server Error
 *
 * The server has encountered a situation it doesn't know
 * how to handle.
 *
 */
export declare class InternalServerError extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Not Implemented
 *
 * The request method is not supported by the server and
 * cannot be handled.
 *
 */
export declare class NotImplemented extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Bad Gateway
 *
 * This error response means that the server, while
 * working as a gateway to get a response needed to handle
 * the request, got an invalid response.
 *
 */
export declare class BadGateway extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Service Unavailable
 *
 * The server is not ready to handle the request.
 *
 */
export declare class ServiceUnavailable extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Gateway Time-out
 *
 * This error response is given when the server is acting
 * as a gateway and cannot get a response from the up-
 * stream server in time.
 *
 */
export declare class GatewayTimeout extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * HTTP Version Not Supported
 *
 * The HTTP version used in the request is not supported
 * by the server.
 *
 */
export declare class HTTPVersionNotSupported extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Variant Also Negotiates
 *
 * The server has an internal configuration error: the
 * chosen variant resource is configured to engage in
 * transparent content negotiation itself, and is
 * therefore not a proper end point in the negotiation
 * process.
 *
 */
export declare class VariantAlsoNegotiates extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Insufficient Storage
 *
 * Means the method could not be performed on the resource
 * because the server is unable to store the
 * representation needed to successfully complete the
 * request.
 *
 */
export declare class InsufficientStorage extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
/**
 * Network Authentication Required
 *
 * The client needs to authenticate to gain network
 * access.
 *
 */
export declare class NetworkAuthenticationRequired extends HttpError implements HttpErrorOptions {
    constructor(...options: Array<number | string | HttpErrorOptions>);
}
//# sourceMappingURL=index.d.ts.map