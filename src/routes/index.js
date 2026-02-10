const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
  res.json({ users: [{ id: 1, name: 'John Doe' }] });
});

module.exports = router;