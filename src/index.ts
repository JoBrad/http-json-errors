// tslint:disable: max-line-length
export { HttpError, HttpErrorOptions } from './HttpError'
import {
  getStatusCode, HttpError, HttpErrorOptions, parseErrorOptions,
} from './HttpError'

// Contains error code -> class mapping
const CODE_CLASSES = {}

/**
 * Create a new HttpError with the given statusCode and message
 *
 * @export
 * @param {number} statusCode
 * @param {string} message
 * @returns {HttpError}
 */
export function createError(status: number, message?: string): HttpError {
  const statusCode = getStatusCode(status)
  if (statusCode && CODE_CLASSES['' + statusCode]) {
    return new CODE_CLASSES['' + statusCode](message)
  } else {
    return new HttpError({statusCode, message})
  }
}

// Extended classes for specific errors
////////////////////////////////////////

/**
 * Bad Request
 *
 * The server cannot or will not process the request
 * because the received syntax is invalid, nonsensical, or
 * exceeds some limitation on what the server is willing
 * to process.
 *
 */
export class BadRequest extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number | string | HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 400,
      message: 'The server cannot or will not process the request because the received syntax is invalid, nonsensical, or exceeds some limitation on what the server is willing to process.',
      title: 'Bad Request',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400',
    }, ...options))
  }
}
CODE_CLASSES['400'] = BadRequest

/**
 * Unauthorized
 *
 * The request has not been applied because it lacks valid
 * authentication credentials for the target resource.
 *
 */
export class Unauthorized extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 401,
      message: 'The request has not been applied because it lacks valid authentication credentials for the target resource.',
      title: 'Unauthorized',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401',
    }, ...options))
  }
}
CODE_CLASSES['401'] = Unauthorized

/**
 * Forbidden
 *
 * The server understood the request but refuses to
 * authorize it.
 *
 */
export class Forbidden extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 403,
      message: 'The server understood the request but refuses to authorize it.',
      title: 'Forbidden',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403',
    }, ...options))
  }
}
CODE_CLASSES['403'] = Forbidden

/**
 * Not Found
 *
 * The origin server did not find a current representation
 * for the target resource or is not willing to disclose
 * that one exists.
 *
 */
export class NotFound extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 404,
      message: 'The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.',
      title: 'Not Found',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404',
    }, ...options))
  }
}
CODE_CLASSES['404'] = NotFound

/**
 * Method Not Allowed
 *
 * The method specified in the request-line is known by
 * the origin server but not supported by the target
 * resource.
 *
 */
export class MethodNotAllowed extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 405,
      message: 'The method specified in the request-line is known by the origin server but not supported by the target resource.',
      title: 'Method Not Allowed',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405',
    }, ...options))
  }
}
CODE_CLASSES['405'] = MethodNotAllowed

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
export class NotAcceptable extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 406,
      message: 'The target resource does not have a current representation that would be acceptable to the user agent, according to the proactive negotiation header fields received in the request, and the server is unwilling to supply a default representation.',
      title: 'Not Acceptable',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406',
    }, ...options))
  }
}
CODE_CLASSES['406'] = NotAcceptable

/**
 * Proxy Authentication Required
 *
 * Is similar to 401 (Unauthorized), but the client needs
 * to authenticate itself in order to use a proxy.
 *
 */
export class ProxyAuthenticationRequired extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 407,
      message: 'Is similar to 401 (Unauthorized), but the client needs to authenticate itself in order to use a proxy.',
      title: 'Proxy Authentication Required',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/407',
    }, ...options))
  }
}
CODE_CLASSES['407'] = ProxyAuthenticationRequired

/**
 * Request Timeout
 *
 * The server did not receive a complete request message
 * within the time that it was prepared to wait.
 *
 */
export class RequestTimeout extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 408,
      message: 'The server did not receive a complete request message within the time that it was prepared to wait.',
      title: 'Request Timeout',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408',
    }, ...options))
  }
}
CODE_CLASSES['408'] = RequestTimeout

/**
 * Conflict
 *
 * The request could not be completed due to a conflict
 * with the current state of the resource.
 *
 */
export class Conflict extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 409,
      message: 'The request could not be completed due to a conflict with the current state of the resource.',
      title: 'Conflict',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409',
    }, ...options))
  }
}
CODE_CLASSES['409'] = Conflict

/**
 * Gone
 *
 * Indicates that access to the target resource is no
 * longer available at the origin server and that this
 * condition is likely to be permanent.
 *
 */
export class Gone extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 410,
      message: 'Indicates that access to the target resource is no longer available at the origin server and that this condition is likely to be permanent.',
      title: 'Gone',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/410',
    }, ...options))
  }
}
CODE_CLASSES['410'] = Gone

/**
 * Length Required
 *
 * The server refuses to accept the request without a
 * defined Content-Length.
 *
 */
export class LengthRequired extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 411,
      message: 'The server refuses to accept the request without a defined Content-Length.',
      title: 'Length Required',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/411',
    }, ...options))
  }
}
CODE_CLASSES['411'] = LengthRequired

/**
 * Precondition Failed
 *
 * Indicates that one or more preconditions given in the
 * request header fields evaluated to false when tested on
 * the server.
 *
 */
export class PreconditionFailed extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 412,
      message: 'Indicates that one or more preconditions given in the request header fields evaluated to false when tested on the server.',
      title: 'Precondition Failed',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/412',
    }, ...options))
  }
}
CODE_CLASSES['412'] = PreconditionFailed

/**
 * Payload Too Large
 *
 * The server is refusing to process a request because the
 * request payload is larger than the server is willing or
 * able to process.
 *
 */
export class PayloadTooLarge extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 413,
      message: 'The server is refusing to process a request because the request payload is larger than the server is willing or able to process.',
      title: 'Payload Too Large',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/413',
    }, ...options))
  }
}
CODE_CLASSES['413'] = PayloadTooLarge

/**
 * URI Too Long
 *
 * The server is refusing to service the request because
 * the request-target is longer than the server is willing
 * to interpret.
 *
 */
export class URITooLong extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 414,
      message: 'The server is refusing to service the request because the request-target is longer than the server is willing to interpret.',
      title: 'URI Too Long',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/414',
    }, ...options))
  }
}
CODE_CLASSES['414'] = URITooLong

/**
 * Unsupported Media Type
 *
 * The origin server is refusing to service the request
 * because the payload is in a format not supported by the
 * target resource for this method.
 *
 */
export class UnsupportedMediaType extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 415,
      message: 'The origin server is refusing to service the request because the payload is in a format not supported by the target resource for this method.',
      title: 'Unsupported Media Type',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415',
    }, ...options))
  }
}
CODE_CLASSES['415'] = UnsupportedMediaType

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
export class RangeNotSatisfiable extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 416,
      message: 'Indicates that none of the ranges in the request\'s Range header field overlap the current extent of the selected resource or that the set of ranges requested has been rejected due to invalid ranges or an excessive request of small or overlapping ranges.',
      title: 'Range Not Satisfiable',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/416',
    }, ...options))
  }
}
CODE_CLASSES['416'] = RangeNotSatisfiable

/**
 * Expectation Failed
 *
 * The expectation given in the request's Expect header
 * field could not be met by at least one of the inbound
 * servers.
 *
 */
export class ExpectationFailed extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 417,
      message: 'The expectation given in the request\'s Expect header field could not be met by at least one of the inbound servers.',
      title: 'Expectation Failed',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/417',
    }, ...options))
  }
}
CODE_CLASSES['417'] = ExpectationFailed

/**
 * I'm a teapot
 *
 * Any attempt to brew coffee with a teapot should result
 * in the error code 418 I'm a teapot.
 *
 */
export class ImATeapot extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 418,
      message: 'Any attempt to brew coffee with a teapot should result in the error code 418 I\'m a teapot.',
      title: 'I\'m a teapot',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418',
    }, ...options))
  }
}
CODE_CLASSES['418'] = ImATeapot

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
export class MisdirectedRequest extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 421,
      message: 'The request was directed at a server that is not able to produce a response.  This can be sent by a server that is not configured to produce responses for the combination of scheme and authority that are included in the request URI.',
      title: 'Misdirected request',
      type: 'https://tools.ietf.org/html/rfc7540#section-9.1.2',
    }, ...options))
  }
}
CODE_CLASSES['421'] = MisdirectedRequest

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
export class UnprocessableEntity extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 422,
      message: 'Means the server understands the content type of the request entity (hence a 415(Unsupported Media Type) status code is inappropriate), and the syntax of the request entity is correct (thus a 400 (Bad Request) status code is inappropriate) but was unable to process the contained instructions.',
      title: 'Unprocessable Entity',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422',
    }, ...options))
  }
}
CODE_CLASSES['422'] = UnprocessableEntity

/**
 * Locked
 *
 * Means the source or destination resource of a method is
 * locked.
 *
 */
export class Locked extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 423,
      message: 'Means the source or destination resource of a method is locked.',
      title: 'Locked',
      type: 'https://tools.ietf.org/html/rfc2518#section-10.4',
    }, ...options))
  }
}
CODE_CLASSES['423'] = Locked

/**
 * Failed Dependency
 *
 * Means that the method could not be performed on the
 * resource because the requested action depended on
 * another action and that action failed.
 *
 */
export class FailedDependency extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 424,
      message: 'Means that the method could not be performed on the resource because the requested action depended on another action and that action failed.',
      title: 'Failed Dependency',
      type: 'https://tools.ietf.org/html/rfc2518#section-10.5',
    }, ...options))
  }
}
CODE_CLASSES['424'] = FailedDependency

/**
 * Too Early
 *
 * The server is unwilling to risk processing a request
 * that might be replayed
 *
 */
export class TooEarly extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 426,
      message: 'The server is unwilling to risk processing a request that might be replayed',
      title: 'Too Early',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/425',
    }, ...options))
  }
}
CODE_CLASSES['426'] = TooEarly

/**
 * Upgrade Required
 *
 * The server refuses to perform the request using the
 * current protocol but might be willing to do so after
 * the client upgrades to a different protocol.
 *
 */
export class UpgradeRequired extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 426,
      message: 'The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol.',
      title: 'Upgrade Required',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/426',
    }, ...options))
  }
}
CODE_CLASSES['426'] = UpgradeRequired

/**
 * Precondition Required
 *
 * The origin server requires the request to be
 * conditional.
 *
 */
export class PreconditionRequired extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 428,
      message: 'The origin server requires the request to be conditional.',
      title: 'Precondition Required',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/428',
    }, ...options))
  }
}
CODE_CLASSES['428'] = PreconditionRequired

/**
 * Too Many Requests
 *
 * The user has sent too many requests in a given amount
 * of time ("rate limiting").
 *
 */
export class TooManyRequests extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 429,
      message: 'The user has sent too many requests in a given amount of time.',
      title: 'Too Many Requests',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429',
    }, ...options))
  }
}
CODE_CLASSES['429'] = TooManyRequests

/**
 * Request Header Fields Too Large
 *
 * The server is unwilling to process the request because
 * its header fields are too large.
 *
 */
export class RequestHeaderFieldsTooLarge extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 431,
      message: 'The server is unwilling to process the request because its header fields are too large.',
      title: 'Request Header Fields Too Large',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/431',
    }, ...options))
  }
}
CODE_CLASSES['431'] = RequestHeaderFieldsTooLarge

/**
 * Unavailable For Legal Reasons
 *
 * This request may not be serviced in the Roman Province
 * of Judea due to the Lex Julia Majestatis, which
 * disallows access to resources hosted on servers deemed
 * to be operated by the People's Front of Judea.
 *
 */
export class UnavailableForLegalReasons extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 451,
      message: 'This request may not be serviced in the Roman Province of Judea due to the Lex Julia Majestatis, which disallows access to resources hosted on servers deemed to be operated by the People\'s Front of Judea.',
      title: 'Unavailable For Legal Reasons',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/451',
    }, ...options))
  }
}
CODE_CLASSES['451'] = UnavailableForLegalReasons

/**
 * Internal Server Error
 *
 * The server has encountered a situation it doesn't know
 * how to handle.
 *
 */
export class InternalServerError extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 500,
      message: 'The server has encountered a situation it doesn\'t know how to handle.',
      title: 'Internal Server Error',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500',
    }, ...options))
  }
}
CODE_CLASSES['500'] = InternalServerError

/**
 * Not Implemented
 *
 * The request method is not supported by the server and
 * cannot be handled.
 *
 */
export class NotImplemented extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 501,
      message: 'The request method is not supported by the server and cannot be handled.',
      title: 'Not Implemented',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501',
    }, ...options))
  }
}
CODE_CLASSES['501'] = NotImplemented

/**
 * Bad Gateway
 *
 * This error response means that the server, while
 * working as a gateway to get a response needed to handle
 * the request, got an invalid response.
 *
 */
export class BadGateway extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 502,
      message: 'This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.',
      title: 'Bad Gateway',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502',
    }, ...options))
  }
}
CODE_CLASSES['502'] = BadGateway

/**
 * Service Unavailable
 *
 * The server is not ready to handle the request.
 *
 */
export class ServiceUnavailable extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 503,
      message: 'The server is not ready to handle the request.',
      title: 'Service Unavailable',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503',
    }, ...options))
  }
}
CODE_CLASSES['503'] = ServiceUnavailable

/**
 * Gateway Time-out
 *
 * This error response is given when the server is acting
 * as a gateway and cannot get a response from the up-
 * stream server in time.
 *
 */
export class GatewayTimeout extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 504,
      message: 'This error response is given when the server is acting as a gateway and cannot get a response from the up-stream server in time.',
      title: 'Gateway Time-out',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504',
    }, ...options))
  }
}
CODE_CLASSES['504'] = GatewayTimeout

/**
 * HTTP Version Not Supported
 *
 * The HTTP version used in the request is not supported
 * by the server.
 *
 */
export class HTTPVersionNotSupported extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 505,
      message: 'The HTTP version used in the request is not supported by the server.',
      title: 'HTTP Version Not Supported',
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/505',
    }, ...options))
  }
}
CODE_CLASSES['505'] = HTTPVersionNotSupported

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
export class VariantAlsoNegotiates extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 506,
      message: 'The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.',
      title: 'Variant Also Negotiates',
      type: 'https://tools.ietf.org/html/rfc2295#section-8.1',
    }, ...options))
  }
}
CODE_CLASSES['506'] = VariantAlsoNegotiates

/**
 * Insufficient Storage
 *
 * Means the method could not be performed on the resource
 * because the server is unable to store the
 * representation needed to successfully complete the
 * request.
 *
 */
export class InsufficientStorage extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 507,
      message: 'Means the method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.',
      title: 'Insufficient Storage',
      type: 'https://tools.ietf.org/html/rfc2518#section-10.6',
    }, ...options))
  }
}
CODE_CLASSES['507'] = InsufficientStorage

/**
 * Network Authentication Required
 *
 * The client needs to authenticate to gain network
 * access.
 *
 */
export class NetworkAuthenticationRequired extends HttpError implements HttpErrorOptions {
  constructor(...options: Array<number|string|HttpErrorOptions>) {
    super(parseErrorOptions({
      statusCode: 511,
      message: 'The client needs to authenticate to gain network access.',
      title: 'Network Authentication Required',
      type: 'https://tools.ietf.org/html/rfc6585#section-6',
    }, ...options))
  }
}
CODE_CLASSES['511'] = NetworkAuthenticationRequired
