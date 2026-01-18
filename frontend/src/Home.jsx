import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const API_URL = 'http://localhost:3000/products';

function App() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const ITEMS_PER_PAGE = 5; 

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, {
        params: {
          page: page,
          limit: ITEMS_PER_PAGE 
        }
      });

      if (response.data.data) {
        setProducts(response.data.data);
        const totalItems = response.data.total;
        setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));
      } else {
        setProducts(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Data download error:", error);
      setLoading(false);
    }
  };


  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length > 2) {
      try {
        const response = await axios.get(`${API_URL}/search?title=${term}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Search error:", error);
      }
    } else if (term.length === 0) {
      fetchProducts();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchProducts();
      } catch (error) {
        alert("Couldn't delete");
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16).replace('T', ' ');
  };

  const getPaginationGroup = () => {
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);

    if (end - start < 4) {
        if (start === 1) {
            end = Math.min(5, totalPages);
        } else {
            start = Math.max(1, totalPages - 4);
        }
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    return pages;
  };

  return (
    <div className="container">
      <h1 className="title">Inventory Manager</h1>

<div className="toolbar">
        <div className="search-wrapper">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <button className="add-btn" onClick={() => navigate('/add')}>
          <Plus size={28} strokeWidth={2.5} />
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th style={{ width: '60px' }}>ID</th>
              <th>title</th>
              <th>price</th>
              <th className="text-center">created at</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="text-center">Loading data...</td></tr>
            ) : products.length > 0 ? (
              products.map(p => (
                <tr key={p.id}>
                  <td className="text-light">{p.id}</td>
                  <td>{p.title}</td>
                  <td className="text-light">{p.price}$</td>
                  <td className="text-center text-light">{formatDate(p.created_at)}</td>
                  <td className="actions">
                    <button className="action-link" onClick={() => navigate(`/edit/${p.id}`)}>edit</button>
                    <span className="separator">|</span>
                    <button className="action-link" onClick={() => handleDelete(p.id)}>delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="text-center">No items. Check backend.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button 
          className="page-nav" 
          disabled={page === 1} 
          onClick={() => setPage(p => Math.max(1, p - 1))}
        >
          &larr; Previous
        </button>

        {getPaginationGroup()[0] > 1 && (
          <>
            <button className="page-num" onClick={() => setPage(1)}>1</button>
            {getPaginationGroup()[0] > 2 && <span className="dots">...</span>}
          </>
        )}

        {getPaginationGroup().map((pageNum) => (
          <button 
            key={pageNum}
            className={`page-num ${page === pageNum ? 'active' : ''}`} 
            onClick={() => setPage(pageNum)}
          >
            {pageNum}
          </button>
        ))}

        {getPaginationGroup()[getPaginationGroup().length - 1] < totalPages && (
          <>
            {getPaginationGroup()[getPaginationGroup().length - 1] < totalPages - 1 && <span className="dots">...</span>}
            <button className="page-num" onClick={() => setPage(totalPages)}>{totalPages}</button>
          </>
        )}

        <button 
          className="page-nav" 
          disabled={page === totalPages}
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}

export default App;