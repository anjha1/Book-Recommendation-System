import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookCard from '../components/BookCard';
import { BookProvider } from '../contexts/BookContext';

// Mock the context
const mockDispatch = jest.fn();

jest.mock('../contexts/BookContext', () => ({
  useBookContext: () => ({
    dispatch: mockDispatch,
  }),
}));

const mockBook = {
  id: '1',
  title: 'Test Book',
  author: 'Test Author',
  cover_url: 'test-cover.jpg',
  rating: 4.5,
  votes: 100,
};

describe('BookCard', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  test('renders book information correctly', () => {
    render(
      <BookProvider>
        <BookCard book={mockBook} />
      </BookProvider>
    );

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('100 votes')).toBeInTheDocument();
    expect(screen.getByText('4.5 / 5')).toBeInTheDocument();
    expect(screen.getByAltText('Test Book')).toBeInTheDocument();
  });

  test('calls dispatch when Add to reading list button is clicked', () => {
    render(
      <BookProvider>
        <BookCard book={mockBook} />
      </BookProvider>
    );

    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_TO_READING_LIST',
      payload: mockBook,
    });
  });

  test('has correct accessibility attributes', () => {
    render(
      <BookProvider>
        <BookCard book={mockBook} />
      </BookProvider>
    );

    const recommendButton = screen.getByRole('button', { name: /recommend similar/i });
    const addButton = screen.getByRole('button', { name: /add.*reading list/i });

    expect(recommendButton).toHaveAttribute('aria-label', 'Get recommendations similar to Test Book');
    expect(addButton).toHaveAttribute('aria-label', 'Add Test Book to reading list');
  });

  test('displays placeholder image when cover_url is not provided', () => {
    const bookWithoutCover = { ...mockBook, cover_url: undefined };

    render(
      <BookProvider>
        <BookCard book={bookWithoutCover} />
      </BookProvider>
    );

    const img = screen.getByAltText('Test Book');
    expect(img).toHaveAttribute('src', '/placeholder-book.jpg');
  });
});