const ajvInstance = require('./ajv-instance');

const schema = {
  type: 'object',
  properties: {
    symbol: { type: 'string', minLength: 1 },
    name: { type: 'string', minLength: 1 },
    country: { type: 'string', minLength: 1 },
    industry: { type: 'string', minLength: 1 },
    ipoYear: { type: 'integer' },
    marketCap: { type: 'integer' },
    sector: { type: 'string', minLength: 1 },
    volume: { type: 'integer' },
    netChange: { type: 'integer' },
    netChangePercent: { type: 'integer' },
    lastPrice: { type: 'integer' },
  },
  required: [],
  additionalProperties: false,
};

module.exports = ajvInstance.compile(schema);
