import React, { useEffect, useState, useCallback } from 'react';
import { useBookContext } from '../contexts/BookContext';
import { bookAPI } from '../services/api';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import BookModal from '../components/BookModal';

function LibraryPage() {
  const { state, dispatch } = useBookContext();
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchBooks = useCallback(async (page = 1, replace = false) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const params = {
        page,
        limit: 20,
        q: state.searchQuery,
        ...state.filters,
        sort: state.sortBy,
      };

      const response = await bookAPI.getBooks(params);
      dispatch({
        type: 'SET_BOOKS',
        payload: { books: response.data.books, hasMore: response.data.books.length === 20, replace }
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, [state.searchQuery, state.filters, state.sortBy, dispatch]);

  useEffect(() => {
    fetchBooks(1, true);
  }, [fetchBooks]);

  const handleLoadMore = () => {
    if (!state.loading && state.hasMore) {
      dispatch({ type: 'LOAD_MORE' });
      fetchBooks(state.page + 1, false);
    }
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const handleRecommendSimilar = async (book) => {
    try {
      // Fetch detailed book info first
      const bookResponse = await bookAPI.getBook(book.id);
      const detailedBook = bookResponse.data;
      dispatch({ type: 'SET_SELECTED_BOOK_FOR_SIMILAR', payload: detailedBook });

      // Then fetch recommendations
      const response = await bookAPI.getRecommendations({ book_id: book.id });
      dispatch({ type: 'SET_SIMILAR_RECOMMENDATIONS', payload: response.data.recommendations || [] });
    } catch (error) {
      console.error('Error fetching similar recommendations:', error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4 relative">
            Top Books Library
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-accent rounded-full"></div>
          </h1>
          <p className="text-text text-lg opacity-90">Discover your next favorite book</p>
        </div>

        {/* Search and Filters */}
        <SearchBar />
        <Filters />

        {/* Books Grid */}
        {state.error && (
          <div className="text-center text-red-500 mb-4">
            Error loading books: {state.error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {state.books.map((book, index) => (
            <div
              key={`${book.id}-${index}`}
              onClick={() => handleBookClick(book)}
              className="cursor-pointer"
            >
              <BookCard book={book} onRecommendSimilar={handleRecommendSimilar} />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {state.hasMore && !state.loading && (
          <div className="text-center mb-8">
            <button
              onClick={handleLoadMore}
              className="bg-accent text-primary px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors shadow-lg"
            >
              Load More Books
            </button>
          </div>
        )}

        {/* Recommend Similar Section */}
        {state.selectedBookForSimilar && state.similarRecommendations.length > 0 && (
          <div className="mt-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
                Books Similar to "{state.selectedBookForSimilar.title}"
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-accent rounded-full"></div>
              </h2>
              <div className="flex justify-center items-center mb-4">
                <img
                  src={state.selectedBookForSimilar.cover_url || '/placeholder-book.jpg'}
                  alt={state.selectedBookForSimilar.title}
                  className="w-16 h-24 object-cover rounded-lg mr-4 shadow-lg"
                />
                <div className="text-left">
                  <p className="text-text font-semibold">{state.selectedBookForSimilar.title}</p>
                  <p className="text-text opacity-75">by {state.selectedBookForSimilar.author}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {state.similarRecommendations.map((book, index) => (
                <div
                  key={`${book.book_id}-${index}`}
                  onClick={() => handleBookClick(book)}
                  className="cursor-pointer"
                >
                  <BookCard book={book} onRecommendSimilar={handleRecommendSimilar} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {state.loading && (
          <div className="text-center mb-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            <p className="text-text mt-2">Loading books...</p>
          </div>
        )}

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

export default LibraryPage;