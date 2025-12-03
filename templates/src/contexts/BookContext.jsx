import React, { createContext, useContext, useReducer, useEffect } from 'react';

const BookContext = createContext();

const initialState = {
  books: [],
  loading: false,
  error: null,
  searchQuery: '',
  filters: {
    genre: '',
    language: '',
    rating: '',
    year: '',
  },
  sortBy: 'popularity',
  page: 1,
  hasMore: true,
  readingList: JSON.parse(localStorage.getItem('readingList')) || [],
  recommendations: [],
  similarRecommendations: [],
  selectedBookForSimilar: null,
};

function bookReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_BOOKS':
      return {
        ...state,
        books: action.payload.replace ? action.payload.books : [...state.books, ...action.payload.books],
        hasMore: action.payload.hasMore,
        loading: false,
        error: null,
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload, page: 1, books: [] };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload }, page: 1, books: [] };
    case 'SET_SORT':
      return { ...state, sortBy: action.payload, page: 1, books: [] };
    case 'LOAD_MORE':
      return { ...state, page: state.page + 1 };
    case 'ADD_TO_READING_LIST':
      const newReadingList = [...state.readingList, action.payload];
      localStorage.setItem('readingList', JSON.stringify(newReadingList));
      return { ...state, readingList: newReadingList };
    case 'REMOVE_FROM_READING_LIST':
      const filteredList = state.readingList.filter(book => book.id !== action.payload);
      localStorage.setItem('readingList', JSON.stringify(filteredList));
      return { ...state, readingList: filteredList };
    case 'SET_RECOMMENDATIONS':
      return { ...state, recommendations: action.payload };
    case 'SET_SIMILAR_RECOMMENDATIONS':
      return { ...state, similarRecommendations: action.payload };
    case 'SET_SELECTED_BOOK_FOR_SIMILAR':
      return { ...state, selectedBookForSimilar: action.payload };
    default:
      return state;
  }
}

export function BookProvider({ children }) {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBookContext() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBookContext must be used within a BookProvider');
  }
  return context;
}