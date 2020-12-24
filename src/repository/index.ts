import Record from '../models/Record';
import { Filters } from '../interfaces/index'

/**
 * 
 * @param Date startDate
 * @param Date startDate
 * @param number minCount
 * @param numebr maxCount
 * 
 * @description filters the record collection based on defined paramenters
 * @returns An array of objects with values totalCount, createdAt and key
 */
const filterRecords = async ({ startDate, endDate, minCount, maxCount }: Filters) => await Record.aggregate([
  { $match: { createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
  { $project: { key: 1, createdAt: 1, totalCount: { $sum: "$counts" } } },
  { $match: { totalCount: { $gte: minCount, $lt: maxCount } } },
]);


export {
  filterRecords
}
