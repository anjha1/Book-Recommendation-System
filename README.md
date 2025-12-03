# Book Recommendation System

This project is a web application that provides book recommendations to users. It features two main types of recommendation systems:
1.  **Popularity-Based Recommendation:** Suggests books that are highly rated and have received a significant number of votes.
2.  **Collaborative Filtering-Based Recommendation:** Takes a book title as input from the user and recommends similar books based on past user rating patterns and preferences.

## Recommendation Systems Detailed

### 1. Popularity-Based Recommender
This system recommends books that are generally popular among all users. The criteria for popularity are:
*   A high average rating.
*   A minimum threshold of user votes/ratings to ensure the popularity is based on a substantial number of opinions.
The `popular.pkl` file stores a pre-compiled list of these books, which are displayed on the homepage.

### 2. Collaborative Filtering-Based Recommender
This system provides personalized recommendations. When a user inputs a book title:
*   The system finds this book in its database (`pt.pkl`, which is a user-book rating matrix).
*   It then uses a pre-calculated cosine similarity matrix (`similarity_scores.pkl`) to identify other books that have been rated similarly by users who also rated the input book.
*   The top N similar books are then suggested to the user.

## Data
The recommendation models are built using datasets for books (titles, authors, images, etc.), users, and user ratings. The `book_recommender_system.ipynb` notebook details the data loading and preprocessing steps, which originally involved reading data from CSV files. The processed data is then saved as `.pkl` files for efficient use in the web application.

## Visualizations
The `book_recommender_system.ipynb` notebook includes several visualizations to analyze the data, such as:
*   Bar chart of the top N most rated books.
*   Scatter plot showing the relationship between the number of ratings and the average rating for books.
*   Treemap illustrating the top authors based on the total number of ratings their books have received.
These visualizations are generated using libraries like `matplotlib`, `seaborn`, and `plotly`.

## Tech Stack

- **Backend:** Python Flask
- **Frontend:** React 18 with Vite, Tailwind CSS
- **Data Processing:** Pandas, NumPy, Scikit-learn
- **Visualization:** Matplotlib, Seaborn, Plotly
- **Deployment:** Heroku

## Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 16+
- pip

### Backend Setup

1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the Flask app:
   ```bash
   python app.py
   ```
   The backend will run on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd templates
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Copy environment file:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

## API Endpoints

The Flask backend provides the following API endpoints:

### GET /api/books
Returns paginated list of books with optional filters.

**Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Books per page (default: 20)
- `q` (string): Search query
- `genre`, `language`, `rating`, `year`: Filter parameters
- `sort`: Sort order (popularity, rating, newest, title)

### POST /api/recommend
Get book recommendations based on a specific book.

**Request Body:**
```json
{
  "book_id": "specific_book_id"
}
```

### GET /api/book/:id
Get detailed information about a specific book.

## Project Structure

```
Book-Recommendation-System/
├── app.py                    # Flask backend
├── requirements.txt          # Python dependencies
├── Procfile                  # Heroku deployment
├── runtime.txt               # Python runtime version
├── .gitignore                # Git ignore rules
├── README.md                 # This file
├── books.pkl                 # Book data
├── popular.pkl               # Popular books data
├── pt.pkl                    # User-book matrix
├── similarity_scores.pkl     # Similarity matrix
├── book_recommender_system.ipynb  # Data processing notebook
├── templates/                # React frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── contexts/         # React contexts
│   │   ├── App.jsx           # Main app component
│   │   └── ...
│   ├── public/               # Static assets
│   ├── package.json          # Node.js dependencies
│   └── ...
└── ...
```

## Deployment

This application is configured for deployment on Heroku.

1. Ensure `Procfile` and `runtime.txt` are present.
2. Push to Heroku:
   ```bash
   git push heroku main
   ```
3. For the frontend, build it and serve statically, or integrate with Flask.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both backend and frontend
5. Submit a pull request

## License

This project is part of a final-year academic project.
