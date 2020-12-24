
interface RecordData {
  _id: string,
  key: string,
  counts: Array<number>,
  createdAt: Date,
  value: string,
  totalCount: number
}

interface RecordResponse {
  key: string,
  createdAt: string,
  totalCount: number
}

interface ResponseObject {
  code: number, 
  msg: string, 
  records?: Array<RecordResponse>,
  errors?: any
}

interface Filters {
  startDate: string,
  endDate: string,
  minCount: number,
  maxCount: number
}

export {
  ResponseObject,
  RecordResponse,
  RecordData,
  Filters
}
