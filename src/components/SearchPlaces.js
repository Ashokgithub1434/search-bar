import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchPlaces.css';

const SearchPlaces = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions', {
        headers: {
          'X-RapidAPI-Key': '812ea6ea8fmshb795b7e6e3058aep1164c7jsnac0476e3647f',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        },
        params: { namePrefix: searchTerm, limit }
      });
      setPlaces(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      fetchData();
    } else {
      setPlaces([]);
    }
  }, [searchTerm, limit]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLimitChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 1 && value <= 10) {
      setLimit(value);
    }
  };

  const handleShortcutKeys = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === '/') {
      document.querySelector('.search-input').focus();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleShortcutKeys);
    return () => {
      document.removeEventListener('keydown', handleShortcutKeys);
    };
  }, []);

  return (
    <div className="search-places-container">
      <div className="background-animation"></div>
      <div className="search-box">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search Places..."
          className="search-input"
        />
        <div className="highlight-border"></div>
      </div>
      <div className="table-container">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <table className="places-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Place Name</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {places.length === 0 ? (
                <tr>
                  <td colSpan="3">{searchTerm.trim() ? "No result found" : "Start searching"}</td>
                </tr>
              ) : (
                places.map((place, index) => (
                  <tr key={place.id}>
                    <td>{index + 1}</td>
                    <td>{place.name}</td>
                    <td>{place.country}<p>Flag API is not working</p></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
        <div className="pagination">
          Pagination box
        </div>
        <div className="limit-input">
          <label htmlFor="limit">Limit:</label>
          <input
            type="number"
            id="limit"
            value={limit}
            onChange={handleLimitChange}
            min="1"
            max="10"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPlaces;
