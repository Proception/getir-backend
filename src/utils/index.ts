import { Request, Response, NextFunction } from 'express';
import { ResponseObject } from '../interfaces/index';
import {validationResult } from 'express-validator';

const errorCodes = {
  0: "Success",
  1: "Method Not Allowed",
  2: "Internal Server Error",
  3: "Requested Resource Not Available",
  4: "Validation Error"
}

/**
 * 
 * @name notFound
 * @param {object} req
 * @param {object} res
 * @param {function} NextFunction
 * @description handles Resource not found errors
 */
const notFound = (req: Request,res: Response) => {
  res.status(404).send(ApiResponse({code: 3, msg: errorCodes[3]}))
}

/**
 * 
 * @name catchAll
 * @param {object} req
 * @param {object} res
 * @param {function} NextFunction
 * @description Catches route errors
 */
const catchAll = (err: Error, req: Request,res: Response, next: NextFunction) => {
  res.status(500).send(ApiResponse({ code: 2, msg: errorCodes[2], errors: err }))
}

/**
 * 
 * @name payloadValidator
 * @param {object} req
 * @param {object} res
 * @param {function} NextFunction
 * @description Validates payload parameters
 */
const payloadValidator = (req: Request,res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(ApiResponse({ code: 4, msg: errorCodes[4], errors: errors.array() }));
  }
  next()
}

/**
 * 
 * @name countValidator
 * @param {number} count
 * @description Validates minCount and maxCount payload parameters
 * @returns true or false
 */
const countValidator = (count: number) => {
  if (count < 0) {
    throw new Error('Value must be a positive number');
  }
  return true;
}

/**
 * 
 * @name ApiResponse
 * @param {number} code - predefined error codes
 * @param {string} msg - description of error or success messages
 * @param {array} records - An array of records
 * @param {array} errors - An array of erorrs if there was an error in the app
 * 
 * @description Api response object
 * @returns APi response object
 */
const ApiResponse = ({code, msg, records, errors}: ResponseObject) => {
  return {
    code,
    msg,
    records,
    errors
  }
}

export {
  errorCodes,
  ApiResponse,
  notFound,
  catchAll,
  payloadValidator,
  countValidator
}
