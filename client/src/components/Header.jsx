import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1>Vendor Management System</h1>
        </Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img 
          src={user.picture} 
          alt={user.name}
          style={{ width: '40px', height: '40px', borderRadius: '50%' }}
        />
        <span>Welcome, {user.name}</span>
        <button className="btn btn-secondary" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header