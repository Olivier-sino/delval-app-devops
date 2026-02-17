const express = require('express');
const client = require('prom-client');
const app = express();
const port = 3000;

// Metrics
client.collectDefaultMetrics();
const httpDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.005, 0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5],
});

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  const end = httpDuration.startTimer();
  res.on('finish', () => {
    const route = req.route?.path || req.path || 'unknown';
    end({ method: req.method, route, status_code: res.statusCode });
  });
  next();
});

// Routes
const routes = require('./routes/index');
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Hello, DELVAL LTD!');
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
