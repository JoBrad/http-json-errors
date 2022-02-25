![Tests](https://github.com/JoBrad/http-json-errors/workflows/Tests/badge.svg?branch=master)

# http-json-errors
A Node package that exposes standardized error creation functions and a class. This package was written for Express but doesn't have any dependencies on Express or any other package, except for development.

## Example

```ts
import { BadRequest } from 'http-json-errors'

throw new BadRequest('You done messed up, son!')
```

```js
{
  isHttpError: true,
  statusCode: 400,
  title: 'Bad Request',
  message: 'You done messed up, son!',
  type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400',
  body: {
    error_text: 'You done messed up, son!'
  }
}
```

### Generate Standard Errors by Http Status Code
If you don't know the error type up front, but do know the code, use the `createError` function to get a custom class, or a generic one, if the status code can't be matched:

```ts
import { createError } from 'http-json-errors'

throw createError(401, 'OMG!')
```

```js
{
  isHttpError: true,
  statusCode: 401,
  title: 'Unauthorized',
  message: 'OMG!',
  type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401',
  body: {
    error_text: 'OMG!'
  }
}
```

### Roll your own
Create your own custom Error message using the HttpError class:

```ts
import { HttpError } from 'http-json-errors'

throw new HttpError(401, {message: 'OMG!', body: { error_code: 'OMG!', error_text: 'I wish you wouldn\'t have done that.' } });
```

```js
{
  isHttpError: true,
  statusCode: 401,
  title: 'Internal Server Error',
  message: 'OMG!',
  body: {
    error_code: 'OMG!',
    error_text: "I wish you wouldn't have done that."
  }
}
```

# TypeScript + ES6
This project was built in TypeScript and contains exported interfaces and type definitions for your convenience. The module is designed to use ES6 imports.

```ts
// Check out the Custom HTTP Error Classes section for a full list of custom classes!
import { BadRequest, HttpErrorOptions } from 'http-json-errors'

function totallyThrowsABadRequestError(options: HttpErrorOptions) {
  throw new BadRequest(options)
}
totallyThrowsABadRequestError('The user did something completely new that NOONE foresaw')
```

```js
{
  isHttpError: true,
  statusCode: 400,
  title: 'Bad Request',
  message: 'The user did something completely new that NOONE foresaw',
  type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400',
  body: {
    error_text: 'The user did something completely new that NOONE foresaw'
  }
}
```

# Control over responses
Note that in the examples above the returned object contains both Error detail and a response body that can be returned to the user. The body defaults to an object with the format below. Any stand-alone strings will be assigned to the `message` property, and if the status is < 500, this will be copied to the body.

```ts
import { HttpError } from 'http-json-errors'

throw new HttpError(400, 'Bad stuff happened')
```

```js
{
  isHttpError: true,
  statusCode: 400,
  title: 'Internal Server Error',
  message: 'Bad stuff happened',
  body: { error_text: 'Bad stuff happened' }
}
```

If the error code is >= 500, you should provide a body by passing an HttpErrorOptions object (one of the exported TypeScript interfaces). Note that any options provided in this way overwrite the default options.

```ts
import { HttpError } from 'http-json-errors'

throw new HttpError(500, 'Bad stuff happened', {body: {error_code: 'Why', error_description: 'You did the thing you should not have done' }})
```

```js
{
  isHttpError: true,
  statusCode: 500,
  title: 'Internal Server Error',
  message: 'Bad stuff happened',
  body: {
    error_code: 'Why',
    error_description: 'You did the thing you should not have done'
  }
}
```

```ts
new BadRequest('Bad stuff happened', {body: 'That was not good'})
```
```js

  isHttpError: true,
  statusCode: 400,
  title: 'Bad Request',
  message: 'Bad stuff happened',
  type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400',
  body: 'That was not good'
}
```

```ts
import { NotImplemented } from 'http-json-errors'

throw new NotImplemented({body: {excuse: 'I just write the code. THEY designed the damn thing'}})
```
```js
{
  isHttpError: true,
  statusCode: 501,
  title: 'Not Implemented',
  message: 'The request method is not supported by the server and cannot be handled.',
  type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501',
  body: { excuse: 'I just write the code. THEY designed the damn thing' }
}
```

## Custom HTTP Error Classes
The following custom classes are available:

HTTP Status Code | Exported Class Name
--- | ----------------------------
400 | BadRequest
401 | Unauthorized
403 | Forbidden
404 | NotFound
405 | MethodNotAllowed
406 | NotAcceptable
407 | ProxyAuthenticationRequired
408 | RequestTimeout
409 | Conflict
410 | Gone
411 | LengthRequired
412 | PreconditionFailed
413 | PayloadTooLarge
414 | URITooLong
415 | UnsupportedMediaType
416 | RangeNotSatisfiable
417 | ExpectationFailed
418 | ImATeapot
421 | MisdirectedRequest
422 | UnprocessableEntity
423 | Locked
424 | FailedDependency
425 | TooEarly
426 | UpgradeRequired
428 | PreconditionRequired
429 | TooManyRequests
431 | RequestHeaderFieldsTooLarge
451 | UnavailableForLegalReasons
500 | InternalServerError
501 | NotImplemented
502 | BadGateway
503 | ServiceUnavailable
504 | GatewayTimeout
505 | HTTPVersionNotSupported
506 | VariantAlsoNegotiates
507 | InsufficientStorage
511 | NetworkAuthenticationRequired


# Changelog

Version | Notes
--- | ---
1.2.0 | Initial release: Why start at 1?
1.2.1 | Updates to Readme; Added type file headers; Added .editorconfig;
1.2.2 | Fixed name in readme
1.2.3 | Added body and isHttpError properties to HttpError class; Security update for mocha; Updated Readme with new content and more examples
1.2.4 | Changed statusCode to primary status property to be in line with NodeJS; status is now just a read-only property; Updated tests to reflect change
1.2.5 | A string passed to a custom class will be set as the body error_text value. Updated examples to reflect the change. Updated dev dependency versions.
1.2.6 | Developer environment updates: updated to mocha@7.2.0; Removed all implicit `any` values; replaced object with Record<string, any>; migrated from tslint to eslint; added VSCode settings.
1.2.7-1.2.8 | Updates to NPM package
1.2.9 | Updated mocha to address security advisory: https://github.com/advisories/GHSA-p9pc-299p-vxgp;
1.2.10 | Updated typo for status 425
1.2.11 | Fixed a bug where a value starting with 3 numbers would be mis-construed as a status code.
1.2.12 | Updated mocha and chai to address vulnerabilities.
