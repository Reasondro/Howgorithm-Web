import { Link } from "react-router-dom";
import "@/pages/Home/Home.css";

export default function Home() {
  return (
    <main id="main-wrapper">
      <section id="hero">
        <div className="hero-content">
          <h1>Welcome to HOWGORITHM</h1>
          <p>
            Dive into the world of algorithms with our interactive virtual lab.
            Explore, learn, and visualize how algorithms work step by step.
          </p>
          <Link to="/binary-search" className="cta-button">
            Get Started
          </Link>
        </div>
      </section>

      <section id="features">
        <h2>Why Learn with HOWGORITHM?</h2>
        <div className="feature-grid">
          <div className="feature-item">
            {/* <!-- <img src="/icons/interactive.svg" alt="Interactive Learning" /> --> */}
            <h3>Interactive Learning</h3>
            <p>
              Engage with algorithms interactively. Modify inputs and see
              real-time visualizations.
            </p>
          </div>
          <div className="feature-item">
            {/* <!-- <img src="/icons/visualize.svg" alt="Visualizations" /> --> */}
            <h3>Step-by-Step Visualizations</h3>
            <p>
              Understand each step of the algorithm with detailed explanations
              and visuals.
            </p>
          </div>
          <div className="feature-item">
            {/* <!-- <img src="/icons/comprehensive.svg" alt="Comprehensive Content" /> --> */}
            <h3>Comprehensive Content</h3>
            <p>
              Explore a wide range of algorithms, from sorting and searching to
              more advanced topics.
            </p>
          </div>
        </div>
      </section>

      <section id="popular-algorithms">
        <h2>Explore Popular Algorithms</h2>
        <div className="algorithms-grid">
          <div className="algorithm-card">
            {/* <!-- <img src="/images/binary-search.png" alt="Binary Search" /> --> */}
            <h3>Binary Search</h3>
            <p>Efficiently find elements in sorted arrays.</p>
            <Link to="/binary-search" className="learn-more">
              Learn More
            </Link>
          </div>
          <div className="algorithm-card">
            {/* <!-- <img src="/images/quick-sort.png" alt="Quick Sort" /> --> */}
            <h3>Quick Sort</h3>
            <p>Sort data quickly using divide and conquer.</p>
            <Link to="quick-sort" className="learn-more">
              Learn More
            </Link>
          </div>
          <div className="algorithm-card">
            {/* <!-- <img src="/images/bubble-sort.png" alt="Bubble Sort" /> --> */}
            <h3>Bubble Sort</h3>
            <p>Understand the basics with this simple sorting algorithm.</p>
            <Link to="/bubble-sort" className="learn-more">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section id="motto">
        <h2>Happy learning!</h2>
      </section>
    </main>
  );
}
