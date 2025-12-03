import React, { useState } from 'react';
import { useBookContext } from '../contexts/BookContext';
import { bookAPI } from '../services/api';
import BookCard from '../components/BookCard';
import BookModal from '../components/BookModal';

function RecommendPage() {
  const { state, dispatch } = useBookContext();
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setLoading(true);
    setError('');
    try {
      const response = await bookAPI.getRecommendations({
        preferences: { text: userInput.trim() }
      });
      dispatch({ type: 'SET_RECOMMENDATIONS', payload: response.data.recommendations || [] });
    } catch (error) {
      setError('Failed to get recommendations. Please try again.');
      console.error('Error getting recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBook(null);
  };

  const handleAddToReadingList = (book) => {
    dispatch({ type: 'ADD_TO_READING_LIST', payload: book });
  };

  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4" style={{ fontSize: '3rem' }}>Get Book Recommendations</h1>
          <p className="text-gray-300 text-lg">Tell us what you're looking for and we'll suggest the perfect books</p>
        </div>

        {/* Recommendation Form */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-2xl shadow-2xl">
            <div className="mb-4">
              <label htmlFor="userInput" className="block text-lg font-medium mb-2">
                Describe the book you're looking for:
              </label>
              <textarea
                id="userInput"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="e.g., 'I want a mystery novel with a strong female protagonist set in the 19th century' or 'Books similar to The Night Circus'"
                className="w-full p-4 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none resize-none"
                rows="4"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-800 border border-red-600 rounded-lg text-red-200">
              {error}
            </div>
          )}
        </div>

        {/* Recommendations Grid */}
        {state.recommendations.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-center mb-8">Recommended Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {state.recommendations.map((book, index) => (
                <div
                  key={`${book.book_id}-${index}`}
                  onClick={() => handleBookClick(book)}
                  className="cursor-pointer"
                >
                  <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 transition-all duration-300 hover:bg-gray-700 hover:scale-105">
                    <img
                      src={book.cover_url || '/placeholder-book.jpg'}
                      alt={book.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{book.title}</h3>
                    <p className="text-gray-300 mb-2">{book.author}</p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-green-400 font-medium">
                        {Math.round(book.score * 100)}% match
                      </span>
                      <span className="text-yellow-400">
                        <i className="fas fa-star mr-1"></i> {book.rating || 0}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToReadingList(book);
                      }}
                      className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-500 transition-colors"
                    >
                      <i className="fas fa-plus mr-2"></i> Add to List
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Methodology Section */}
        <div className="mt-16 bg-gray-800 p-8 rounded-2xl">
          <h2 className="text-3xl font-bold text-center mb-6">About Our Recommendation System</h2>
          <div className="text-center">
            <p className="text-gray-300 text-lg leading-relaxed">
              Our recommendation engine analyzes your input using advanced similarity algorithms powered by pre-processed datasets (books.pkl, popular.pkl, and similarity_scores.pkl).
              When you describe a book or enter a title, the system compares your input with thousands of books stored in our library and instantly finds the closest matches.
              The backend processes your request, runs it through the trained recommendation model, and returns the most relevant books based on content similarity, keywords, and reading patterns.
            </p>
          </div>
        </div>

        {/* Book Modal */}
        <BookModal
          book={selectedBook}
          isOpen={modalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}

export default RecommendPage;