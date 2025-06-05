// server.js
const express = require('express');
const path = require('path');
const { getResponse } = require('./response');

const app = express();
const PORT = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (HTML, CSS, JS) from the public folder
app.use(express.static(path.join(__dirname, '../public')));

// POST route for /chat
app.post('/chat', (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'No prompt provided' });
  }

  const reply = getResponse(prompt);
  res.json({ reply });
});

// Catch-all for 404 if needed (optional)
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
