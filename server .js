const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Marketplace Backend is Live!');
});

app.listen(process.env.PORT || 5000, () => console.log('Server active on port 5000'));const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// 2. Serve index.html on the home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Optional: A separate API endpoint for testing
app.get('/api/status', (req, res) => {
  res.json({ message: "Marketplace Backend is Live!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
