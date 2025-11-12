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
