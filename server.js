
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// 2. Serve index.html on root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 3. API Test Endpoint
app.get('/api/status', (req, res) => {
  res.json({ message: "API is working properly!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));