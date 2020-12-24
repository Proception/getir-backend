import dotenv from 'dotenv'

dotenv.config();

const documentation = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Record',
    description: 'Record Filter API',
    contact: {
      name: 'Benedict Esimaje',
      email: 'omasan.esimaje@gmail.com',
      url: 'https://www.benedictesimaje.com'
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  servers: [
    {
      url: 'http://localhost:8000/',
      description: 'Local server'
    },
    {
      url: process.env.APP_URL ,
      description: 'Production server'
    }
  ],
  tags: [
    {
      name: 'Getir'
    }
  ],
  paths: {
    '/api/v1/records': {
      post: {
        tags: ['CRUD operations'],
        description: 'Filter records',
        operationId: 'filterRecords',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Payload'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'Records were filtered',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response'
                },
                example: {
                  "code": 0,
                  "msg": "Success",
                  "records": [
                    {
                      "key": "ZpoHRnZT",
                      "createdAt": "2016-01-29T13:18:38.649Z",
                      "totalCount": 2337
                    }
                  ]
                }
              }
            }
          },
          '400': {
            description: 'Invalid parameters',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  code: 4,
                  msg: 'Invalid Parameters',
                  errors: [
                    {
                      "value": -1,
                      "msg": "Value must be a positive number",
                      "param": "minCount",
                      "location": "body"
                    }
                  ]
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      startDate: {
        type: 'string',
        description: 'Start Date in the format YYYY-MM-DD',
        example: '2016-01-26'
      },
      endDate: {
        type: 'string',
        description: 'End Date in the format YYYY-MM-DD',
        example: '2018-02-02'
      },
      minCount: {
        type: 'integer',
        description: 'Minimum Count Value',
        example: 2700
      },
      maxCount: {
        type: 'integer',
        description: 'Maximum Count Value',
        example: 3000
      },
      key: {
        type: 'string',
        description: 'Start Date',
        example: 'ROYQdRsl'
      },
      createdAt: {
        type: 'string',
        description: 'Date the record was persisted in the database',
        example: '2016-01-29T13:18:38.649Z'
      },
      totalCount: {
        type: 'integer',
        description: 'Total Count',
        example: 2700
      },
      Payload: {
        type: 'object',
        properties: {
          startDate: {
            $ref: '#/components/schemas/startDate'
          },
          endDate: {
            $ref: '#/components/schemas/endDate'
          },
          minCount: {
            $ref: '#/components/schemas/minCount'
          },
          maxCount: {
            $ref: '#/components/schemas/maxCount'
          }
        }
      },
      Record: {
        type: 'object',
        properties: {
          key: {
            $ref: '#/components/schemas/key'
          },
          createdAt: {
            $ref: '#/components/schemas/createdAt'
          },
          totalCount: {
            $ref: '#/components/schemas/totalCount'
          },
        }
      },
      Records: {
        type: 'object',
        properties: {
          records: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Record'
            }
          }
        }
      },
      Response: {
        type: 'object',
        properties: {
          code: {
            type: 'integer',
            example: 0
          },
          msg: {
            type: 'string',
            example: 'Success'
          },
          records: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Record'
            }
          }
        }
      },
      ErrorObject: {
        type: 'object',
        properties: {
          value: {
            type: 'string'
          },
          msg: {
            type: 'string'
          },
          param: {
            type: 'string'
          },
          location: {
            type: 'string'
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          code: {
            type: 'integer',
            example: 4
          },
          msg: {
            type: 'string',
            example: 'Validation Error'
          },
          errors: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ErrorObject'
            }
          }
        }
      }
    },
  }
};

export default documentation
