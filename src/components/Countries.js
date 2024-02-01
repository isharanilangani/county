import React, { useState, useEffect } from 'react';
import './Countries.css';

const url = 'https://restcountries.com/v2/all';

const Countries = ({ search, region }) => {
  const [countries, setCountries] = useState([]);

  const fetchCountryData = async () => {
    try {
      const response = await fetch(url);
      const countriesData = await response.json();
      setCountries(countriesData);
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

  const handleScroll = () => {
    const articles = document.querySelectorAll('.article');

    articles.forEach((article) => {
      const rect = article.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        article.classList.add('visible');
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const filteredCountries = countries.filter((country) => {
    const matchSearch = country.name.toLowerCase().includes(search.toLowerCase());
    const matchRegion = region === 'filter by region' || country.region === region;
    return matchSearch && matchRegion;
  });

  return (
    <div className="container">
      {filteredCountries.map((country) => {
        const { alpha3Code, name, capital, population, area, languages, flag } = country;

        return (
          <article key={alpha3Code} className="article">
            {flag && <img className="flag" src={flag} alt={`${name} Flag`} />}
            <div className="details-box">
              <h3>{name}</h3>
              <p>Capital: {capital}</p>
              <p>Population: {population}</p>
              <p>Area: {area} km²</p>
              <p>Languages: {languages.map((lang) => lang.name).join(', ')}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Countries;
