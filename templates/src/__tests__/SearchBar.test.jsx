import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../components/SearchBar';
import { BookProvider } from '../contexts/BookContext';

// Mock the context
const mockDispatch = jest.fn();

jest.mock('../contexts/BookContext', () => ({
  useBookContext: () => ({
    state: {
      searchQuery: 'initial query',
    },
    dispatch: mockDispatch,
  }),
}));

describe('SearchBar', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  test('renders search input and button', () => {
    render(
      <BookProvider>
        <SearchBar />
      </BookProvider>
    );

    const input = screen.getByPlaceholderText(/search by title, author, or isbn/i);
    const button = screen.getByRole('button', { name: /submit search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('displays initial search query', () => {
    render(
      <BookProvider>
        <SearchBar />
      </BookProvider>
    );

    const input = screen.getByPlaceholderText(/search by title, author, or isbn/i);
    expect(input).toHaveValue('initial query');
  });

  test('updates local query on input change', () => {
    render(
      <BookProvider>
        <SearchBar />
      </BookProvider>
    );

    const input = screen.getByPlaceholderText(/search by title, author, or isbn/i);
    fireEvent.change(input, { target: { value: 'new search' } });

    expect(input).toHaveValue('new search');
  });

  test('calls dispatch with SET_SEARCH_QUERY on form submit', () => {
    render(
      <BookProvider>
        <SearchBar />
      </BookProvider>
    );

    const input = screen.getByPlaceholderText(/search by title, author, or isbn/i);
    const form = input.closest('form');

    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.submit(form);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_SEARCH_QUERY',
      payload: 'test search',
    });
  });

  test('has correct accessibility attributes', () => {
    render(
      <BookProvider>
        <SearchBar />
      </BookProvider>
    );

    const input = screen.getByPlaceholderText(/search by title, author, or isbn/i);
    const button = screen.getByRole('button', { name: /submit search/i });

    expect(input).toHaveAttribute('aria-label', 'Search books');
    expect(button).toHaveAttribute('aria-label', 'Submit search');
  });

  test('prevents default form submission', () => {
    render(
      <BookProvider>
        <SearchBar />
      </BookProvider>
    );

    const input = screen.getByPlaceholderText(/search by title, author, or isbn/i);
    const form = input.closest('form');

    const mockPreventDefault = jest.fn();
    fireEvent.submit(form, { preventDefault: mockPreventDefault });

    expect(mockPreventDefault).toHaveBeenCalled();
  });
});