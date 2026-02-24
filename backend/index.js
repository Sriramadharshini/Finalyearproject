// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

// 🔥 Middleware first
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Then routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Test
app.get('/', (req,res)=>{ res.send("API running"); });

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`server running on port ${PORT}`);
  try {
    await mongoose.connect("mongodb://localhost:27017/project")
    
  
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
});