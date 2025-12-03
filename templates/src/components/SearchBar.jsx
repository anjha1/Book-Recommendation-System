import React, { useState, useEffect } from 'react';
import { useBookContext } from '../contexts/BookContext';

function SearchBar() {
  const { state, dispatch } = useBookContext();
  const [localQuery, setLocalQuery] = useState(state.searchQuery);

  useEffect(() => {
    setLocalQuery(state.searchQuery);
  }, [state.searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_SEARCH_QUERY', payload: localQuery });
  };

  const handleInputChange = (e) => {
    setLocalQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md mx-auto mb-6">
      <div className="relative">
        <input
          type="text"
          value={localQuery}
          onChange={handleInputChange}
          placeholder="Search by title, author, or ISBN..."
          className="w-full py-3 px-4 pr-12 rounded-full border-2 border-gray-300 focus:border-accent focus:outline-none transition-colors bg-white bg-opacity-90 backdrop-blur-sm"
          aria-label="Search books"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent text-primary p-2 rounded-full hover:bg-yellow-400 transition-colors"
          aria-label="Submit search"
        >
          <i className="fas fa-search"></i>
        </button>
      </div>
    </form>
  );
}

export default SearchBar;