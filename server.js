const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Package Definitions
const packages = [
  {
    id: 'p1000',
    price: 1000,
    payoutCycle: 'Payment after 2 weeks',
    ratePerView: 'KES 25 per view',
    postingDays: 'Post 3 days a week'
  },
  {
    id: 'p2500',
    price: 2500,
    payoutCycle: 'Payment weekly',
    ratePerView: 'KES 40 per view',
    postingDays: 'Post 3 days a week'
  },
  {
    id: 'p4500',
    price: 4500,
    payoutCycle: 'Payment weekly',
    ratePerView: 'KES 100 per view',
    postingDays: 'Post daily'
  }
];

// API Endpoint to register user
app.post('/api/register', (req, res) => {
  const { fullName, email, phone } = req.body;
  if (!fullName || !email || !phone) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  res.json({ 
    message: "Registration successful!", 
    user: { fullName, email, phone, balance: 0.00 } 
  });
});

// API Endpoint to fetch packages
app.get('/api/packages', (req, res) => {
  res.json(packages);
});

// Serve index.html on root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));