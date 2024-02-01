import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Filter from './components/Filter';
import Countries from './components/Countries';
import CountryComparison from './components/CountryComparison';

const App = () => {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('filter by region');

  const handleFilterChange = (searchTerm, selectedRegion) => {
    setSearch(searchTerm);
    setRegion(selectedRegion);
  };

  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/country-comparison" element={<CountryComparison />} />
          <Route
            path="/"
            element={
              <>
                <Filter onFilterChange={handleFilterChange} />
                <Countries search={search} region={region} />
              </>
            }
          />
        </Routes>
      </>
    </Router>
  );
};

export default App;
