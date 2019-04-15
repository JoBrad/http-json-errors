import { expect } from 'chai';
import { getStatusCode, parseErrorOptions } from '../src/HttpError'

import {
  createError,
  HttpError
} from './index';
const VALID_ERROR_CODES = "400 401 403 404 405 406 407 408 409 410 411 412 413 414 415 416 417 418 421 422 423 424 426 428 429 431 451 500 501 502 503 504 505 506 507 511".split(' ');

import * as AllExports from './index';

const EXPORTED_NAMES = Object.keys(AllExports);

const ERROR_CODES = (() => {
  let errCodes: number[] = [];
  for (let i = 100, max = 700; i < max; i++) {
    errCodes.push(i);
  }
  return errCodes;
})();

/**
 * Converts objects to strings, for display
 *
 * @param {any} obj
 * @returns {string}
 */
function toString(obj: any): string {
  if (Array.isArray(obj) || null === obj) {
    return '' + obj.map(toString);
  } else {
    let typeName = Object.prototype.toString
      .call(obj)
      .replace(/[\[\]]/g, '')
      .split(' ')
      .pop();
    if (typeName === 'undefined' || typeName === 'string') {
      return '' + obj;
    } else {
      return JSON.stringify(obj);
    }
  }
}

describe('json-http-errors#', () => {
  describe('Custom Error Classes', () => {
    VALID_ERROR_CODES.map(errorCode => {
      it(`Should have a Custom HttpError class for error code ${errorCode}`, () => {
        let statusNumber = parseInt(errorCode);
        let errorObject = createError(statusNumber);
        let errorClass = errorObject.constructor;
        expect(errorClass.name).to.not.equal('Error');
        expect(errorObject.status).to.equal(statusNumber);
        expect(errorClass.toString().slice(0, 5)).to.equal('class');
        expect(EXPORTED_NAMES.indexOf(errorClass.name)).to.not.be.undefined;
      });
    });
  });

  describe('getStatusCode => ', () => {
    let parsedValues = ERROR_CODES.map(c => {
      return [getStatusCode(c), getStatusCode(c + .00), getStatusCode('' + (c + .00))];
    });

    it('Should be a function', () => {
      expect(getStatusCode).to.be.a('function');
    });

    it('Should properly parse integer error codes between 100 and 699', () => {
      let badParsing = parsedValues.find((c, i) => {
        return c[0] !== ERROR_CODES[i];
      });
      expect(badParsing).to.be.undefined;
    });

    it('Should properly parse status codes as doubles', () => {
      let badParsing = parsedValues.find((c, i) => {
        return c[1] !== ERROR_CODES[i] + .00;
      });
      expect(badParsing).to.be.undefined;
    });

    it('Should properly parse string status code values', () => {
      let badParsing = parsedValues.find((c, i) => {
        return c[2] !== ERROR_CODES[i];
      });
      expect(badParsing).to.be.undefined;
    });
  });

  describe('parseErrorOptions => ', () => {
    it('Should be a function', () => {
      expect(parseErrorOptions).to.be.a('function');
    });

    let testObjs: Array<[any, any]> = [
      ["abc", { message: "abc" }],
      [{ "foo": "bar", "status": 405 }, { status: 405 }],
      [405, { status: 405 }],
      [[405, "Bad Request"], { status: 405, message: "Bad Request" }],
      [{ name: "MyCustomError", title: "My Custom Error", status: 456, message: "This is a custom error" }, { name: "MyCustomError", title: "My Custom Error", status: 456, message: "This is a custom error" }],
    ];
    testObjs.map(testPair => {
      let [data, expected] = testPair;
      let dataStr = toString(data);
      let expectedStr = toString(expected);
      it(`parseErrorOptions(${dataStr}) => ${expectedStr}`, () => {
        expect(parseErrorOptions(data)).to.deep.equal(expected);
      });
    });

  });

  describe('HttpError => ', () => {
    it('Should be a class', () => {
      expect(HttpError).to.be.a('function');
      expect(HttpError.toString().slice(0, 5)).to.equal('class');
    });

    it('Should create an instance of the Error class', () => {
      let testErr = new HttpError(405);
      expect(testErr).to.be.instanceOf(Error);
    });

    it('Should accept only a number as constructor parameters', () => {
      let testErr = new HttpError(405);
      expect(testErr).to.be.instanceOf(Error);
      expect(testErr.status).to.equal(405);
    });

    it('Should accept a number and a string as constructor parameters', () => {
      let testErr = new HttpError(405, 'Bad shit ahead');
      expect(testErr).to.be.instanceOf(Error);
      expect(testErr.status).to.equal(405);
      expect(testErr.message).to.equal('Bad shit ahead');
    });

    it('Should default to a 500 status, if given an invalid status', () => {
      let testErr = new HttpError(7000, 'Bad shit ahead');
      expect(testErr).to.be.instanceOf(Error);
      expect(testErr.status).to.equal(500);
      expect(testErr.message).to.equal('Bad shit ahead');
    });

    it('Should accept an HttpErrorOptions object as the constructor parameter', () => {
      let testErr = new HttpError({ status: 405, message: 'Bad shit ahead' });
      expect(testErr).to.be.instanceOf(Error);
      expect(testErr.status).to.equal(405);
      expect(testErr.message).to.equal('Bad shit ahead');
    });

    it('Should accept an Error object as the constructor parameter', () => {
      let errorObject = new Error('Bad shit ahead');
      let testErr = new HttpError(errorObject);
      expect(testErr).to.be.instanceOf(Error);
      expect(testErr.status).to.equal(500);
      expect(testErr.message).to.equal('Bad shit ahead');
    });

    it('Should reflect valid properties when given an HttpErrorOptions object as the constructor parameter', () => {
      let testErr = new HttpError({
        name: "MyCustomError",
        title: "My Custom Error",
        status: 405,
        message: "This is a custom error"
      });
      expect(testErr).to.be.instanceOf(Error);
      expect(testErr.name).to.equal('MyCustomError');
      expect(testErr.title).to.equal('My Custom Error');
      expect(testErr.statusCode).to.equal(405);
      expect(testErr.message).to.equal('This is a custom error');
    });

    it('Should be able to set the status using the statusCode property', () => {
      let testErr = new HttpError(411);
      expect(testErr.statusCode).to.equal(411);
      testErr.statusCode = 412;
      expect(testErr.statusCode).to.equal(412);
    });
  });

  describe('createError => ', () => {
    it('Should create an instance of a Custom HttpError class if given a recognized Http status code', () => {
      let testObject = createError(405);
      let comparisonObj = new AllExports.MethodNotAllowed();
      expect(testObject.name).to.equal(comparisonObj.name);
      expect(testObject.status).to.equal(comparisonObj.status);
      expect(testObject.message).to.equal(comparisonObj.message);
    });

    it('Should create a generic HttpError class if given an unrecognized Http status code', () => {
      let testObject = createError(499);
      expect(testObject.name).to.equal('Error');
      expect(testObject.status).to.equal(499);
      expect(testObject.title).to.equal('Internal Server Error');
    });
  });

});
