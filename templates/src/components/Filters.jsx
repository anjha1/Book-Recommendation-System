import React from 'react';
import { useBookContext } from '../contexts/BookContext';

function Filters() {
  const { state, dispatch } = useBookContext();

  const handleFilterChange = (filterType, value) => {
    dispatch({ type: 'SET_FILTERS', payload: { [filterType]: value } });
  };

  const handleSortChange = (value) => {
    dispatch({ type: 'SET_SORT', payload: value });
  };

  const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Biography', 'History'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Italian'];
  const ratings = ['4+', '3+', '2+', '1+'];
  const years = ['2020+', '2010+', '2000+', '1990+'];

  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
          <select
            value={state.filters.genre}
            onChange={(e) => handleFilterChange('genre', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre.toLowerCase()}>{genre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <select
            value={state.filters.language}
            onChange={(e) => handleFilterChange('language', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="">All Languages</option>
            {languages.map(lang => (
              <option key={lang} value={lang.toLowerCase()}>{lang}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Min Rating</label>
          <select
            value={state.filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="">Any Rating</option>
            {ratings.map(rating => (
              <option key={rating} value={rating.replace('+', '')}>{rating}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Published After</label>
          <select
            value={state.filters.year}
            onChange={(e) => handleFilterChange('year', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="">Any Year</option>
            {years.map(year => (
              <option key={year} value={year.replace('+', '')}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
          <select
            value={state.sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="popularity">Popularity</option>
            <option value="rating">Rating</option>
            <option value="newest">Newest</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filters;