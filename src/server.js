const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
const routes = require('./routes/index');
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Hello, DELVAL LTD!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});