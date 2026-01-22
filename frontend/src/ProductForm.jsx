import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductForm({ initialData = {}, onSubmit, title, buttonLabel }) {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        title: initialData.title || '',
        price: initialData.price || '',
        description: initialData.description || ''
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (Number(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (formData.description.length > 500) {
      newErrors.description = 'Description is too long (max 500 chars)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="container form-page-container">
      <h1 className="title">{title}</h1>
      
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            name="title" 
            className={`form-input ${errors.title ? 'input-error' : ''}`}
            value={formData.title} 
            onChange={handleChange} 
            placeholder="Name of the product"
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label>Price</label>
          <input 
            type="number" 
            name="price" 
            className={`form-input form-input-short ${errors.price ? 'input-error' : ''}`}
            value={formData.price} 
            onChange={handleChange} 
            step="0.01" 
            placeholder="0.00"
          />
          {errors.price && <span className="error-text">{errors.price}</span>}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea 
            name="description" 
            className={`form-input form-textarea ${errors.description ? 'input-error' : ''}`}
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Product description..."
          />
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel-dark"  onClick={() => navigate('/')}>
            Cancel
          </button>
          <button type="submit" className="btn-save-text">
            {buttonLabel}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;