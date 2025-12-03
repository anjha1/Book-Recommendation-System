import React, { useState, useEffect } from 'react';
import { bookAPI } from '../services/api';
import { useBookContext } from '../contexts/BookContext';

function BookModal({ book, isOpen, onClose }) {
  const { dispatch } = useBookContext();
  const [detailedBook, setDetailedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (isOpen && book) {
      fetchBookDetails();
      fetchRecommendations();
    }
  }, [isOpen, book]);

  const fetchBookDetails = async () => {
    if (!book.id) return;
    setLoading(true);
    try {
      const response = await bookAPI.getBook(book.id);
      setDetailedBook(response.data);
    } catch (error) {
      console.error('Error fetching book details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await bookAPI.getRecommendations({ book_id: book.id });
      setRecommendations(response.data.recommendations || []);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const handleAddToReadingList = (bookToAdd) => {
    dispatch({ type: 'ADD_TO_READING_LIST', payload: bookToAdd });
  };

  if (!isOpen) return null;

  const displayBook = detailedBook || book;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-primary">{displayBook.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <img
                src={displayBook.cover_url || '/placeholder-book.jpg'}
                alt={displayBook.title}
                className="w-full rounded-2xl shadow-lg"
              />
              <button
                onClick={() => handleAddToReadingList(displayBook)}
                className="w-full mt-4 bg-secondary text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                <i className="fas fa-plus mr-2"></i> Add to Reading List
              </button>
            </div>

            <div className="md:col-span-2">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Author</h3>
                <p className="text-primary">{displayBook.author}</p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Rating</h3>
                <p className="text-accent font-semibold">
                  <i className="fas fa-star mr-1"></i> {displayBook.rating || 0} / 5
                  ({displayBook.votes || 0} votes)
                </p>
              </div>

              {displayBook.description && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{displayBook.description}</p>
                </div>
              )}

              {displayBook.tags && displayBook.tags.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {displayBook.tags.map((tag, index) => (
                      <span key={index} className="bg-accent text-primary px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {recommendations.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-primary mb-4">Similar Books</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.slice(0, 6).map((rec) => (
                  <div key={rec.book_id} className="bg-gray-50 rounded-lg p-4">
                    <img
                      src={rec.cover_url || '/placeholder-book.jpg'}
                      alt={rec.title}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                    <h4 className="font-semibold text-sm mb-1 line-clamp-2">{rec.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{rec.author}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-accent text-sm font-medium">
                        {Math.round(rec.score * 100)}% match
                      </span>
                      <button
                        onClick={() => handleAddToReadingList(rec)}
                        className="text-secondary hover:text-primary text-sm"
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookModal;