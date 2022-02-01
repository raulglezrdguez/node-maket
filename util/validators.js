module.exports.validateMarketInput = (
  symbol,
  name,
  country,
  industry,
  ipoYear,
  marketCap,
  sector,
  volume,
  netChage,
  netChangePercent,
  lastPrice
) => {
  const errors = {};

  if (symbol.trim() === '') {
    errors.symbol = 'Symbol is empty';
  }
  if (name.trim() === '') {
    errors.name = 'Name is empty';
  }
  if (country.trim() === '') {
    errors.country = 'Country is empty';
  }
  if (industry.trim() === '') {
    errors.industry = 'Industry is empty';
  }
  if (!ipoYear) {
    errors.ipoYear = 'ipoYear is empty';
  }
  if (!marketCap) {
    errors.marketCap = 'MarketCap is empty';
  }
  if (sector.trim() === '') {
    errors.sector = 'Sector is empty';
  }
  if (!volume) {
    errors.volume = 'volume is empty';
  }
  if (!netChage) {
    errors.netChage = 'NetChage is empty';
  }
  if (!netChangePercent) {
    errors.netChangePercent = 'NetChagePercent is empty';
  }
  if (!lastPrice) {
    errors.lastPrice = 'LastPrice is empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
