import React, { useState } from "react";
import products from "../data/products";
import SearchFilter from "../components/SearchFilter";
import ProductCard from "../components/ProductCard";
import "./Products.css";

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  return (
    <section className="products-section">
      <div className="products-header">
        <h1>Browse Our Products</h1>
        <p>Discover our complete range of premium tech products</p>
      </div>
      
      <SearchFilter 
        products={products}
        onResultsChange={setFilteredProducts}
      />

      {/* Fallback grid view */}
      <div className="products-grid-fallback">
        {filteredProducts.slice(0, 12).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
