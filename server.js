const { join } = require('path');
const express = require('express');
const { parse } = require('url')
const next = require('next');
const cache = require('lru-cache'); // for using least-recently-used based caching

const PORT = 8000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const ssrCache = new cache({
  max: 1000, // not more than 20 results will be cached
  maxAge: 1000 * 60 * 90, // 5 mins
});

app.prepare().then(() => {
  const server = express();

  server.get('/', (req, res) => {
    renderAndCache(req, res, '/');
  });

  server.get('/posts', (req, res) => {
    console.log(req)
    // const queryParams = { id: req.params.id };
    renderAndCache(req, res, '/posts');
  });

  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl
    
    if (pathname === '/service-worker.js') {
      const filePath = join(__dirname, '.next', pathname);
      console.log(filePath)
      app.serveStatic(req, res, filePath);
    } else {
      handle(req, res, parsedUrl)
    }
  });

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Live @ https://localhost:${PORT}`);
  });
});

async function renderAndCache(req, res, pagePath, queryParams) {
  const key = req.url;

  // if page is in cache, server from cache
  if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT');
    res.send(ssrCache.get(key));
    return;
  }

  try {
    // if not in cache, render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, queryParams);

    // if something wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html);
      return;
    }

    ssrCache.set(key, html);

    res.setHeader('x-cache', 'MISS');
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams);
  }
}
