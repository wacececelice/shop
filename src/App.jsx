import React, { useState, useEffect } from 'react';

const App = () => {
  // Sample product data
  const allProducts = [
    {
      id: 1,
      name: 'Smartphone X Pro',
      price: 567.99,
      category: 'Phones',
      brand: 'TechMaster',
      rating: 4.5,
      image: 'https://via.placeholder.com/200x200?text=Smartphone+X+Pro',
      description: 'Flagship smartphone with advanced camera system and long battery life.',
      inStock: true
    },
    {
      id: 2,
      name: 'Ultra HD Smart TV',
      price: 1299.99,
      category: 'Televisions',
      brand: 'VisionPlus',
      rating: 4.7,
      image: 'https://via.placeholder.com/200x200?text=Ultra+HD+Smart+TV',
      description: '65-inch 4K Ultra HD Smart TV with HDR and voice control.',
      inStock: true
    },
    {
      id: 3,
      name: 'Wireless Noise-Canceling Headphones',
      price: 349.99,
      category: 'Audio',
      brand: 'SoundMax',
      rating: 4.3,
      image: 'https://via.placeholder.com/200x200?text=Wireless+Headphones',
      description: 'Premium over-ear headphones with active noise cancellation.',
      inStock: false
    },
    {
      id: 4,
      name: 'Gaming Laptop Elite',
      price: 1599.99,
      category: 'Laptops',
      brand: 'GameTech',
      rating: 4.8,
      image: 'https://via.placeholder.com/200x200?text=Gaming+Laptop+Elite',
      description: 'High-performance gaming laptop with RTX graphics and 144Hz display.',
      inStock: true
    },
    {
      id: 5,
      name: 'Smart Watch Series 5',
      price: 249.99,
      category: 'Wearables',
      brand: 'TechMaster',
      rating: 4.2,
      image: 'https://via.placeholder.com/200x200?text=Smart+Watch+Series+5',
      description: 'Fitness tracking and smartphone notifications on your wrist.',
      inStock: true
    },
    {
      id: 6,
      name: 'Bluetooth Speaker Pro',
      price: 129.99,
      category: 'Audio',
      brand: 'SoundMax',
      rating: 4.0,
      image: 'https://via.placeholder.com/200x200?text=Bluetooth+Speaker+Pro',
      description: 'Portable speaker with 20-hour battery life and waterproof design.',
      inStock: true
    },
    {
      id: 7,
      name: 'Tablet Plus',
      price: 499.99,
      category: 'Tablets',
      brand: 'TechMaster',
      rating: 4.1,
      image: 'https://via.placeholder.com/200x200?text=Tablet+Plus',
      description: '10.5-inch tablet with stylus support and all-day battery.',
      inStock: false
    },
    {
      id: 8,
      name: 'DSLR Camera Pro',
      price: 899.99,
      category: 'Cameras',
      brand: 'PhotoMaster',
      rating: 4.6,
      image: 'https://via.placeholder.com/200x200?text=DSLR+Camera+Pro',
      description: '24.2MP DSLR camera with 4K video and interchangeable lenses.',
      inStock: true
    }
  ];

  // State management
  const [products, setProducts] = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [priceRange, setPriceRange] = useState(2000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortOption, setSortOption] = useState('featured');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filteredProducts = [...allProducts];

    // Apply search filter
    if (searchTerm) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filteredProducts = filteredProducts.filter(
        product => product.category === selectedCategory
      );
    }

    // Apply brand filter
    if (selectedBrand !== 'All') {
      filteredProducts = filteredProducts.filter(
        product => product.brand === selectedBrand
      );
    }

    // Apply price filter
    filteredProducts = filteredProducts.filter(
      product => product.price <= priceRange
    );

    // Apply in stock filter
    if (inStockOnly) {
      filteredProducts = filteredProducts.filter(
        product => product.inStock
      );
    }

    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured (default) sorting - could be based on some business logic
        break;
    }

    setProducts(filteredProducts);
  }, [searchTerm, selectedCategory, selectedBrand, priceRange, inStockOnly, sortOption]);

  // Get unique categories and brands for filters
  const categories = ['All', ...new Set(allProducts.map(product => product.category))];
  const brands = ['All', ...new Set(allProducts.map(product => product.brand))];

  // Handle product selection
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle close product details
  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header"  >
        <h1>TRAP ONLINE SHOP</h1>
        <p>available for sell and delivery your wish</p>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Search and Filters Section */}
        <div className="filters-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </div>

          <div className="filter-controls">
            <div className="filter-group">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="brand">Brand:</label>
              <select
                id="brand"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="price">Max Price: FRW{priceRange}</label>
              <input
                id="price"
                type="range"
                min="0"
                max="1806"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
              />
            </div>

            <div className="filter-group checkbox-group">
              <input
                type="checkbox"
                id="inStock"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              <label htmlFor="inStock">In Stock Only</label>
            </div>

            <div className="filter-group">
              <label htmlFor="sort">Sort By:</label>
              <select
                id="sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Details View */}
        {selectedProduct && (
          <div className="product-details">
            <button className="close-button" onClick={handleCloseDetails}>
              &times;
            </button>
            <div className="details-content">
              <div className="details-image">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              <div className="details-info">
                <h2>{selectedProduct.name}</h2>
                <div className="price-rating">
                  <span className="price">${selectedProduct.price.toFixed(2)}</span>
                  <span className="rating">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${i < Math.floor(selectedProduct.rating) ? 'filled' : ''} ${i === Math.floor(selectedProduct.rating) && selectedProduct.rating % 1 >= 0.5 ? 'half-filled' : ''}`}
                      ></i>
                    ))}
                    <span>({selectedProduct.rating})</span>
                  </span>
                </div>
                <p className="availability">
                  {selectedProduct.inStock ? (
                    <span className="in-stock">In Stock</span>
                  ) : (
                    <span className="out-of-stock">Out of Stock</span>
                  )}
                </p>
                <p className="description">{selectedProduct.description}</p>
                <div className="actions">
                  <button className="add-to-cart" disabled={!selectedProduct.inStock}>
                    Add to Cart
                  </button>
                  <button className="wishlist">
                    <i className="far fa-heart"></i> Wishlist
                  </button>
                </div>
                <div className="specs">
                  <h4>Specifications</h4>
                  <ul>
                    <li><strong>Brand:</strong> {selectedProduct.brand}</li>
                    <li><strong>Category:</strong> {selectedProduct.category}</li>
                    {/* Additional specs could be added here */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Listing */}
        {!selectedProduct && (
          <div className="product-listing">
            {isLoading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Loading products...</p>
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="results-count">
                  Showing {products.length} of {allProducts.length} products
                </div>
                <div className="products-grid">
                  {products.map(product => (
                    <div
                      key={product.id}
                      className={`product-card ${!product.inStock ? 'out-of-stock' : ''}`}
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                        {!product.inStock && (
                          <div className="stock-label">Out of Stock</div>
                        )}
                      </div>
                      <div className="product-info">
                        <h3>{product.name}</h3>
                        <div className="price-rating">
                          <span className="price">${product.price.toFixed(2)}</span>
                          <span className="rating">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <i
                                key={i}
                                className={`fas fa-star ${i < Math.floor(product.rating) ? 'filled' : ''} ${i === Math.floor(product.rating) && product.rating % 1 >= 0.5 ? 'half-filled' : ''}`}
                              ></i>
                            ))}
                          </span>
                        </div>
                        <p className="brand">{product.brand}</p>
                        <button className="quick-view">Quick View</button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="no-results">
                <i className="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Customer Service</h4>
            <ul>
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Returns & Refunds</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>About Us</h4>
            <ul>
              <li>Our Story</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect With Us</h4>
            <div className="social-icons">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
            </div>
          </div>
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} ABC Electronics. All rights reserved.
        </div>
      </footer>

      {/* CSS Styles */}
      <style jsx>{`
        /* Base Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .app {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f5f5f5;
          color: #333;
        }

        /* Header Styles */
        .header {
          background: linear-gradient(135deg, #2c3e50, #4ca1af);
          color: white;
          padding: 2rem;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .header p {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        /* Main Content Styles */
        .main-content {
          flex: 1;
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }

        /* Filters Section */
        .filters-section {
          background-color: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
          margin-bottom: 2rem;
        }

        .search-container {
          display: flex;
          margin-bottom: 1.5rem;
        }

        .search-input {
          flex: 1;
          padding: 0.8rem 1rem;
          border: 1px solid #ddd;
          border-radius: 4px 0 0 4px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.3s;
        }

        .search-input:focus {
          border-color: #4ca1af;
        }

        .search-button {
          background-color: #2c3e50;
          color: white;
          border: none;
          padding: 0 1.2rem;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .search-button:hover {
          background-color: #1a252f;
        }

        .filter-controls {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .filter-group {
          flex: 1;
          min-width: 150px;
        }

        .filter-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #555;
        }

        .filter-group select,
        .filter-group input[type="range"] {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          background-color: white;
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding-top: 1.5rem;
        }

        .checkbox-group input {
          width: auto;
        }

        /* Product Details */
        .product-details {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
          padding: 2rem;
          margin-bottom: 2rem;
          position: relative;
        }

        .close-button {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #777;
          transition: color 0.3s;
        }

        .close-button:hover {
          color: #333;
        }

        .details-content {
          display: flex;
          gap: 2rem;
        }

        .details-image {
          flex: 1;
          max-width: 400px;
        }

        .details-image img {
          width: 100%;
          border-radius: 8px;
          object-fit: cover;
        }

        .details-info {
          flex: 2;
        }

        .details-info h2 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        .price-rating {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1rem;
        }

        .price {
          font-size: 1.5rem;
          font-weight: bold;
          color: #2c3e50;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .rating .fa-star {
          color: #ddd;
        }

        .rating .filled {
          color: #ffc107;
        }

        .rating .half-filled {
          position: relative;
          color: #ddd;
        }

        .rating .half-filled::before {
          content: '\f089';
          position: absolute;
          left: 0;
          color: #ffc107;
        }

        .availability {
          margin-bottom: 1.5rem;
        }

        .in-stock {
          color: #28a745;
          font-weight: 600;
        }

        .out-of-stock {
          color: #dc3545;
          font-weight: 600;
        }

        .description {
          margin-bottom: 1.5rem;
          line-height: 1.6;
          color: #555;
        }

        .actions {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .add-to-cart,
        .wishlist {
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .add-to-cart {
          background-color: #2c3e50;
          color: white;
        }

        .add-to-cart:hover {
          background-color:rgb(113, 59, 124);
        }

        .add-to-cart:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .wishlist {
          background-color: white;
          border: 1px solid #ddd;
          color: #555;
        }

        .wishlist:hover {
          background-color: #f8f9fa;
          border-color: #ccc;
        }

        .specs h4 {
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        .specs ul {
          list-style: none;
        }

        .specs li {
          margin-bottom: 0.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #eee;
        }

        .specs li:last-child {
          border-bottom: none;
        }

        /* Product Listing */
        .product-listing {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 15px rgba(141, 66, 66, 0.05);
          padding: 2rem;
        }

        .results-count {
          margin-bottom: 1.5rem;
          color: #777;
          font-size: 0.9rem;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .product-card {
          border: 1px solid #eee;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s;
          cursor: pointer;
          position: relative;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(85, 57, 57, 0.1);
        }

        .product-card.out-of-stock {
          opacity: 0.7;
        }

        .product-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }

        .product-card:hover .product-image img {
          transform: scale(1.05);
        }

        .stock-label {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color:rgb(56, 22, 59);
          color: white;
          padding: 0.3rem 0.6rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: bold;
        }

        .product-info {
          padding: 1rem;
        }

        .product-info h3 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: #2c3e50;
        }

        .product-info .price-rating {
          margin-bottom: 0.5rem;
        }

        .product-info .price {
          font-size: 1.2rem;
          color: #2c3e50;
        }

        .product-info .brand {
          color: #777;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .quick-view {
          width: 100%;
          padding: 0.5rem;
          background-color:rgb(65, 31, 71);
          border: 1px solid #ddd;
          border-radius: 4px;
          color: #555;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .quick-view:hover {
          background-color:rgb(89, 53, 104);
          border-color: #ccc;
        }

        /* Loading Spinner */
        .loading-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solidrgb(104, 66, 66);
          border-top: 5px solid #2c3e50;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* No Results */
        .no-results {
          text-align: center;
          padding: 3rem;
          color: #777;
        }

        .no-results .fa-search {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #ddd;
        }

        .no-results h3 {
          margin-bottom: 0.5rem;
          color: #555;
        }

        /* Footer */
        .footer {
          background-color:rgb(74, 48, 82);
          color: white;
          padding: 3rem 2rem 1.5rem;
          margin-top: 2rem;
        }

        .footer-content {
          display: flex;
          flex-wrap: wrap;
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
          padding-bottom: 2rem;
        }

        .footer-section {
          flex: 1;
          min-width: 200px;
        }

        .footer-section h4 {
          margin-bottom: 1.5rem;
          font-size: 1.2rem;
        }

        .footer-section ul {
          list-style: none;
        }

        .footer-section li {
          margin-bottom: 0.8rem;
          cursor: pointer;
          transition: color 0.5s;
        }

        .footer-section li:hover {
          color:rgb(156, 77, 175);
        }

        .social-icons {
          display: flex;
          gap: 1rem;
          font-size: 1.5rem;
        }

        .social-icons i {
          cursor: pointer;
          transition: color 0.3s;
        }

        .social-icons i:hover {
          color:rgb(162, 61, 172);
        }

        .copyright {
          text-align: center;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 1.5rem;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.99);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .details-content {
            flex-direction: column;
          }

          .details-image {
            max-width: 100%;
          }

          .filter-controls {
            flex-direction: column;
            gap: 1rem;
          }

          .checkbox-group {
            padding-top: 0;
          }
        }

        @media (max-width: 480px) {
          .header h1 {
            font-size: 2rem;
          }

          .main-content {
            padding: 1rem;
          }

          .actions {
            flex-direction: column;
          }

          .add-to-cart,
          .wishlist {
            width: 100%;
          }
        }
      `}</style>

      {/* Font Awesome for icons */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />
    </div>
  );
};

export default App;