import ProductCard from "../components/ProductCard";
import products from "../data/products";
import "./Home.css";

function Home() {
  return (
    <>
      <section className="hero">
        <h1>Welcome to Dhanjo</h1>
        <p>Discover premium technology products for professionals and enthusiasts</p>
      </section>

      <section className="products">
        <h2>Featured Products</h2>

        <div className="product-list">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
