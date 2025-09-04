import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { vendorAPI } from '../utils/api'

const VendorForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({
    vendorName: '',
    bankAccountNo: '',
    bankName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    zipCode: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (isEdit) {
      fetchVendor()
    }
  }, [id, isEdit])

  const fetchVendor = async () => {
    try {
      setLoading(true)
      const response = await vendorAPI.getVendor(id)
      setFormData(response.data)
      setError('')
    } catch (err) {
      console.error('Error fetching vendor:', err)
      setError(`Failed to fetch vendor details: ${err.response?.data?.error || err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (isEdit) {
        await vendorAPI.updateVendor(id, formData)
        setSuccess('Vendor updated successfully!')
      } else {
        await vendorAPI.createVendor(formData)
        setSuccess('Vendor created successfully!')
      }
      
      setTimeout(() => {
        navigate('/')
      }, 1500)
    } catch (err) {
      console.error('Error saving vendor:', err)
      setError(err.response?.data?.error || `Failed to ${isEdit ? 'update' : 'create'} vendor: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  if (loading && isEdit) {
    return <div className="loading">Loading vendor details...</div>
  }

  return (
    <div>
      <h2>{isEdit ? 'Edit Vendor' : 'Add New Vendor'}</h2>
      
      <div className="card">
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="vendorName">Vendor Name *</label>
            <input
              type="text"
              id="vendorName"
              name="vendorName"
              className="form-control"
              value={formData.vendorName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bankAccountNo">Bank Account No. *</label>
            <input
              type="text"
              id="bankAccountNo"
              name="bankAccountNo"
              className="form-control"
              value={formData.bankAccountNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bankName">Bank Name *</label>
            <input
              type="text"
              id="bankName"
              name="bankName"
              className="form-control"
              value={formData.bankName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="addressLine1">Address Line 1</label>
            <input
              type="text"
              id="addressLine1"
              name="addressLine1"
              className="form-control"
              value={formData.addressLine1}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="addressLine2">Address Line 2 *</label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              className="form-control"
              value={formData.addressLine2}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              className="form-control"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              className="form-control"
              value={formData.country}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="zipCode">Zip Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              className="form-control"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : (isEdit ? 'Update Vendor' : 'Create Vendor')}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VendorForm