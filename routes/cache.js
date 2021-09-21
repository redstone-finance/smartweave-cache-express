const express = require('express');
const { MemBlockHeightSwCache } = require('redstone-smartweave');

var router = express.Router();

const caches = {
  STATE: new MemBlockHeightSwCache(1),
  INTERACTIONS: new MemBlockHeightSwCache(1)
};

// getLast
router.get('/last/:type/:key', async function (req, res, next) {
  console.log('last:', {
    url: req.url,
    params: req.params
  });
  const { type, key } = req.params;

  const result = await caches[type].getLast(key);

  res.json(result);
});

// getLessOrEqual
router.get('/less-or-equal/:type/:key/:blockHeight', async function (req, res, next) {
  console.log('less-or-equal:', {
    url: req.url,
    params: req.params
  });

  const { type, key } = req.params;
  const blockHeight = parseInt(req.params.blockHeight);

  const result = await caches[type].getLessOrEqual(key, blockHeight);
  console.log(result);

  res.send(result);
});

// contains
router.get('/contains/:type/:key', async function (req, res, next) {
  console.log('contains:', {
    url: req.url,
    params: req.params
  });

  const { type, key } = req.params;

  res.send(await caches[type].contains(key));
});

// get
router.get('/:type/:key/:blockHeight', async function (req, res, next) {
  console.log('get:', {
    url: req.url,
    params: req.params
  });

  const { type, key } = req.params;
  const blockHeight = parseInt(req.params.blockHeight);

  const result = await caches[type].get(key, blockHeight);
  console.log('get', result);

  res.send(result);
});

// put
router.put('/:type/:key/:blockHeight', async function (req, res, next) {
  console.log('put:', {
    url: req.url,
    params: req.params,
    body: req.body
  });

  const { type, key } = req.params;
  const blockHeight = parseInt(req.params.blockHeight);

  await caches[type].put({ cacheKey: key, blockHeight }, req.body);

  res.send(null);
});

module.exports = router;
