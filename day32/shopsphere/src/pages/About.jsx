export default function About() {
  return (
    <div className="about-container">
      <h1>About ShopSphere</h1>
      
      <div className="about-content">
        <p>
          <strong>ShopSphere</strong> is a modern e-commerce web application built as a capstone project 
          to demonstrate advanced React.js development skills.
        </p>
        
        <h3>Technical Highlights:</h3>
        <ul>
          <li><strong>React Router:</strong> Seamless, single-page-application navigation without page reloads.</li>
          <li><strong>Context API:</strong> Global state management to handle complex shopping cart logic.</li>
          <li><strong>Hooks:</strong> Extensive use of <code>useState</code> and <code>useEffect</code> to manage component lifecycles and API data fetching.</li>
          <li><strong>REST APIs:</strong> Integration with DummyJSON for dynamic, real-world product population.</li>
        </ul>
        
        <p style={{ marginTop: '2rem', color: '#666' }}>
          Developed by a passionate frontend developer in 2026.
        </p>
      </div>
    </div>
  );
}