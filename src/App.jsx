import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // State for products
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  // State for registration form
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: '',
    gender: '',
    country: '',
    password: '',
    confirmPassword: ''
  });
  
  // State for active tab
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  
  // Categories for products
  const categories = ['Smartphones', 'Laptops', 'Tablets', 'Accessories', 'Cameras', 'TVs'];

  // Fetch products (simulated with useEffect)
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockProducts = [
        { id: 1, name: 'iPhone 13 Pro', price: 234500, category: 'Smartphones', description: 'Latest iPhone with A15 Bionic chip', image: 'https://via.placeholder.com/400x300?text=iPhone+13+Pro' },
        { id: 2, name: 'MacBook Pro 14"', price: 959700, category: 'Laptops', description: 'Powerful laptop with M1 Pro chip', image: 'https://via.placeholder.com/400x300?text=MacBook+Pro+14' },
        { id: 3, name: 'iPad Air', price: 54000, category: 'Tablets', description: 'Thin and light tablet with M1 chip', image: 'https://via.placeholder.com/400x300?text=iPad+Air' },
        { id: 4, name: 'AirPods Pro', price: 23000, category: 'Accessories', description: 'Noise cancelling wireless earbuds', image: 'https://via.placeholder.com/400x300?text=AirPods+Pro' },
        { id: 5, name: 'Sony A7 IV', price: 1400000, category: 'Cameras', description: 'Full-frame mirrorless camera', image: 'https://via.placeholder.com/400x300?text=Sony+A7+IV' },
        { id: 6, name: 'Samsung QLED 65"', price: 357000, category: 'TVs', description: '4K Smart TV with Quantum Dot technology', image: 'https://via.placeholder.com/400x300?text=Samsung+QLED' },
        { id: 7, name: 'Galaxy S22 Ultra', price: 785800, category: 'Smartphones', description: 'Samsung flagship with S Pen', image: 'https://via.placeholder.com/400x300?text=Galaxy+S22+Ultra' },
        { id: 8, name: 'Dell XPS 15', price: 654000, category: 'Laptops', description: 'Premium Windows laptop', image: 'https://via.placeholder.com/400x300?text=Dell+XPS+15' },
      ];
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter products based on search and filters
  useEffect(() => {
    let result = products;
    
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter) {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    if (priceFilter) {
      const [min, max] = priceFilter.split('-').map(Number);
      result = result.filter(product => product.price >= min && product.price <= max);
    }
    
    setFilteredProducts(result);
  }, [searchTerm, categoryFilter, priceFilter, products]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registration successful!\nWelcome ${formData.fullName}`);
    setIsRegistering(false);
    setFormData({
      fullName: '',
      email: '',
      location: '',
      gender: '',
      country: '',
      password: '',
      confirmPassword: ''
    });
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setPriceFilter('');
  };

  // Add to cart function
  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  // Format price with commas
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="logo-highlight">23</span> ONLINE SHOP
        </div>
        <ul className="nav-links">
          <li className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>Home</li>
          <li className={activeTab === 'about' ? 'active' : ''} onClick={() => setActiveTab('about')}>About Us</li>
          <li className={activeTab === 'contact' ? 'active' : ''} onClick={() => setActiveTab('contact')}>Contact Us</li>
          <li onClick={() => setIsRegistering(true)}>Register</li>
          <li className="cart-icon" onClick={() => alert(`You have ${cart.length} items in your cart`)}>
            <i className="fas fa-shopping-cart"></i> ({cart.length})
          </li>
        </ul>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fas fa-search search-icon"></i>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {isRegistering ? (
          <div className="registration-modal">
            <div className="registration-form">
              <h2>Create Your Account</h2>
              <button className="close-btn" onClick={() => setIsRegistering(false)}>×</button>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>Location</label>
                  <input 
                    type="text" 
                    name="location" 
                    value={formData.location} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Country</label>
                  <input 
                    type="text" 
                    name="country" 
                    value={formData.country} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input 
                    type="password" 
                    name="confirmPassword" 
                    value={formData.confirmPassword} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                
                <button type="submit" className="submit-btn">Register</button>
              </form>
            </div>
          </div>
        ) : null}

        {activeTab === 'home' && (
          <>
            {selectedProduct ? (
              <div className="product-detail">
                <button className="back-btn" onClick={() => setSelectedProduct(null)}>
                  <i className="fas fa-arrow-left"></i> Back to Products
                </button>
                <div className="detail-container">
                  <div className="detail-image">
                    <img src={selectedProduct.image} alt={selectedProduct.name} />
                    <div className="product-badge">Hot Deal</div>
                  </div>
                  <div className="detail-info">
                    <h2>{selectedProduct.name}</h2>
                    <p className="price">FRW {formatPrice(selectedProduct.price)}</p>
                    <p className="category">{selectedProduct.category}</p>
                    <div className="rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                      <span>(24 reviews)</span>
                    </div>
                    <p className="description">{selectedProduct.description}</p>
                    <div className="action-buttons">
                      <button className="add-to-cart" onClick={() => addToCart(selectedProduct)}>
                        <i className="fas fa-shopping-cart"></i> ADD TO CART
                      </button>
                      <button className="buy-now">
                        <i className="fas fa-bolt"></i> BUY NOW
                      </button>
                    </div>
                    <div className="product-meta">
                      <div className="meta-item">
                        <i className="fas fa-shield-alt"></i>
                        <span>1 Year Warranty</span>
                      </div>
                      <div className="meta-item">
                        <i className="fas fa-truck"></i>
                        <span>Free Delivery</span>
                      </div>
                      <div className="meta-item">
                        <i className="fas fa-undo"></i>
                        <span>7-Day Returns</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="hero-banner">
                  <div className="hero-content">
                    <h1>Welcome to 23 ONLINE SHOP</h1>
                    <p>Discover the latest electronics at unbeatable prices</p>
                    <button className="shop-now-btn">SHOP NOW</button>
                  </div>
                </div>
                
                <div className="filters-container">
                  <div className="filters">
                    <h2><i className="fas fa-filter"></i> Filters</h2>
                    <div className="filter-group">
                      <label>Category</label>
                      <select 
                        value={categoryFilter} 
                        onChange={(e) => setCategoryFilter(e.target.value)}
                      >
                        <option value="">All Categories</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="filter-group">
                      <label>Price Range</label>
                      <select 
                        value={priceFilter} 
                        onChange={(e) => setPriceFilter(e.target.value)}
                      >
                        <option value="">All Prices</option>
                        <option value="0-100000">Under FRW 100,000</option>
                        <option value="100000-500000">FRW 100,000 - 500,000</option>
                        <option value="500000-1000000">FRW 500,000 - 1,000,000</option>
                        <option value="1000000-9999000">Over FRW 1,000,000</option>
                      </select>
                    </div>
                    
                    <button className="reset-btn" onClick={resetFilters}>
                      <i className="fas fa-sync-alt"></i> Reset Filters
                    </button>
                  </div>
                </div>
                
                <div className="product-listing">
                  <div className="section-header">
                    <h2>Our Products</h2>
                    <div className="sort-options">
                      <span>Sort by:</span>
                      <select>
                        <option>Featured</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Newest Arrivals</option>
                      </select>
                    </div>
                  </div>
                  
                  {loading ? (
                    <div className="loading-container">
                      <div className="loading-spinner"></div>
                      <p>Loading products...</p>
                    </div>
                  ) : filteredProducts.length === 0 ? (
                    <div className="no-results">
                      <i className="fas fa-search"></i>
                      <p>No products found matching your criteria.</p>
                      <button onClick={resetFilters}>Reset Filters</button>
                    </div>
                  ) : (
                    <div className="products-grid">
                      {filteredProducts.map(product => (
                        <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
                          <div className="product-image">
                            <img src={product.image} alt={product.name} />
                            <div className="product-badge">New</div>
                            <button className="quick-view" onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProduct(product);
                            }}>
                              <i className="fas fa-eye"></i> Quick View
                            </button>
                          </div>
                          <div className="product-info">
                            <h3>{product.name}</h3>
                            <p className="price">FRW {formatPrice(product.price)}</p>
                            <p className="category">{product.category}</p>
                            <div className="rating">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="far fa-star"></i>
                            </div>
                            <button className="add-to-cart-btn" onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}>
                              <i className="fas fa-cart-plus"></i> Add to Cart
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}

        {activeTab === 'about' && (
          <div className="about-section">
            <div className="about-header">
              <h1>About 23 ONLINE SHOP</h1>
              <p>Your trusted electronics retailer in Rwanda</p>
            </div>
            <div className="about-content">
              <div className="about-image">
                <img src="https://via.placeholder.com/800x500?text=Our+Store" alt="Our Store" />
              </div>
              <div className="about-text">
                <h2>Our Story</h2>
                <p>Welcome to 23 ONLINE SHOP, your premier destination for cutting-edge technology and electronic devices in Rwanda. Founded in 2025, we've grown from a small local shop to the leading e-commerce platform for electronics in the Eastern Province.</p>
                <p>Our mission is to provide high-quality products with exceptional customer service at competitive prices. We carefully select all our products to ensure they meet the highest standards of quality and performance.</p>
                
                <div className="about-features">
                  <div className="feature">
                    <i className="fas fa-check-circle"></i>
                    <h3>Authentic Products</h3>
                    <p>All our products are 100% genuine with manufacturer warranties</p>
                  </div>
                  <div className="feature">
                    <i className="fas fa-truck"></i>
                    <h3>Fast Delivery</h3>
                    <p>Same-day delivery available in Gisenyi and surrounding areas</p>
                  </div>
                  <div className="feature">
                    <i className="fas fa-headset"></i>
                    <h3>24/7 Support</h3>
                    <p>Our customer service team is always ready to assist you</p>
                  </div>
                </div>
                
                <h3>Our Location</h3>
                <p><i className="fas fa-map-marker-alt"></i> Gisenyi, near public beach, Rwanda</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="contact-section">
            <div className="contact-header">
              <h1>Contact Us</h1>
              <p>We'd love to hear from you</p>
            </div>
            <div className="contact-container">
              <div className="contact-info">
                <h2><i className="fas fa-envelope"></i> Get in Touch</h2>
                <div className="info-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <h3>Address</h3>
                    <p>Gisenyi, near public beach, Rwanda</p>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fas fa-phone-alt"></i>
                  <div>
                    <h3>Phone</h3>
                    <p>+250 790011137</p>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <h3>Email</h3>
                    <p>onlineshop@gmail.com</p>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fas fa-clock"></i>
                  <div>
                    <h3>Hours</h3>
                    <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 4:00 PM</p>
                  </div>
                </div>
                
                <h2 className="social-title">Follow Us</h2>
                <div className="social-media">
                  <a href="https://www.facebook.com/julesdrigo/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://www.instagram.com/muhetooo/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </div>
              
              <div className="contact-form">
                <h2><i className="fas fa-paper-plane"></i> Send Us a Message</h2>
                <form>
                  <div className="form-group">
                    <input type="text" placeholder="Your Name" required />
                  </div>
                  <div className="form-group">
                    <input type="email" placeholder="Your Email" required />
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Subject" required />
                  </div>
                  <div className="form-group">
                    <textarea placeholder="Your Message" rows="5" required></textarea>
                  </div>
                  <button type="submit" className="submit-btn">
                    <i className="fas fa-paper-plane"></i> Send Message
                  </button>
                </form>
              </div>
            </div>
            
            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.634073509567!2d29.25410981475398!3d-1.6928369987293867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwNDEnMzQuMiJTIDI5wrAxNScyMS4xIkU!5e0!3m2!1sen!2srw!4v1620000000000!5m2!1sen!2srw" 
                width="100%" 
                height="450" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy"
                title="Our Location"
              ></iframe>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>23 ONLINE SHOP</h3>
            <p>Your trusted electronics retailer in Rwanda, offering the latest gadgets at competitive prices with exceptional customer service.</p>
            <div className="footer-social">
              <a href="https://www.facebook.com/julesdrigo/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
              <a href="https://www.instagram.com/muhetooo/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#" onClick={() => setActiveTab('home')}>Home</a></li>
              <li><a href="#" onClick={() => setActiveTab('about')}>About Us</a></li>
              <li><a href="#" onClick={() => setActiveTab('contact')}>Contact Us</a></li>
              <li><a href="#" onClick={() => setIsRegistering(true)}>Register</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Categories</h3>
            <ul>
              {categories.map(category => (
                <li key={category}>
                  <a href="#" onClick={() => { setActiveTab('home'); setCategoryFilter(category); }}>
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Info</h3>
            <ul className="contact-list">
              <li><i className="fas fa-map-marker-alt"></i> Gisenyi, near public beach, Rwanda</li>
              <li><i className="fas fa-phone-alt"></i> +250 790011137</li>
              <li><i className="fas fa-envelope"></i> onlineshop@gmail.com</li>
              <li><i className="fas fa-clock"></i> Mon-Fri: 8AM - 6PM</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Newsletter</h3>
            <p>Subscribe to our newsletter for the latest products and offers</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your Email Address" required />
              <button type="submit">
                <i className="fas fa-paper-plane"></i> Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="payment-methods">
            <i className="fab fa-cc-visa"></i>
            <i className="fab fa-cc-mastercard"></i>
            <i className="fab fa-cc-paypal"></i>
            <i className="fab fa-cc-mtn"></i>
            <i className="fab fa-cc-airtel"></i>
          </div>
          <p>&copy; {new Date().getFullYear()} 23 ONLINE SHOP. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;