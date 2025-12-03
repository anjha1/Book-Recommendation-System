import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BookProvider } from './contexts/BookContext';
import LibraryPage from './pages/LibraryPage';
import RecommendPage from './pages/RecommendPage';
import ContactPage from './pages/ContactPage';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-secondary to-primary shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-text text-xl font-bold hover:text-accent transition-colors">
            Book Recommender
          </Link>
          <div className="flex space-x-6">
            <Link
              to="/"
              className="text-text hover:text-accent transition-colors px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10"
            >
              Home
            </Link>
            <Link
              to="/recommend"
              className="text-text hover:text-accent transition-colors px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10"
            >
              Recommend
            </Link>
            <Link
              to="/contact"
              className="text-text hover:text-accent transition-colors px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BookProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<LibraryPage />} />
            <Route path="/recommend" element={<RecommendPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
      </Router>
    </BookProvider>
  );
}

export default App;