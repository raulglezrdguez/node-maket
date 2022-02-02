const { model, Schema } = require('mongoose');

const marketSchema = new Schema({
  // id: {
  //   type: Schema.Types.ObjectId,
  //   default: function () {
  //     return this._id;
  //   },
  // },
  id: { type: Number, required: true, unique: true },
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  country: { type: String, required: true },
  industry: { type: String, required: true },
  ipoYear: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  sector: { type: String, required: true },
  volume: { type: Number, required: true },
  netChange: { type: Number, required: true },
  netChangePercent: { type: Number, required: true },
  lastPrice: { type: Number, required: true },
  createdAt: {
    type: String,
    required: true,
    default: new Date().toISOString(),
  },
  updatedAt: {
    type: String,
    required: true,
    default: new Date().toISOString(),
  },
});

module.exports = model('Market', marketSchema);
