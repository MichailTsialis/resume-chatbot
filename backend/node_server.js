/*const http = require('http');
const fs = require('fs');
const path = require('path');
const { getResponse } = require('./response');

const PORT = 5000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    let filePath = '';
    let contentType = '';

    if (req.url === '/' || req.url === '/index.html') {
      filePath = path.join(__dirname, '../public/index.html');
      contentType = 'text/html';
    } else if (req.url === '/style.css') {
      filePath = path.join(__dirname, '../public/style.css');
      contentType = 'text/css';
    } else if (req.url === '/webscript.js') {
      filePath = path.join(__dirname, '../public/webscript.js');
      contentType = 'application/javascript';
    } else {
      res.writeHead(404);
      res.end('404 Not Found');
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('File loading error:', err);  // helpful log
        res.writeHead(500);
        res.end('Error loading file');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });

  } else if (req.method === 'POST' && req.url === '/chat') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { prompt } = JSON.parse(body);
        const reply = getResponse(prompt);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply }));
      } catch (err) {
        res.writeHead(400);
        res.end('Invalid JSON');
      }
    });
  } else {
    res.writeHead(405);
    res.end('Method Not Allowed');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
