import express from 'express';
import { body } from 'express-validator';
import { payloadValidator, countValidator } from '../utils/index'
import FilterController from '../controller/index';

const Router = express.Router()

/**
 * 
 * @description handles all POST requests for /record
 * 
 */
Router.post('/records', [
  body('startDate').exists().isDate(),
  body('endDate').exists().isDate(),
  body('minCount').exists().isNumeric().custom(countValidator),
  body('maxCount').exists().isNumeric().custom(countValidator),
], payloadValidator, FilterController)

export default Router;
