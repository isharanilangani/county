import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('filter by region');

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    onFilterChange(value, selectedRegion);
  };

  const handleRegionChange = (event) => {
    const { value } = event.target;
    setSelectedRegion(value);
    onFilterChange(searchTerm, value);
  };

  return (
    <section className='filter'>
      <form className='form-control'>
        <input
          type='search'
          name='search'
          id='search'
          placeholder='Search for Country'
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </form>

      <div className='region-filter'>
        <select
          name='select'
          id='select'
          className='select'
          value={selectedRegion}
          onChange={handleRegionChange}
        >
          <option value='filter by region'>Filter by Region</option>
          <option value='Africa'>Africa</option>
          <option value='Americas'>Americas</option>
          <option value='Asia'>Asia</option>
          <option value='Europe'>Europe</option>
          <option value='Oceania'>Oceania</option>
        </select>
      </div>
    </section>
  );
};

export default Filter;
