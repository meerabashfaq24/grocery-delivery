import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {

  const token = localStorage.getItem("token");

  return (
    <>

      <section className="hero">

        <h1>
          Fresh Groceries Delivered To Your Doorstep
        </h1>

        <p>
          Shop fresh fruits, vegetables, dairy products,
          bakery items and much more at affordable prices.
        </p>

        <div className="hero-buttons">

          {token ? (

            <Link
              to="/products"
              className="primary-btn"
            >
              Shop Now
            </Link>

          ) : (

            <>
              <Link
                to="/login"
                className="primary-btn"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="secondary-btn"
              >
                Register
              </Link>
            </>

          )}

        </div>

      </section>

      <section className="categories">

        <h2>Shop By Category</h2>

        <div className="category-grid">

          <div className="category-card">🥬 Vegetables</div>

          <div className="category-card">🍎 Fruits</div>

          <div className="category-card">🥛 Dairy</div>

          <div className="category-card">🥖 Bakery</div>

          <div className="category-card">🍗 Meat</div>

          <div className="category-card">🌾 Grocery</div>

        </div>

      </section>

    </>
  );

}