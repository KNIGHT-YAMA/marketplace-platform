
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Package Definitions
const packages = [
  {
    id: 'p1000',
    price: 1000,
    payoutCycle: 'Every 2 Weeks',
    ratePerView: 25,
    postingDays: '3 days a week'
  },
  {
    id: 'p2500',
    price: 2500,
    payoutCycle: 'Weekly',
    ratePerView: 40,
    postingDays: '3 days a week'
  },
  {
    id: 'p4500',
    price: 4500,
    payoutCycle: 'Weekly',
    ratePerView: 100,
    postingDays: 'Daily'
  }
];

// In-memory mock database for testing
let users = [];

// Endpoint to register user
app.post('/api/register', (req, res) => {
  const { fullName, email, phone } = req.body;

  if (!fullName || !email || !phone) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  const newUser = {
    id: Date.now(),
    fullName,
    email,
    phone,
    package: null,
    balance: 0,
    totalWithdrawn: 0
  };

  users.push(newUser);
  res.json({ message: "Registration successful!", user: newUser });
});

// Endpoint to fetch packages
app.get('/api/packages', (req, res) => {
  res.json(packages);
});

// Serve static HTML on root
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));