import React, { useEffect, useRef } from 'react'

const Login = ({ onLogin }) => {
  const googleButtonRef = useRef(null)

  useEffect(() => {
    // Load Google Identity Services script if not already loaded
    if (!window.google) {
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      script.onload = initializeGoogleSignIn
      document.head.appendChild(script)
    } else {
      initializeGoogleSignIn()
    }
  }, [])

  const initializeGoogleSignIn = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    
    console.log('Initializing Google Sign-In with Client ID:', clientId ? 'Configured' : 'Not configured')
    
    if (!clientId || clientId === 'your_google_client_id_here') {
      // Demo mode - show demo login button
      console.log('Using demo mode - Google Client ID not configured')
      return
    }

    if (window.google && googleButtonRef.current) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true
      })

      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        {
          theme: 'outline',
          size: 'large',
          width: 300,
          text: 'signin_with',
          shape: 'rectangular'
        }
      )

      // Also show the One Tap prompt
      window.google.accounts.id.prompt()
    }
  }

  const handleDemoLogin = () => {
    const demoUser = {
      id: 'demo-user-123',
      name: 'Demo User',
      email: 'demo@example.com',
      picture: 'https://via.placeholder.com/40x40/007bff/ffffff?text=DU',
      token: 'demo-token'
    }
    onLogin(demoUser)
  }

  const handleCredentialResponse = (response) => {
    try {
      // Decode the JWT token to get user info
      const payload = JSON.parse(atob(response.credential.split('.')[1]))
      
      const userData = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        token: response.credential
      }

      console.log('Google login successful:', userData)
      onLogin(userData)
    } catch (error) {
      console.error('Error processing Google login:', error)
      alert('Login failed. Please try again.')
    }
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column'
    }}>
      <div className="card" style={{ textAlign: 'center', maxWidth: '400px' }}>
        <h1 style={{ marginBottom: '2rem' }}>Vendor Management System</h1>
        <p style={{ marginBottom: '2rem', color: '#666' }}>
          Please sign in with your Google account to continue
        </p>
        <div ref={googleButtonRef} id="google-signin-button"></div>
        
        {/* Demo Login Button - Shows when Google Client ID is not configured */}
        {(!import.meta.env.VITE_GOOGLE_CLIENT_ID || import.meta.env.VITE_GOOGLE_CLIENT_ID === 'your_google_client_id_here') && (
          <div style={{ marginTop: '1rem' }}>
            <div style={{ 
              backgroundColor: '#fff3cd', 
              border: '1px solid #ffeaa7', 
              borderRadius: '4px', 
              padding: '1rem', 
              marginBottom: '1rem' 
            }}>
              <p style={{ fontSize: '14px', color: '#856404', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                ⚠️ Google OAuth Not Configured
              </p>
              <p style={{ fontSize: '12px', color: '#856404', marginBottom: '0' }}>
                Add your Google Client ID to client/.env to enable real Google login
              </p>
            </div>
            <button 
              className="btn btn-primary" 
              onClick={handleDemoLogin}
              style={{ width: '300px' }}
            >
              🚀 Demo Login (Test Mode)
            </button>
            <p style={{ fontSize: '12px', color: '#999', marginTop: '1rem' }}>
              Demo login lets you test all features without Google setup
            </p>
          </div>
        )}
        
        {/* Show loading message when Google is configured but not loaded yet */}
        {(import.meta.env.VITE_GOOGLE_CLIENT_ID && import.meta.env.VITE_GOOGLE_CLIENT_ID !== 'your_google_client_id_here' && !window.google) && (
          <div style={{ marginTop: '1rem' }}>
            <p style={{ fontSize: '14px', color: '#666' }}>Loading Google Sign-In...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login