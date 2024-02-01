import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div>
        <h3>Where in the World?</h3>
      </div>

      <div>
        {/* Link to the CountryComparison page */}
        <Link to="/country-comparison">
          <button className="comparison-button">Comparison</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
