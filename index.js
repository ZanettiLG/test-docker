const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Docker!', version: '1.0.2' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

app.get('/info', (req, res) => {
  res.json({
    name: 'app-api',
    version: '1.0.2',
    node: process.version,
    platform: process.platform,
    memory: process.memoryUsage().heapUsed
  });
});

app.listen(PORT, () => {
  console.log(`API v1.0.2 running on port ${PORT}`);
});
