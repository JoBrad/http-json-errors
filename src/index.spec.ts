/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable no-duplicate-imports */
import { expect } from 'chai'
import { getStatusCode, parseErrorOptions } from './HttpError'

import {
  BadRequest, createError, HttpError,
} from './index'
import * as AllExports from './index'
const VALID_ERROR_CODES = [
  400, 401, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412,
  413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 425, 426,
  428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 511,
]
const EXPORTED_NAMES = Object.keys(AllExports)
const ERROR_CODES = Array.from(Array(600), (e, i) => i + 100)
// eslint-disable-line max-len
const DEFAULT_ERROR_MESSAGE = 'The server encountered an unexpected condition that prevented it from fulfilling the request'

/**
 * Converts objects to strings, for display
 *
 * @param {any} obj
 * @returns {string}
 */
const toString = (obj: any): string => {
  if (Array.isArray(obj) || null === obj) {
    return '' + obj.map(toString)
  } else {
    const typeName = Object.prototype.toString
      .call(obj)
      .replace(/[\[\]]/g, '')
      .split(' ')
      .pop()
    if (typeName === 'undefined' || typeName === 'string') {
      return '' + obj
    } else {
      return JSON.stringify(obj)
    }
  }
}

describe('json-http-errors#', () => {
  describe('Custom Error Classes', () => {
    it('Should have a Custom HttpError class for error codes 400 - 511', () => {
    VALID_ERROR_CODES.map(statusNumber => {
        const errorObject = createError(statusNumber)
        const errorClass = errorObject.constructor
        const errorClassName = errorClass.name
        expect(errorClassName).to.not.equal('Error')
        expect(errorObject.statusCode).to.equal(statusNumber)
        expect(errorClass.toString().slice(0, 5)).to.equal('class')
        expect(EXPORTED_NAMES.indexOf(errorClassName)).to.be.greaterThan(-1)
      })
    })
  })

  describe('getStatusCode => ', () => {
    const parsedValues = ERROR_CODES.map(c => {
      return [getStatusCode(c), getStatusCode(c + .00), getStatusCode('' + (c + .00))]
    })

    it('Should be a function', () => {
      expect(getStatusCode).to.be.a('function')
    })

    it('Should properly parse integer error codes between 100 and 699', () => {
      const badParsing = parsedValues.find((c, i) => {
        return c[0] !== ERROR_CODES[i]
      })

      expect(badParsing).to.be.undefined
    })

    it('Should properly parse status codes as doubles', () => {
      const badParsing = parsedValues.find((c, i) => {
        return c[1] !== ERROR_CODES[i] + .00
      })
      expect(badParsing).to.be.undefined
    })

    it('Should properly parse string status code values', () => {
      const badParsing = parsedValues.find((c, i) => {
        return c[2] !== ERROR_CODES[i]
      })
      expect(badParsing).to.be.undefined
    })
  })

  describe('parseErrorOptions => ', () => {
    it('Should be a function', () => {
      expect(parseErrorOptions).to.be.a('function')
    })
    const name = 'MyCustomError'
    const title = 'My Custom Error'
    const message = 'This is a custom error'
    const statusCode = 456

    const testObjs: Array<[any, any]> = [
      [
        'abc',
        { message: 'abc' },
      ],
      [
        { foo: 'bar', statusCode: 405 },
        { statusCode: 405 },
      ],
      [
        405,
        { statusCode: 405 },
      ],
      [
        [405, 'Bad Request'],
        { statusCode: 405, message: 'Bad Request' },
      ],
      [
        {
          body: { error_text: message},
          message, name, statusCode, title,
        },
        {
          body: { error_text: message},
          message, name, title, statusCode,
        },
      ],
      [
        {
          body: message,
          name, title, statusCode, message,
        },
        {
          body: message,
          name, title, statusCode, message,
        },
      ],
      [
        { name, title, statusCode, message },
        {
          name, title, statusCode, message,
        },
      ],
    ]
    testObjs.map(testPair => {
      const [data, expected] = testPair
      const dataStr = toString(data)
      const expectedStr = toString(expected)
      it(`parseErrorOptions(${dataStr}) => ${expectedStr}`, () => {
        const actual = Array.isArray(data)
          ? parseErrorOptions(...data)
          : parseErrorOptions(data)
        expect(actual).to.deep.equal(expected)
      })
    })

  })

  describe('HttpError => ', () => {
    it('Should be a class', () => {
      expect(HttpError).to.be.a('function')
      expect(HttpError.toString().slice(0, 5)).to.equal('class')
    })

    it('Should create an instance of the Error class', () => {
      const testErr = new HttpError(405)
      expect(testErr).to.be.instanceOf(Error)
    })

    it('Should accept only a number as constructor parameters', () => {
      const testErr = new HttpError(405)
      expect(testErr).to.be.instanceOf(Error)
      expect(testErr.statusCode).to.equal(405)
    })

    it('Should accept a number and a string as constructor parameters', () => {
      const testErr = new HttpError(405, 'Bad shit ahead')
      expect(testErr).to.be.instanceOf(Error)
      expect(testErr.statusCode).to.equal(405)
      expect(testErr.message).to.equal('Bad shit ahead')
      expect(testErr.body).to.deep.equal({error_text: 'Bad shit ahead'})
    })

    it('Should set a 500 error body if the status code is >= 500', () => {
      const testErr = new HttpError(500)
      expect(testErr).to.be.instanceOf(Error)
      expect(testErr.statusCode).to.equal(500)
      expect(testErr.body).to.be.undefined
    })

    it('Should default to a 500 status, if given an invalid status', () => {
      const testErr = new HttpError(7000)
      expect(testErr).to.be.instanceOf(Error)
      expect(testErr.statusCode).to.equal(500)
      expect(testErr.message).to.equal(DEFAULT_ERROR_MESSAGE)
    })

    it('Should accept an HttpErrorOptions object as the constructor parameter', () => {
      const testErr = new HttpError({ statusCode: 405, message: 'Bad shit ahead' })
      expect(testErr).to.be.instanceOf(Error)
      expect(testErr.statusCode).to.equal(405)
      expect(testErr.message).to.equal('Bad shit ahead')
    })

    it('Should accept an Error object as the constructor parameter', () => {
      const errorObject = new Error('Bad shit ahead')
      const testErr = new HttpError(errorObject)
      expect(testErr).to.be.instanceOf(Error)
      expect(testErr.statusCode).to.equal(500)
      expect(testErr.message).to.equal('Bad shit ahead')
    })

    it('Should reflect valid properties when given an HttpErrorOptions object as the constructor parameter', () => {
      const testErr = new HttpError({
        message: 'This is a custom error',
        name: 'MyCustomError',
        statusCode: 405,
        title: 'My Custom Error',
      })
      expect(testErr).to.be.instanceOf(Error)
      expect(testErr.name).to.equal('MyCustomError')
      expect(testErr.title).to.equal('My Custom Error')
      expect(testErr.statusCode).to.equal(405)
      expect(testErr.message).to.equal('This is a custom error')
      expect(testErr.body).to.deep.equal({error_text: 'This is a custom error'})
    })

    it('Should set the body text if given a string in the constructor of a custom class', () => {
      const testErr = new BadRequest('WTF are you doing?')
      console.log(JSON.stringify(testErr))
      expect(testErr).to.be.instanceOf(Error)
      expect(testErr.name).to.equal('Error')
      expect(testErr.title).to.equal('Bad Request')
      expect(testErr.statusCode).to.equal(400)
      expect(testErr.message).to.equal('WTF are you doing?')
      expect(testErr.body).to.deep.equal({error_text: 'WTF are you doing?'})
    })

    it('Should be able to set the status using the statusCode property', () => {
      const testErr = new HttpError(411)
      expect(testErr.statusCode).to.equal(411)
      testErr.statusCode = 412
      expect(testErr.statusCode).to.equal(412)
    })
  })

  describe('createError => ', () => {
    it('Should create an instance of a Custom HttpError class if given a recognized Http status code', () => {
      const testObject = createError(405)
      const comparisonObj = new AllExports.MethodNotAllowed()
      expect(testObject.name).to.equal(comparisonObj.name)
      expect(testObject.statusCode).to.equal(comparisonObj.statusCode)
      expect(testObject.message).to.equal(comparisonObj.message)
    })

    it('Should create a generic HttpError class if given an unrecognized Http status code', () => {
      const testObject = createError(499)
      expect(testObject.name).to.equal('Error')
      expect(testObject.statusCode).to.equal(499)
      expect(testObject.title).to.equal('Internal Server Error')
    })
  })

})
