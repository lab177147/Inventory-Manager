import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm'; 

const API_URL = 'http://localhost:3000/products';

function AddProduct() {
  const navigate = useNavigate();

  const handleAdd = async (formData) => {
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
    <ProductForm 
      title="Create new item" 
      buttonLabel="Save item" 
      onSubmit={handleAdd} 
    />
  );
}

export default AddProduct;