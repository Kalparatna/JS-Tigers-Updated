# Vendor Management System - Complete Setup Guide

## 🚀 Quick Start (5 minutes)

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 2. Set up Environment Variables

**Root `.env` file:**
```env
MONGODB_URI=mongodb://localhost:27017/vendordb
GOOGLE_CLIENT_ID=your_google_client_id_here
PORT=5000
NODE_ENV=development
```

**Client `.env` file:**
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

### 3. Set up MongoDB
**Option A: Local MongoDB**
- Install MongoDB Community Edition
- Start MongoDB service
- Database will be created automatically

**Option B: MongoDB Atlas (Recommended)**
- Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create free cluster
- Get connection string
- Update `MONGODB_URI` in `.env`

### 4. Set up Google OAuth (Required for Login)

#### Step-by-step Google OAuth Setup:

1. **Go to Google Cloud Console**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Sign in with your Google account

2. **Create or Select Project**
   - Click "Select a project" → "New Project"
   - Name: "Vendor Management System"
   - Click "Create"

3. **Enable Google Identity API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google Identity"
   - Click "Google Identity" → "Enable"

4. **Create OAuth Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Choose "Web application"
   - Name: "Vendor Management Web Client"

5. **Configure Authorized Origins**
   Add these URLs:
   - `http://localhost:3000` (for development)
   - `http://localhost:5173` (for Vite dev server)
   - Your production domain (when deploying)

6. **Copy Client ID**
   - Copy the generated Client ID
   - Update both `.env` files with your Client ID

### 5. Run the Application
```bash
# Start both frontend and backend
npm run dev
```

**Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🔧 Development Commands

```bash
# Run full development environment
npm run dev

# Run only backend server
npm run server

# Run only frontend client
npm run client

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Deployment Guide

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-github-repo-url
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Set environment variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID

3. **Update Google OAuth**
   - Add your Vercel domain to authorized origins
   - Update `VITE_GOOGLE_CLIENT_ID` in Vercel environment variables

### Deploy to Heroku

1. **Install Heroku CLI**
2. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

## 🧪 Testing the Application

### 1. Test Google Login
- Open application in browser
- Click "Sign in with Google"
- Complete Google authentication
- Verify you're redirected to vendor list

### 2. Test Vendor Management
- Click "Add New Vendor"
- Fill required fields (marked with *)
- Submit form
- Verify vendor appears in list
- Test Edit and Delete functionality

### 3. Test Pagination
- Add more than 10 vendors
- Verify pagination controls appear
- Test navigation between pages

## 🔍 Troubleshooting

### Google Login Issues
- **"Invalid Client ID"**: Check if Client ID is correctly set in environment variables
- **"Unauthorized Origin"**: Add your domain to Google OAuth authorized origins
- **Login button not appearing**: Check browser console for JavaScript errors

### Database Issues
- **Connection Error**: Verify MongoDB is running and connection string is correct
- **Permission Error**: Check MongoDB Atlas IP whitelist and user permissions

### Build Issues
- **Module not found**: Run `npm install` in both root and client directories
- **Port conflicts**: Change PORT in `.env` if 5000 is occupied

## 📋 Features Checklist

✅ Google OAuth Login/Logout  
✅ Create Vendor (with validation)  
✅ Paginated Vendor List  
✅ Edit Vendor (pre-populated form)  
✅ Delete Vendor (with confirmation)  
✅ Responsive Design  
✅ Error Handling  
✅ Production Ready  

## 🎯 Assignment Requirements Met

All requirements from the internship assignment are fully implemented:

1. ✅ Login with Google & Logout
2. ✅ Create Vendor with all specified fields
3. ✅ Display paginated list of vendors
4. ✅ Edit functionality with pre-loaded data
5. ✅ Delete with confirmation
6. ✅ React frontend
7. ✅ Node.js backend
8. ✅ MongoDB database
9. ✅ Deployment ready

## 🆘 Need Help?

If you encounter any issues:
1. Check this troubleshooting guide
2. Verify all environment variables are set correctly
3. Check browser console for error messages
4. Ensure all dependencies are installed
5. Verify MongoDB connection

The application is production-ready and meets all assignment requirements!