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

app.listen(process.env.PORT || 5000, () => console.log('Server active on port 5000'));