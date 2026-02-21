import './App.css'

function App() {
  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">Brand</div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
      
      <section className="hero">
        <h1>Welcome to Our Platform</h1>
        <p>Build amazing experiences with modern technology</p>
        <button className="cta-button">Get Started</button>
      </section>
      
      <section className="features" id="features">
        <div className="feature-card">
          <h3>Fast</h3>
          <p>Lightning-fast performance</p>
        </div>
        <div className="feature-card">
          <h3>Secure</h3>
          <p>Enterprise-grade security</p>
        </div>
        <div className="feature-card">
          <h3>Scalable</h3>
          <p>Grows with your needs</p>
        </div>
      </section>
    </div>
  )
}

export default App