const express = require('express');
const router = express.Router();

const marketAjvSchema = require('../schema/market');

const Market = require('../models/market');

// const ObjectId = require('mongoose').Types.ObjectId;
const createPdf = require('../utils/createPdf');

// new single market
router.post('/markets', async function (req, res) {
  if (req && req.body) {
    const valid = marketAjvSchema(req.body);
    if (!valid) {
      const errors = marketAjvSchema.errors;
      return res.status(400).send(errors);
    }

    try {
      const id = req.body.id;
      const market = await Market.findOne({ id });
      if (market) {
        return res
          .status(400)
          .send({ error: `Market with id: ${id}, already exists` });
      } else {
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
        const ids = bulk.map((b) => b.id);
        const markets = await Market.find({ id: { $in: ids } });
        if (markets && markets.length > 0) {
          return res
            .status(400)
            .send({ error: 'Market with some id already exists' });
        } else {
          const newMarkets = await Market.insertMany(bulk);

          const newMarketsToSend = newMarkets.map((newMarket) => ({
            id: newMarket.id,
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
        }
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
    const { id } = req.params;

    const marketId = parseInt(id);

    if (!isNaN(marketId)) {
      let market = await Market.findOne({ id: marketId });
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
              id: marketId,
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
    const marketId = parseInt(id);

    if (!isNaN(marketId)) {
      if (req.body) {
        let market = await Market.findOne({ id: marketId });
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

            market = await Market.findOneAndUpdate({ id: marketId }, update, {
              new: true,
            });

            return res.status(200).send({
              id: marketId,
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

          const id = req.body.id;
          const market = await Market.findOne({ id });
          if (market) {
            return res
              .status(400)
              .send({ error: `Market with id: ${id}, already exists` });
          } else {
            let newMarket = new Market({ ...req.body });

            newMarket = await newMarket.save();

            return res.status(200).send({
              id: newMarket.id,
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
    const marketId = parseInt(id);

    if (!isNaN(marketId)) {
      try {
        let market = await Market.findOne({ id: marketId });
        if (market) {
          await Market.deleteOne({ id: marketId });

          return res.status(200).send({
            id: marketId,
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
    const marketId = parseInt(id);

    if (!isNaN(marketId)) {
      try {
        const market = await Market.findOne({ id: marketId }).select('-_id');

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
     * sort_by: a valid field
     * sort_order: 'asc' or 'desc'
     */
    const { page, limit, sort_by, sort_order, pdf } = req.query;
    let _page = 0;
    let _limit = 10;
    let _sortBy = 'id';
    let _sortOrder = '+';
    let _pdf = false;

    if (page) {
      if (!isNaN(parseInt(page)) && parseInt(page) >= 0) {
        _page = parseInt(page);
      } else {
        return res.status(400).send({
          error: 'page should be a valid field: 0, 1, 2 ...',
        });
      }
    }

    if (limit) {
      if (!isNaN(parseInt(limit)) && parseInt(limit) > 0) {
        _limit = parseInt(limit);
      } else {
        return res.status(400).send({
          error: 'limit should be a valid field: 1, 2 ...',
        });
      }
    }

    if (sort_by) {
      if (
        [
          'id',
          'symbol',
          'name',
          'country',
          'industry',
          'ipoYear',
          'marketCap',
          'sector',
          'volume',
          'netChange',
          'netChangePercent',
          'lastPrice',
          'createdAt',
          'updatedAt',
        ].includes(sort_by)
      ) {
        _sortBy = sort_by;
      } else {
        return res.status(400).send({
          error: 'sort_by should be a valid field',
        });
      }
    }

    if (sort_order) {
      if (['asc', 'desc'].includes(sort_order)) {
        _sortOrder = sort_order === 'asc' ? '+' : '-';
      } else {
        return res.status(400).send({
          error: "sort_order should be 'asc' or 'desc'",
        });
      }
    }

    if (pdf) {
      if (['true', 'false'].includes(pdf)) {
        _pdf = pdf === 'true' ? true : false;
      } else {
        return res.status(400).send({
          error: "pdf should be 'true' or 'false'",
        });
      }
    }

    try {
      const total = await Market.countDocuments({});
      const markets = await Market.find({})
        .sort(`${_sortOrder}${_sortBy}`)
        .skip(_page * _limit)
        .limit(_limit)
        .select(
          '-_id id symbol name country industry ipoYear marketCap sector volume netChange netChangePercent lastPrice createdAt updatedAt'
        );

      if (_pdf) {
        const pdfDoc = await createPdf(markets);
        if (pdfDoc) {
          res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="markets.pdf"',
          });

          const download = Buffer.from(pdfDoc.toString('utf-8'), 'base64');

          return res.end(download);
        } else {
          return res.status(500).send({
            error: 'error creating pdf in memory',
          });
        }
      } else {
        return res.status(200).send({
          data: markets,
          count: markets.length,
          total,
          page: _page,
          pageCount: Math.ceil(total / _limit),
        });
      }
    } catch (err) {
      return res.status(500).send({ error: 'Internal server error' });
    }
  } else {
    return res
      .status(400)
      .send({ error: 'Query params: page and limit are needed' });
  }
});

module.exports = router;
