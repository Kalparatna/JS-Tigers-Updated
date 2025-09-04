const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'https://js-tigers-rouge.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log('Request Origin:', origin); // Debugging log
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error('Blocked by CORS:', origin); // Log blocked origins
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200, // For legacy browsers that choke on 204
  })
);
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB successfully');

  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
  });

// Vendor Schema and Model
const vendorSchema = new mongoose.Schema({
  vendorName: { type: String, required: true },
  bankAccountNo: { type: String, required: true },
  bankName: { type: String, required: true },
  addressLine1: { type: String },
  addressLine2: { type: String, required: true },
  city: { type: String },
  country: { type: String },
  zipCode: { type: String },
});

const Vendor = mongoose.model('Vendor', vendorSchema);

// Routes
// Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ status: 'OK', message: 'Server is running' });
// });

// app.get('/api', (req, res) => {
//   res.status(200).json({ status: 'OK', message: 'Server is running' });
// });

// app.get('/', (req, res) => {
//   res.send('Backend is running 🚀');
// })

// 1. Get all vendors (with pagination)
app.get('/api/vendors', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const totalVendors = await Vendor.countDocuments();
    const vendors = await Vendor.find()
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const totalPages = Math.ceil(totalVendors / limitNum);

    res.status(200).json({
      vendors,
      totalPages,
      currentPage: pageNum,
      totalVendors,
    });
  } catch (err) {
    console.error('Error fetching vendors:', err); // Log the error
    res.status(500).json({ error: 'Failed to fetch vendors' });
  }
});

// 2. Get a single vendor by ID
app.get('/api/vendors/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    res.status(200).json(vendor);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vendor' });
  }
});

// 3. Create a new vendor
app.post('/api/vendors', async (req, res) => {
  try {
    const newVendor = new Vendor(req.body);
    const savedVendor = await newVendor.save();
    res.status(201).json(savedVendor);
  } catch (err) {
    console.error('Error creating vendor:', err);
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      res.status(400).json({ error: `Validation error: ${errors.join(', ')}` });
    } else {
      res.status(400).json({ error: 'Failed to create vendor' });
    }
  }
});

// 4. Update an existing vendor
app.put('/api/vendors/:id', async (req, res) => {
  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedVendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    res.status(200).json(updatedVendor);
  } catch (err) {
    console.error('Error updating vendor:', err);
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      res.status(400).json({ error: `Validation error: ${errors.join(', ')}` });
    } else if (err.name === 'CastError') {
      res.status(400).json({ error: 'Invalid vendor ID' });
    } else {
      res.status(400).json({ error: 'Failed to update vendor' });
    }
  }
});

// 5. Delete a vendor
app.delete('/api/vendors/:id', async (req, res) => {
  try {
    const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!deletedVendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    res.status(200).json({ message: 'Vendor deleted successfully' });
  } catch (err) {
    console.error('Error deleting vendor:', err);
    if (err.name === 'CastError') {
      res.status(400).json({ error: 'Invalid vendor ID' });
    } else {
      res.status(500).json({ error: 'Failed to delete vendor' });
    }
  }
});

module.exports = (req, res) => {
  app(req, res); 
};
