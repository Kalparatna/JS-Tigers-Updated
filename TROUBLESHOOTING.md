# Vendor Management System - Troubleshooting Guide

## Common Issues and Solutions

### 1. Add/Edit/Delete Vendor Not Working

**Symptoms:**
- Vendors not being created, updated, or deleted
- Error messages in console
- API calls failing

**Solutions:**

#### Check Server Configuration
1. Ensure the server is running on the correct port (5000)
2. Verify MongoDB connection string in `server/.env`
3. Check if all required dependencies are installed:
   ```bash
   cd server
   npm install
   ```

#### Check API Endpoints
1. Test the health endpoint: `http://localhost:5000/api/health`
2. Run the API test script:
   ```bash
   cd server
   node test-api.js
   ```

#### Check Frontend Configuration
1. Verify the API URL in `client/.env`:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
2. Check if client dependencies are installed:
   ```bash
   cd client
   npm install
   ```

### 2. CORS Issues

**Symptoms:**
- "Access to fetch blocked by CORS policy" errors
- API calls failing from frontend

**Solutions:**
1. Check the allowed origins in `server/api/server.js`
2. Make sure your frontend URL is included in the `allowedOrigins` array
3. For development, ensure `http://localhost:3000` is included

### 3. Database Connection Issues

**Symptoms:**
- "Failed to connect to MongoDB" errors
- Server crashes on startup

**Solutions:**
1. Check MongoDB connection string in `server/.env`
2. Ensure MongoDB is running (local or cloud)
3. Verify network connectivity to MongoDB Atlas (if using cloud)

### 4. Authentication Issues

**Symptoms:**
- Google authentication not working
- Users can't log in

**Solutions:**
1. Check Google Client ID in both `client/.env` and `server/.env`
2. Verify Google OAuth configuration in Google Console
3. Ensure redirect URIs are properly configured

## Development Setup

### Quick Start
1. Run the development script:
   ```bash
   start-dev.bat
   ```

### Manual Start
1. Start the backend:
   ```bash
   cd server
   npm run server
   ```

2. Start the frontend (in a new terminal):
   ```bash
   cd client
   npm run dev
   ```

## API Testing

Use the provided test script to verify all endpoints:
```bash
cd server
node test-api.js
```

## Environment Variables

### Server (.env)
```
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
PORT=5000
```

### Client (.env)
```
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_API_URL=http://localhost:5000/api
```

## Common Error Messages

### "Failed to fetch vendors"
- Check if backend server is running
- Verify API URL configuration
- Check network connectivity

### "Validation error"
- Check required fields in vendor form
- Verify data types match schema requirements

### "Vendor not found"
- Check if vendor ID is valid
- Verify vendor exists in database

## Browser Developer Tools

1. Open browser developer tools (F12)
2. Check Console tab for JavaScript errors
3. Check Network tab for failed API requests
4. Look for specific error messages and status codes

## Need More Help?

1. Check the console logs in both frontend and backend
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Test API endpoints individually using the test script