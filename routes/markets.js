const express = require('express');
const router = express.Router();

const marketAjvSchema = require('../schema/market');
const paginationAjvSchema = require('../schema/pagination');

const Market = require('../models/market');

const ObjectId = require('mongoose').Types.ObjectId;

// new single market
router.post('/markets', async function (req, res) {
  if (req && req.body) {
    const valid = marketAjvSchema(req.body);
    if (!valid) {
      const errors = marketAjvSchema.errors;
      return res.status(400).send(errors);
    }

    try {
      let newMarket = new Market({ ...req.body });

      newMarket = await newMarket.save();

      return res.status(200).send({
        id: newMarket._id,
        symbol: newMarket.symbol,
        name: newMarket.name,
        country: newMarket.country,
        industry: newMarket.industry,
        ipoYear: newMarket.ipoYear,
        marketCap: newMarket.marketCap,
        sector: newMarket.sector,
        volume: newMarket.volume,
        netChange: newMarket.netChange,
        netChangePercent: newMarket.netChangePercent,
        lastPrice: newMarket.lastPrice,
        createdAt: newMarket.createdAt,
        updatedAt: newMarket.updatedAt,
      });
    } catch (err) {
      return res.status(500).send({ error: 'Internal server error' });
    }
  } else {
    return res.status(400).send({ error: 'Input data is empty' });
  }
});

// new bulk of markets
router.post('/markets/bulk', async function (req, res) {
  if (req && req.body) {
    const { bulk } = req.body;

    if (bulk && Array.isArray(bulk) && bulk.length > 0) {
      for (let b of bulk) {
        const valid = marketAjvSchema(b);
        if (!valid) {
          const errors = marketAjvSchema.errors;
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
          netChange: newMarket.netChange,
          netChangePercent: newMarket.netChangePercent,
          lastPrice: newMarket.lastPrice,
          createdAt: newMarket.createdAt,
          updatedAt: newMarket.updatedAt,
        }));

        return res.status(200).send(newMarketsToSend);
      } catch (err) {
        return res.status(500).send({ error: 'Internal server error' });
      }
    } else {
      return res
        .status(400)
        .send({ error: 'Bulk data should be an array not empty' });
    }
  } else {
    return res.status(400).send({ error: 'Input data is empty' });
  }
});

// update market
router.patch('/markets/:id', async function (req, res) {
  if (req && req.params.id) {
    console.log(req.params);
    const { id } = req.params;

    if (id && ObjectId.isValid(id)) {
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
            netChange,
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
              netChange: netChange || market.netChange,
              netChangePercent: netChangePercent || market.netChangePercent,
              lastPrice: lastPrice || market.lastPrice,
              updatedAt: new Date().toISOString(),
            };

            market = await Market.findOneAndUpdate({ id }, update, {
              new: true,
            });

            return res.status(200).send({
              id,
              symbol: market.symbol,
              name: market.name,
              country: market.country,
              industry: market.industry,
              ipoYear: market.ipoYear,
              marketCap: market.marketCap,
              sector: market.sector,
              volume: market.volume,
              netChange: market.netChange,
              netChangePercent: market.netChangePercent,
              lastPrice: market.lastPrice,
              createdAt: market.createdAt,
              updatedAt: market.updatedAt,
            });
          } catch (err) {
            return res.status(500).send({ error: 'Internal server error' });
          }
        } else {
          return res.status(400).send({ error: 'Data to update is needed' });
        }
      } else {
        return res.status(404).send({ error: 'Market not found' });
      }
    } else {
      return res.status(400).send({ error: 'Param id is invalid' });
    }
  } else {
    return res.status(400).send({ error: 'Param id is necesary' });
  }
});

// put market
router.put('/markets/:id', async function (req, res) {
  if (req && req.params.id) {
    const { id } = req.params;

    if (id && ObjectId.isValid(id)) {
      if (req.body) {
        let market = await Market.findOne({ id });
        if (market) {
          // update
          const {
            symbol,
            name,
            country,
            industry,
            ipoYear,
            marketCap,
            sector,
            volume,
            netChange,
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
              netChange: netChange || market.netChange,
              netChangePercent: netChangePercent || market.netChangePercent,
              lastPrice: lastPrice || market.lastPrice,
              updatedAt: new Date().toISOString(),
            };

            market = await Market.findOneAndUpdate({ id }, update, {
              new: true,
            });

            return res.status(200).send({
              id,
              symbol: market.symbol,
              name: market.name,
              country: market.country,
              industry: market.industry,
              ipoYear: market.ipoYear,
              marketCap: market.marketCap,
              sector: market.sector,
              volume: market.volume,
              netChange: market.netChange,
              netChangePercent: market.netChangePercent,
              lastPrice: market.lastPrice,
              createdAt: market.createdAt,
              updatedAt: market.updatedAt,
            });
          } catch (err) {
            return res.status(500).send({ error: 'Internal server error' });
          }
        } else {
          // post
          const valid = marketAjvSchema(req.body);
          if (!valid) {
            const errors = marketAjvSchema.errors;
            return res.status(400).send(errors);
          }

          let newMarket = new Market({ ...req.body });

          newMarket = await newMarket.save();

          return res.status(200).send({
            id: newMarket._id,
            symbol: newMarket.symbol,
            name: newMarket.name,
            country: newMarket.country,
            industry: newMarket.industry,
            ipoYear: newMarket.ipoYear,
            marketCap: newMarket.marketCap,
            sector: newMarket.sector,
            volume: newMarket.volume,
            netChange: newMarket.netChange,
            netChangePercent: newMarket.netChangePercent,
            lastPrice: newMarket.lastPrice,
            createdAt: newMarket.createdAt,
            updatedAt: newMarket.updatedAt,
          });
        }
      } else {
        return res.status(400).send({ error: 'Data to update is needed' });
      }
    } else {
      return res.status(400).send({ error: 'Param id is invalid' });
    }
  } else {
    return res.status(400).send({ error: 'Param id is necesary' });
  }
});

// delete market
router.delete('/markets/:id', async function (req, res) {
  if (req && req.params) {
    const { id } = req.params;

    if (id && ObjectId.isValid(id)) {
      try {
        let market = await Market.findOne({ id });
        if (market) {
          await Market.deleteOne({ id });

          return res.status(200).send({
            id,
          });
        } else {
          return res.status(404).send({ error: 'Market not found' });
        }
      } catch (err) {
        return res.status(500).send({ error: 'Internal server error' });
      }
    } else {
      return res.status(400).send({ error: 'Invalid id' });
    }
  } else {
    return res.status(400).send({ error: 'Param Id needed' });
  }
});

// get market
router.get('/markets/:id', async function (req, res) {
  if (req && req.params) {
    const { id } = req.params;

    if (id && ObjectId.isValid(id)) {
      try {
        const market = await Market.findOne({ id }).select('-_id');

        if (market) {
          return res.status(200).send(market);
        } else {
          return res.status(404).send({ error: 'Market not found' });
        }
      } catch (err) {
        return res.status(500).send({ error: 'Internal server error' });
      }
    } else {
      return res.status(400).send({ error: 'Invalid param id' });
    }
  } else {
    return res.status(400).send({ error: 'Param id needed' });
  }
});

// get markets
router.get('/markets', async function (req, res) {
  if (req && req.query) {
    /**
     * page: page number -> 0, 1, 2, 3 ...
     * limit: markets for page -> 1, 2, 3 ...
     */
    const { page, limit } = req.query;
    const p = parseInt(page);
    const l = parseInt(limit);

    if (!isNaN(p) && !isNaN(l) && p > -1 && l > 0) {
      try {
        const total = await Market.countDocuments({});
        const markets = await Market.find({})
          .sort({ createdAt: -1 })
          .skip(p * l)
          .limit(l)
          .select('-_id');

        return res.status(200).send({
          data: markets,
          count: markets.length,
          total,
          page: p,
          pageCount: Math.ceil(total / l),
        });
      } catch (err) {
        return res.status(500).send({ error: 'Internal server error' });
      }
    } else {
      return res.status(400).send({
        error: 'Query params: page and limit are needed and valid',
      });
    }
  } else {
    return res
      .status(400)
      .send({ error: 'Query params: page and limit are needed' });
  }
});

module.exports = router;
