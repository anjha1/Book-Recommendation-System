import React from 'react';
import { useBookContext } from '../contexts/BookContext';

function BookCard({ book, onRecommendSimilar }) {
  const { dispatch } = useBookContext();

  const handleAddToReadingList = () => {
    dispatch({ type: 'ADD_TO_READING_LIST', payload: book });
  };

  const handleRecommendSimilar = () => {
    if (onRecommendSimilar) {
      onRecommendSimilar(book);
    }
  };

  return (
    <div className="bg-white bg-opacity-95 border-none rounded-3xl transition-all duration-300 ease-in-out backdrop-blur-md shadow-lg hover:shadow-2xl hover:-translate-y-3 min-h-80 fade-in card-hover">
      <div className="p-4">
        <img
          src={book.cover_url || '/placeholder-book.jpg'}
          className="w-full h-48 object-cover rounded-2xl"
          alt={book.title}
        />
      </div>
      <div className="p-4">
        <h5 className="text-lg font-semibold mb-2 text-primary line-clamp-2">{book.title}</h5>
        <p className="text-sm text-gray-600 mb-1 opacity-90">{book.author}</p>
        <p className="text-sm text-gray-500 mb-1">
          <i className="fas fa-users mr-1"></i> {book.votes || 0} votes
        </p>
        <p className="text-sm text-accent font-semibold mb-3">
          <i className="fas fa-star mr-1"></i> {book.rating || 0} / 5
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleRecommendSimilar}
            className="flex-1 bg-accent text-primary py-2 px-3 rounded-lg text-sm font-medium hover:bg-yellow-400 transition-colors"
            aria-label={`Get recommendations similar to ${book.title}`}
          >
            Recommend Similar
          </button>
          <button
            onClick={handleAddToReadingList}
            className="bg-secondary text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
            aria-label={`Add ${book.title} to reading list`}
          >
            <i className="fas fa-plus mr-1"></i> Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;