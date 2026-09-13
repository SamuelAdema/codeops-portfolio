import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlCategory = queryParams.get('category');

  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);     
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || 'All');
  
  // NEW: State to track the sorting order
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    const newCat = new URLSearchParams(location.search).get('category');
    setSelectedCategory(newCat || 'All');
  }, [location.search]);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch data');
        return response.json();
      })
      .then((data) => {
        setProducts(data.products); 
        setLoading(false); 
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); 

  const uniqueCategories = ['All', ...new Set(products.map(p => p.category))];

  // 1. Filter the products first
  let processedProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 2. Sort the products based on the dropdown selection
  if (sortOrder === 'price-low') {
    processedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-high') {
    processedProducts.sort((a, b) => b.price - a.price);
  }

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}><h2>Loading products...</h2></div>;
  if (error) return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}><h2>Error: {error}</h2></div>;

  return (
    <div>
      <h1>All Products</h1>
      
      <div className="filter-controls">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="search-input"
        />

        <select 
          value={selectedCategory} 
          onChange={(event) => setSelectedCategory(event.target.value)}
          className="category-select"
        >
          {uniqueCategories.map((category, index) => (
            <option key={index} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        {/* NEW: The Sort Dropdown */}
        <select 
          value={sortOrder} 
          onChange={(event) => setSortOrder(event.target.value)}
          className="category-select"
        >
          <option value="default">Sort: Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      <div className="products-grid">
        {processedProducts.length > 0 ? (
          processedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p style={{ width: '100%', textAlign: 'center', marginTop: '2rem' }}>
            No products found matching your filters.
          </p>
        )}
      </div>
    </div>
  );
}