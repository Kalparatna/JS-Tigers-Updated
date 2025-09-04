import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { vendorAPI } from '../utils/api';

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchVendors();
  }, [currentPage]);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const response = await vendorAPI.getVendors(currentPage, 10);
      console.log('API Response:', response.data); // Debugging log
      
      // Handle both old and new response formats
      if (Array.isArray(response.data)) {
        // Old format - direct array
        setVendors(response.data);
        setTotalPages(1);
      } else {
        // New format - object with vendors array
        setVendors(response.data.vendors || []);
        setTotalPages(response.data.totalPages || 1);
      }
      setError('');
    } catch (err) {
      console.error('Failed to fetch vendors:', err);
      setError(`Failed to fetch vendors: ${err.response?.data?.error || err.message}`);
      setVendors([]); // Ensure vendors is always an array
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, vendorName) => {
    if (window.confirm(`Are you sure you want to delete vendor "${vendorName}"?`)) {
      try {
        await vendorAPI.deleteVendor(id);
        setError(''); // Clear any previous errors
        fetchVendors(); // Refresh the list
      } catch (err) {
        console.error('Error deleting vendor:', err);
        setError(`Failed to delete vendor: ${err.response?.data?.error || err.message}`);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading vendors...</div>;
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

      {Array.isArray(vendors) && vendors.length > 0 ? (
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
      ) : (
        <div className="card">
          <p>No vendors found. <Link to="/vendors/new">Add your first vendor</Link></p>
        </div>
      )}
    </div>
  );
};

export default VendorList;