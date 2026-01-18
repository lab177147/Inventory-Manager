import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const API_URL = 'http://localhost:3000/products';

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price)
      };
      
      await axios.post(API_URL, payload);
      navigate('/');
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="container form-page-container">
      <h1 className="title">Create new item</h1>
      
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            name="title" 
            className="form-input"
            value={formData.title} 
            onChange={handleChange} 
            required 
            placeholder="Name of the product"
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input 
            type="number" 
            name="price" 
            className="form-input form-input-short"
            value={formData.price} 
            onChange={handleChange} 
            step="0.01" 
            required 
            placeholder="0.00"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea 
            name="description" 
            className="form-input form-textarea"
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Product description..."
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-save-text" onClick={() => navigate('/')}>
            Cancel
          </button>
          <button type="submit" className="btn-cancel-dark">
            Save item
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;