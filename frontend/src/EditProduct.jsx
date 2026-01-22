import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from './ProductForm';

const API_URL = 'http://localhost:3000/products';

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Couldn't get item data.");
        navigate('/');
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleUpdate = async (formData) => {
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price)
      };
      
      await axios.put(`${API_URL}/${id}`, payload);
      navigate('/');
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  if (!productData) return <div className="container">Loading...</div>;

  return (
    <ProductForm 
      title="Edit item" 
      buttonLabel="Update item" 
      initialData={productData}
      onSubmit={handleUpdate} 
    />
  );
}

export default EditProduct;