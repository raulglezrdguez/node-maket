const express = require('express');
const router = express.Router();

const Market = require('../models/market');

const { validateMarketInput } = require('../util/validators');

// new single market
router.post('/markets', async function (req, res) {
  if (req && req.body) {
    const {
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
      lastPrice,
    } = req.body;

    if (
      (symbol,
      name,
      country,
      industry,
      ipoYear,
      marketCap,
      sector,
      volume,
      netChage,
      netChangePercent,
      lastPrice)
    ) {
      const { errors, valid } = validateMarketInput(
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
      );
      if (!valid) {
        return res.status(400).send(errors);
      }

      try {
        let newMarket = new Market({
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
          lastPrice,
        });

        newMarket = await newMarket.save();

        return res.send({
          id: newMarket._id,
          symbol: newMarket.symbol,
          name: newMarket.name,
          country: newMarket.country,
          industry: newMarket.industry,
          ipoYear: newMarket.ipoYear,
          marketCap: newMarket.marketCap,
          sector: newMarket.sector,
          volume: newMarket.volume,
          netChage: newMarket.netChage,
          netChangePercent: newMarket.netChangePercent,
          lastPrice: newMarket.lastPrice,
          createdAt: newMarket.createdAt,
          updatedAt: newMarket.updatedAt,
        });
      } catch (err) {
        return res.status(500).send({ general: 'Internal server error' });
      }
    } else {
      return res.status(400).send({ general: 'Invalid input data' });
    }
  } else {
    return res.status(400).send({ general: 'Input data is empty' });
  }
});

// new bulk of markets
router.post('/markets/bulk', async function (req, res) {
  if (req && req.body) {
    const { bulk } = req.body;

    if (bulk && Array.isArray(bulk) && bulk.length > 0) {
      for (let b of bulk) {
        const {
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
          lastPrice,
        } = b;
        const { errors, valid } = validateMarketInput(
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
        );
        if (!valid) {
          return res.status(400).send(errors);
        }
      }

      try {
        const newMarkets = await Market.insertMany(bulk);

        const newMarketsToSend = newMarkets.map((newMarket) => ({
          id: newMarket._id,
          symbol: newMarket.symbol,
          name: newMarket.name,
          country: newMarket.country,
          industry: newMarket.industry,
          ipoYear: newMarket.ipoYear,
          marketCap: newMarket.marketCap,
          sector: newMarket.sector,
          volume: newMarket.volume,
          netChage: newMarket.netChage,
          netChangePercent: newMarket.netChangePercent,
          lastPrice: newMarket.lastPrice,
          createdAt: newMarket.createdAt,
          updatedAt: newMarket.updatedAt,
        }));

        return res.send(newMarketsToSend);
      } catch (err) {
        return res.status(500).send({ general: 'Internal server error' });
      }
    } else {
      return res.status(400).send({ general: 'Bulk data is empty' });
    }
  } else {
    return res.status(400).send({ general: 'Input data is empty' });
  }
});

// update market
router.patch('/markets/:id', async function (req, res) {
  if (req && req.params.id) {
    const { id } = req.params;

    if (id) {
      let market = await Market.findOne({ id });
      if (market) {
        if (req.body) {
          const {
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
            lastPrice,
          } = req.body;

          try {
            const update = {
              symbol: symbol || market.symbol,
              name: name || market.name,
              country: country || market.country,
              industry: industry || market.industry,
              ipoYear: ipoYear || market.ipoYear,
              marketCap: marketCap || market.marketCap,
              sector: sector || market.sector,
              volume: volume || market.volume,
              netChage: netChage || market.netChage,
              netChangePercent: netChangePercent || market.netChangePercent,
              lastPrice: lastPrice || market.lastPrice,
              updatedAt: new Date().toISOString(),
            };

            market = await Market.findOneAndUpdate({ id }, update);

            return res.send({
              id,
              symbol: market.symbol,
              name: market.name,
              country: market.country,
              industry: market.industry,
              ipoYear: market.ipoYear,
              marketCap: market.marketCap,
              sector: market.sector,
              volume: market.volume,
              netChage: market.netChage,
              netChangePercent: market.netChangePercent,
              lastPrice: market.lastPrice,
              createdAt: market.createdAt,
              updatedAt: market.updatedAt,
            });
          } catch (err) {
            return res.status(500).send({ general: 'Internal server error' });
          }
        } else {
          return res.status(400).send({ id: 'Data to update is needed' });
        }
      } else {
        return res.status(404).send({ id: 'Market not found' });
      }
    } else {
      return res.status(400).send({ general: 'Param id is empty' });
    }
  } else {
    return res.status(400).send({ general: 'Param id is necesary' });
  }
});

// put market
router.put('/markets/:id', async function (req, res) {
  if (req && req.params.id) {
    const { id } = req.params;

    if (id) {
      if (req.body) {
        const {
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
          lastPrice,
        } = req.body;

        let market = await Market.findOne({ id });
        if (market) {
          // update
          try {
            const update = {
              symbol: symbol || market.symbol,
              name: name || market.name,
              country: country || market.country,
              industry: industry || market.industry,
              ipoYear: ipoYear || market.ipoYear,
              marketCap: marketCap || market.marketCap,
              sector: sector || market.sector,
              volume: volume || market.volume,
              netChage: netChage || market.netChage,
              netChangePercent: netChangePercent || market.netChangePercent,
              lastPrice: lastPrice || market.lastPrice,
              updatedAt: new Date().toISOString(),
            };

            market = await Market.findOneAndUpdate({ id }, update);

            return res.send({
              id,
              symbol: market.symbol,
              name: market.name,
              country: market.country,
              industry: market.industry,
              ipoYear: market.ipoYear,
              marketCap: market.marketCap,
              sector: market.sector,
              volume: market.volume,
              netChage: market.netChage,
              netChangePercent: market.netChangePercent,
              lastPrice: market.lastPrice,
              createdAt: market.createdAt,
              updatedAt: market.updatedAt,
            });
          } catch (err) {
            return res.status(500).send({ general: 'Internal server error' });
          }
        } else {
          // post
          const { errors, valid } = validateMarketInput(
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
          );
          if (!valid) {
            return res.status(400).send(errors);
          }

          let newMarket = new Market({
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
            lastPrice,
          });

          newMarket = await newMarket.save();

          return res.send({
            id: newMarket._id,
            symbol: newMarket.symbol,
            name: newMarket.name,
            country: newMarket.country,
            industry: newMarket.industry,
            ipoYear: newMarket.ipoYear,
            marketCap: newMarket.marketCap,
            sector: newMarket.sector,
            volume: newMarket.volume,
            netChage: newMarket.netChage,
            netChangePercent: newMarket.netChangePercent,
            lastPrice: newMarket.lastPrice,
            createdAt: newMarket.createdAt,
            updatedAt: newMarket.updatedAt,
          });
        }
      } else {
        return res.status(400).send({ id: 'Data to update is needed' });
      }
    } else {
      return res.status(400).send({ general: 'Param id is empty' });
    }
  } else {
    return res.status(400).send({ general: 'Param id is necesary' });
  }
});

// delete market
router.delete('/markets/:id', async function (req, res) {
  if (req && req.params) {
    const { id } = req.params;

    if (id) {
      try {
        let market = await Market.findOne({ id });
        if (market) {
          await Market.deleteOne({ id });

          return res.send({
            id,
          });
        } else {
          return res.status(404).send({ id: 'Market not found' });
        }
      } catch (err) {
        return res.status(500).send({ general: 'Internal server error' });
      }
    } else {
      return res.status(400).send({ id: 'Id needed' });
    }
  } else {
    return res.status(400).send({ id: 'Param Id needed' });
  }
});

// get market
router.get('/markets/:id', async function (req, res) {
  if (req && req.params) {
    const { id } = req.params;

    if (id) {
      try {
        const market = await Market.findOne({ id }).select('-_id');

        return res.status(200).send(market);
      } catch (err) {
        return res.status(500).send({ general: 'Internal server error' });
      }
    } else {
      return res.status(400).send({ id: 'Param Id is empty' });
    }
  } else {
    return res.status(400).send({ id: 'Param Id needed' });
  }
});

// get markets
router.get('/markets', async function (req, res) {
  if (req && req.query) {
    /**
     * page: page number -> 0, 1, 2, 3 ...
     * limit: markets for page _> 1, 2, 3 ...
     */
    const { page, limit } = req.query;

    try {
      if (page && limit && limit > 0) {
        const total = await Market.countDocuments({});
        const markets = await Market.find({})
          .sort('-createdAt')
          .skip(page * limit)
          .limit(limit)
          .select('-_id');

        return res.status(200).send({
          data: markets,
          count: markets.length,
          total,
          page,
          pageCount: Math.ceil(total / limit),
        });
      } else {
        return res.status(400).send({
          general: 'Query params: page and limit are needed with valid values',
        });
      }
    } catch (err) {
      return res.status(500).send({ general: 'Internal server error' });
    }
  } else {
    return res
      .status(400)
      .send({ general: 'Query params: page and limit are needed' });
  }
});

module.exports = router;
