const ajvInstance = require('./ajv-instance');

const schema = {
  type: 'object',
  properties: {
    symbol: { type: 'string' },
    name: { type: 'string' },
    country: { type: 'string' },
    industry: { type: 'string' },
    ipoYear: { type: 'integer' },
    marketCap: { type: 'integer' },
    vector: { type: 'string' },
    volume: { type: 'integer' },
    netChange: { type: 'integer' },
    netChangePercent: { type: 'integer' },
    lastPrice: { type: 'integer' },
  },
  required: [
    'symbol',
    'name',
    'country',
    'industry',
    'ipoYear',
    'marketCap',
    'vector',
    'volume',
    'netChange',
    'netChangePercent',
    'lastPrice',
  ],
};

module.exports = ajvInstance.compile(schema);
