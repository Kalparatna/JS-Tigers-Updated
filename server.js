const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vendordb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Vendor Schema
const vendorSchema = new mongoose.Schema({
  vendorName: { type: String, required: true },
  bankAccountNo: { type: String, required: true },
  bankName: { type: String, required: true },
  addressLine1: { type: String },
  addressLine2: { type: String, required: true },
  city: { type: String },
  country: { type: String },
  zipCode: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Vendor = mongoose.model('Vendor', vendorSchema);

// Routes
// Get all vendors with pagination
app.get('/api/vendors', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const vendors = await Vendor.find().skip(skip).limit(limit);
    const total = await Vendor.countDocuments();

    res.json({
      vendors,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single vendor
app.get('/api/vendors/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create vendor
app.post('/api/vendors', async (req, res) => {
  try {
    // Validate required fields
    const { vendorName, bankAccountNo, bankName, addressLine2 } = req.body;
    
    if (!vendorName || !bankAccountNo || !bankName || !addressLine2) {
      return res.status(400).json({ 
        error: 'Missing required fields: Vendor Name, Bank Account No., Bank Name, and Address Line 2 are mandatory' 
      });
    }

    const vendor = new Vendor(req.body);
    await vendor.save();
    res.status(201).json(vendor);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Vendor with this bank account already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// Update vendor
app.put('/api/vendors/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    res.json(vendor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete vendor
app.delete('/api/vendors/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    res.json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});