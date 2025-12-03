# Book Recommendation System - React Frontend

A modern, interactive React frontend for the Library Book Recommendation System. This application provides a polished user interface for browsing books, searching, filtering, and getting personalized recommendations.

## Features

- **Book Library**: Browse books with infinite scroll, search, and advanced filtering
- **Personalized Recommendations**: Get book suggestions based on preferences or similar books
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Reading List**: Save books to a personal reading list (stored locally)
- **Book Details**: View detailed information about books with similar recommendations
- **Modern UI**: Clean design with smooth animations and accessibility features

## Tech Stack

- **React 18** with Hooks
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Context API** for state management

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Running Flask backend on port 5000

### Installation

1. Navigate to the templates directory:
   ```bash
   cd templates
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment configuration:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your backend URL:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (Vite's default port).

### Building for Production

Build the app for production:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Backend Integration

This React app expects a Flask backend running on `http://localhost:5000` with the following API endpoints:

### GET /api/books
Returns paginated list of books with optional filters.

**Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Books per page (default: 20)
- `q` (string): Search query
- `genre`, `language`, `rating`, `year`: Filter parameters
- `sort`: Sort order (popularity, rating, newest, title)

**Response:**
```json
{
  "books": [
    {
      "id": "book_id",
      "title": "Book Title",
      "author": "Author Name",
      "cover_url": "image_url",
      "rating": 4.5,
      "votes": 1234,
      "description": "Book description"
    }
  ],
  "total": 1000
}
```

### POST /api/recommend
Get book recommendations based on preferences or a specific book.

**Request Body:**
```json
{
  "book_id": "specific_book_id"
}
```
or
```json
{
  "preferences": {
    "genres": ["fiction", "mystery"],
    "authors": ["Author Name"],
    "text": "Description of desired book"
  }
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "book_id": "rec_book_id",
      "title": "Recommended Book",
      "author": "Author Name",
      "cover_url": "image_url",
      "summary": "Brief summary",
      "score": 0.85,
      "rating": 4.2
    }
  ]
}
```

### GET /api/book/:id
Get detailed information about a specific book.

**Response:**
```json
{
  "id": "book_id",
  "title": "Book Title",
  "author": "Author Name",
  "cover_url": "image_url",
  "description": "Full description",
  "rating": 4.5,
  "votes": 1234,
  "tags": ["fiction", "mystery"],
  "published_year": 2020
}
```

## Project Structure

```
templates/
├── src/
│   ├── components/
│   │   ├── BookCard.jsx
│   │   ├── BookModal.jsx
│   │   ├── SearchBar.jsx
│   │   └── Filters.jsx
│   ├── pages/
│   │   ├── LibraryPage.jsx
│   │   └── RecommendPage.jsx
│   ├── services/
│   │   └── api.js
│   ├── contexts/
│   │   └── BookContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── .env.example
└── README.md
```

## Testing

Run tests:
```bash
npm test
```

Tests are written using Jest and React Testing Library for core components.

## Deployment

### With Flask

1. Build the React app:
   ```bash
   npm run build
   ```

2. Copy the `dist` contents to your Flask `static` directory or serve them via Flask routes.

3. Update Flask to serve the React app at the root path.

### Standalone

The built app in `dist` can be served by any static file server.

## Accessibility

- Semantic HTML elements
- ARIA labels for interactive components
- Keyboard navigation support
- Screen reader friendly
- High contrast colors

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## License

This project is part of a final-year academic project.