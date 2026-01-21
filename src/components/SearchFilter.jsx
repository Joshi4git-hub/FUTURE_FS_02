import React, { useState, useCallback, useMemo } from 'react';
import { useProductFilters } from '../context/AppContext';
import { useDebouncedSearch } from '../hooks/useCustomHooks';
import { filterProducts, sortProducts } from '../utils/helpers';
import './SearchFilter.css';

const SearchFilter = ({ products = [], onResultsChange = () => {} }) => {
  const { filters, sortBy, updateFilters, setSortBy, resetFilters } = useProductFilters();
  const [priceRange, setPriceRange] = useState(filters.priceRange);
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories
  useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    setCategories(uniqueCategories);
  }, [products]);

  // Debounced search
  const debouncedSearch = useDebouncedSearch(filters.searchQuery, 300);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = filterProducts(products, {
      ...filters,
      priceRange
    });
    result = sortProducts(result, sortBy);
    return result;
  }, [products, filters, priceRange, sortBy]);

  // Notify parent of changes
  React.useEffect(() => {
    onResultsChange(filteredProducts);
  }, [filteredProducts, onResultsChange]);

  const handleSearchChange = useCallback((e) => {
    updateFilters({ searchQuery: e.target.value });
  }, [updateFilters]);

  const handlePriceChange = useCallback((e, type) => {
    const value = parseInt(e.target.value);
    const newRange = type === 'min' 
      ? [Math.min(value, priceRange[1]), priceRange[1]]
      : [priceRange[0], Math.max(value, priceRange[0])];
    setPriceRange(newRange);
    updateFilters({ priceRange: newRange });
  }, [priceRange, updateFilters]);

  const handleCategoryChange = useCallback((category) => {
    updateFilters({ 
      category: filters.category === category ? null : category 
    });
  }, [filters.category, updateFilters]);

  const handleRatingChange = useCallback((rating) => {
    updateFilters({ 
      rating: filters.rating === rating ? 0 : rating 
    });
  }, [filters.rating, updateFilters]);

  return (
    <div className="search-filter-section">
      {/* Search Bar */}
      <div className="search-bar-wrapper">
        <div className="search-bar">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Search products, brands..."
            value={filters.searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          {filters.searchQuery && (
            <button 
              className="clear-search"
              onClick={() => updateFilters({ searchQuery: '' })}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="search-layout">
        {/* Filters Sidebar */}
        <aside className={`filters-sidebar ${showFilters ? 'open' : ''}`}>
          <div className="filters-header">
            <h3>Filters</h3>
            <button 
              className="close-filters"
              onClick={() => setShowFilters(false)}
            >
              ✕
            </button>
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <h4>Category</h4>
            <div className="filter-options">
              {categories.map(category => (
                <label key={category} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.category === category}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <span className="category-label">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="filter-group">
            <h4>Price Range</h4>
            <div className="price-inputs">
              <input
                type="number"
                min="0"
                max={priceRange[1]}
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(e, 'min')}
                placeholder="Min"
                className="price-input"
              />
              <span>-</span>
              <input
                type="number"
                min={priceRange[0]}
                max="20000"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(e, 'max')}
                placeholder="Max"
                className="price-input"
              />
            </div>
            <input
              type="range"
              min="0"
              max="20000"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(e, 'max')}
              className="price-slider"
            />
            <div className="price-display">
              ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="filter-group">
            <h4>Rating</h4>
            <div className="filter-options">
              {[5, 4, 3, 2, 1].map(rating => (
                <label key={rating} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.rating === rating}
                    onChange={() => handleRatingChange(rating)}
                  />
                  <span className="rating-label">
                    <span className="stars">{'★'.repeat(rating)}</span>
                    <span className="rating-text">{rating}+ Stars</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Reset Filters */}
          {(filters.category || filters.rating > 0 || priceRange[0] > 0 || priceRange[1] < 20000) && (
            <button 
              className="reset-filters-btn"
              onClick={resetFilters}
            >
              Reset All Filters
            </button>
          )}
        </aside>

        {/* Main Content */}
        <main className="search-results">
          {/* Sort and View Options */}
          <div className="results-header">
            <div className="results-info">
              <span className="results-count">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </span>
            </div>

            <div className="sort-controls">
              <label htmlFor="sort-select">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="relevant">Most Relevant</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              className="toggle-filters-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              Filters
            </button>
          </div>

          {/* Results */}
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-result-item">
                  <img src={product.image} alt={product.name} />
                  <h5>{product.name}</h5>
                  <div className="product-rating">
                    <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
                    <span className="rating-count">({product.reviewCount})</span>
                  </div>
                  <div className="product-price">₹{product.price.toLocaleString()}</div>
                  <button className="quick-view-btn">Quick View</button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <h4>No products found</h4>
              <p>Try adjusting your filters or search terms</p>
              <button 
                className="reset-btn"
                onClick={resetFilters}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchFilter;
