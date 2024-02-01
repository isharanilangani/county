import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CountryComparison.css';

const CountryComparison = () => {
  const [countries, setCountries] = useState([]);
  const [country1, setCountry1] = useState('');
  const [country2, setCountry2] = useState('');
  const [comparisonData, setComparisonData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch the list of countries when the component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v2/all');
        const data = await response.json();

        // Check if the data is an array and has length
        if (Array.isArray(data) && data.length > 0) {
          setCountries(data);
        } else {
          console.error('Invalid country data:', data);
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  // Function to fetch detailed country information
  const fetchCountryDetails = async (countryCode) => {
    try {
      const response = await fetch(`https://restcountries.com/v2/alpha/${countryCode}`);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching country details:', error);
      return null;
    }
  };

  const fetchComparisonData = async (countryCode1, countryCode2) => {
    const countryDetails1 = await fetchCountryDetails(countryCode1);
    const countryDetails2 = await fetchCountryDetails(countryCode2);
  
    if (countryDetails1 && countryDetails2) {
      const comparisonData = {
        flag1: countryDetails1.flags?.svg || 'N/A', 
        flag2: countryDetails2.flags?.svg || 'N/A',
        population1: countryDetails1.population,
        population2: countryDetails2.population,
        area1: countryDetails1.area,
        area2: countryDetails2.area,
        languages1: countryDetails1.languages?.map((language) => language.name).join(', ') || 'N/A',
        languages2: countryDetails2.languages?.map((language) => language.name).join(', ') || 'N/A',
        capital1: countryDetails1.capital || 'N/A',
        capital2: countryDetails2.capital || 'N/A',
        name1: countryDetails1.name || 'N/A',
        name2: countryDetails2.name || 'N/A',
      };
  
      setComparisonData(comparisonData);
    } else {
      console.error('Error fetching country details.');
    }
  };

  // Effect to fetch comparison data when countries are selected
  useEffect(() => {
    if (country1 && country2) {
      fetchComparisonData(country1, country2);
    }
  }, [country1, country2]);

  // Filter countries based on the search term
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="comparison-container">
      <div>
        <Link to="/">
          <button className='Back-button'>Back
          </button>
          </Link>
      </div>
      {/* Add UI for country selection and comparison */}
      <div className="country-selection">
        <select onChange={(e) => setCountry1(e.target.value)}>
          <option value="">Select Country 1</option>
          {filteredCountries.map((country) => (
            <option key={country.alpha3Code} value={country.alpha3Code}>
              {country.name}
            </option>
          ))}
        </select>

        <select onChange={(e) => setCountry2(e.target.value)}>
          <option value="">Select Country 2</option>
          {filteredCountries.map((country) => (
            <option key={country.alpha3Code} value={country.alpha3Code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* Display country details comparison in a table */}
      {comparisonData && (
        <div className="comparison-details">
          <h2>Comparison Details</h2>
          <table>
            <thead>
              <tr>
                <th>Attribute</th>
                <th>{comparisonData.name1}</th>
                <th>{comparisonData.name2}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Flag</td>
                <td><img src={comparisonData.flag1} alt="Flag 1" /></td>
                <td><img src={comparisonData.flag2} alt="Flag 2" /></td>
              </tr>
              <tr>
                <td>Population</td>
                <td>{comparisonData.population1}</td>
                <td>{comparisonData.population2}</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>{comparisonData.area1}</td>
                <td>{comparisonData.area2}</td>
              </tr>
              <tr>
                <td>Languages</td>
                <td>{comparisonData.languages1}</td>
                <td>{comparisonData.languages2}</td>
              </tr>
              <tr>
                <td>Capital</td>
                <td>{comparisonData.capital1}</td>
                <td>{comparisonData.capital2}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CountryComparison;
