const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Mock database storage
let users = [];

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

// Register User (Checks if email already exists)
app.post('/api/register', (req, res) => {
  const { fullName, email, phone, password } = req.body;
  if (!fullName || !email || !phone || !password) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "Email already registered! Please login instead." });
  }

  const newUser = { id: Date.now(), fullName, email, phone, password, balance: 0.00 };
  users.push(newUser);
  res.json({ message: "Registration successful!", user: newUser });
});

// Login User
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  res.json({ message: "Login successful!", user });
});

// Get Packages
app.get('/api/packages', (req, res) => {
  res.json(packages);
});

// ADMIN: Get all registered clients (including passwords)
app.get('/api/admin/users', (req, res) => {
  res.json(users);
});

// Serve main app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve admin dashboard
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));