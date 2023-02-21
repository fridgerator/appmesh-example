const express = require('express');
const spdy = require('spdy');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;

const app = express();

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
});

app.get('/health', (_, res) => {
  res.send('ok')
})

app.get('/stream', (_, res) => {
  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive'
  });
  res.flushHeaders();

  let counter = 0;
  let interval = setInterval(() => {
    res.write(`data: ${counter++}\n\n`)
  }, 1000)
  res.on('close', () => {
    clearInterval(interval)
    res.end()
  })
})

if (process.env.NODE_ENV === "PROD") {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  })
} else {
  const server = spdy.createServer(
    {
      key: fs.readFileSync(`./server.key`),
      cert: fs.readFileSync(`./server.cert`),
    },
    app
  );

  server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('SSL Enabled');
  });
}
