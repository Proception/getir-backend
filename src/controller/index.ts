const Record = require('../models/Record');
import { Request, Response } from 'express';
import { ApiResponse, errorCodes } from '../utils/index';
import { RecordResponse, RecordData } from '../interfaces/index'
import { filterRecords } from '../repository/index'

/**
 * 
 * @name FilterController
 * @param {Object} req - Request Object
 * @param {Object} res - Request Response
 * @description Handles filtering based on the startDate, endDate, minCount, and maxCount
 * @returns API Response
 */
const FilterController = async (req: Request, res: Response) => {
  const {startDate, endDate, minCount, maxCount} = req.body
  try {
    const dbRecords: Array<RecordData> = await filterRecords({startDate, endDate, minCount, maxCount});
    const records: Array<RecordResponse> = dbRecords.map(record => {
      return {
        key: record.key,
        createdAt: record.createdAt.toISOString(),
        totalCount: record.totalCount
      }
    });
    res.send(ApiResponse({ code: 0, msg: errorCodes[0], records: records }));
  } catch (error) {
    res.send(ApiResponse({ code: 2, msg: errorCodes[2], errors: [error] }))
  }
}

export default FilterController;
