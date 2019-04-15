# json-http-errors
A Node package that exposes standardized error creation functions and a class, for Express.

## Examples
### Standardized HttpErrors

`json-http-errors` exposes

```ts
import { BadRequest } from 'json-http-errors';

throw new BadRequest('You done messed up, son!');
```

```
Error: You done messed up, son!
    at [eval].ts:1:7
    at Script.runInThisContext (vm.js:124:20)
    ...
  status: 400,
  title: 'Bad Request',
  message: 'You done messed up, son!' }
```

### Generate Standard Errors by Http Status Code
If you don't know the error type up front, but do know the code, use the `createError` function to get a custom class, or a generic one, if the status code can't be matched:

```ts
import { createError } from 'json-http-errors';

throw createError(401, 'OMG!');
```

```
{ Error: OMG!
    at Object.createError
    ...
    status: 401,
    title: 'Unauthorized', message: 'OMG!'
}
```

### Roll your own
Create your own custom Error message using the HttpError class:

```ts
import { HttpError } from 'json-http-errors';

throw new HttpError(401, 'OMG!');
```

```
{ Error: OMG!
    at Object.createError
    ...
    status: 401,
    title: 'Internal Server Error', message: 'OMG!'
}
```

# TypeScript interfaces
Since this project was built in TypeScript, use the exported iterfaces for type checking.

```ts
import { BadRequest, HttpErrorOptions } from 'json-http-errors';

function totallyThrowsABadRequestError(options: HttpErrorOptions) {
  throw new BadRequest(options);
}
```


## Custom HttpClass Errors
The following custom classes are available:
| Http Status Code | Class Name |
| -- | -- |
| 400 | BadRequest |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | NotFound |
| 405 | MethodNotAllowed |
| 406 | NotAcceptable |
| 407 | ProxyAuthenticationRequired |
| 408 | RequestTimeout |
| 409 | Conflict |
| 410 | Gone |
| 411 | LengthRequired |
| 412 | PreconditionFailed |
| 413 | PayloadTooLarge |
| 414 | URITooLong |
| 415 | UnsupportedMediaType |
| 416 | RangeNotSatisfiable |
| 417 | ExpectationFailed |
| 418 | ImATeapot |
| 421 | MisdirectedRequest |
| 422 | UnprocessableEntity |
| 423 | Locked |
| 424 | FailedDependency |
| 426 | TooEarly |
| 426 | UpgradeRequired |
| 428 | PreconditionRequired |
| 429 | TooManyRequests |
| 431 | RequestHeaderFieldsTooLarge |
| 451 | UnavailableForLegalReasons |
| 500 | InternalServerError |
| 501 | NotImplemented |
| 502 | BadGateway |
| 503 | ServiceUnavailable |
| 504 | GatewayTimeout |
| 505 | HTTPVersionNotSupported |
| 506 | VariantAlsoNegotiates |
| 507 | InsufficientStorage |
| 511 | NetworkAuthenticationRequired |