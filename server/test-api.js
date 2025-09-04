// Simple test script to verify API endpoints
const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testAPI() {
    console.log('Testing Vendor Management API...\n');

    try {
        // Test health endpoint
        console.log('1. Testing health endpoint...');
        const healthResponse = await axios.get(`${API_BASE}/health`);
        console.log('✅ Health check:', healthResponse.data);

        // Test get vendors
        console.log('\n2. Testing get vendors...');
        const vendorsResponse = await axios.get(`${API_BASE}/vendors`);
        console.log('✅ Get vendors:', vendorsResponse.data);

        // Test create vendor
        console.log('\n3. Testing create vendor...');
        const testVendor = {
            vendorName: 'Test Vendor',
            bankAccountNo: '1234567890',
            bankName: 'Test Bank',
            addressLine1: 'Test Address 1',
            addressLine2: 'Test Address 2',
            city: 'Test City',
            country: 'Test Country',
            zipCode: '12345'
        };

        const createResponse = await axios.post(`${API_BASE}/vendors`, testVendor);
        console.log('✅ Create vendor:', createResponse.data);
        const vendorId = createResponse.data._id;

        // Test update vendor
        console.log('\n4. Testing update vendor...');
        const updateData = { ...testVendor, vendorName: 'Updated Test Vendor' };
        const updateResponse = await axios.put(`${API_BASE}/vendors/${vendorId}`, updateData);
        console.log('✅ Update vendor:', updateResponse.data);

        // Test get single vendor
        console.log('\n5. Testing get single vendor...');
        const singleVendorResponse = await axios.get(`${API_BASE}/vendors/${vendorId}`);
        console.log('✅ Get single vendor:', singleVendorResponse.data);

        // Test delete vendor
        console.log('\n6. Testing delete vendor...');
        const deleteResponse = await axios.delete(`${API_BASE}/vendors/${vendorId}`);
        console.log('✅ Delete vendor:', deleteResponse.data);

        console.log('\n🎉 All API tests passed!');

    } catch (error) {
        console.error('❌ API test failed:', error.response?.data || error.message);
    }
}

// Run the test
testAPI();