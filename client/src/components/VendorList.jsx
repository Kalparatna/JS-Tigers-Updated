import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { vendorAPI } from '../utils/api'
import ConfirmDialog from './ConfirmDialog'

const VendorList = () => {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchVendors()
  }, [currentPage])

  const fetchVendors = async () => {
    try {
      setLoading(true)
      const response = await vendorAPI.getVendors(currentPage, 10)
      setVendors(response.data.vendors)
      setTotalPages(response.data.totalPages)
      setError('')
    } catch (err) {
      setError('Failed to fetch vendors')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, vendorName) => {
    if (window.confirm(`Are you sure you want to delete vendor "${vendorName}"?`)) {
      try {
        await vendorAPI.deleteVendor(id)
        fetchVendors() // Refresh the list
      } catch (err) {
        setError('Failed to delete vendor')
      }
    }
  }

  if (loading) {
    return <div className="loading">Loading vendors...</div>
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Vendors</h2>
        <Link to="/vendors/new" className="btn btn-primary">
          Add New Vendor
        </Link>
      </div>

      {error && <div className="error">{error}</div>}

      {vendors.length === 0 ? (
        <div className="card">
          <p>No vendors found. <Link to="/vendors/new">Add your first vendor</Link></p>
        </div>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Vendor Name</th>
                <th>Bank Account No.</th>
                <th>Bank Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor._id}>
                  <td>{vendor.vendorName}</td>
                  <td>{vendor.bankAccountNo}</td>
                  <td>{vendor.bankName}</td>
                  <td>
                    <Link 
                      to={`/vendors/edit/${vendor._id}`} 
                      className="btn btn-primary"
                      style={{ marginRight: '10px' }}
                    >
                      Edit
                    </Link>
                    <button 
                      className="btn btn-danger"
                      onClick={() => handleDelete(vendor._id, vendor.vendorName)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="btn btn-secondary"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button 
                className="btn btn-secondary"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default VendorList