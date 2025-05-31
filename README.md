# Book Recommendation System

This project is a web application that provides book recommendations to users. It features two main types of recommendation systems:
1.  **Popularity-Based Recommendation:** Suggests books that are highly rated and have received a significant number of votes.
2.  **Collaborative Filtering-Based Recommendation:** Takes a book title as input from the user and recommends similar books based on past user rating patterns and preferences.

## Files and Directories

*   `app.py`: The main Flask application file that runs the web interface and recommendation logic.
*   `book_recommender_system.ipynb`: A Jupyter Notebook containing the code for data loading, preprocessing, analysis, and building the recommendation models.
*   `popular.pkl`: A pickled Pandas DataFrame containing the top-rated books, used by the popularity-based recommender.
*   `pt.pkl`: A pickled Pandas DataFrame representing the pivot table (user-book rating matrix) used in the collaborative filtering model.
*   `books.pkl`: A pickled Pandas DataFrame containing the processed book data.
*   `similarity_scores.pkl`: A pickled file containing the cosine similarity matrix used for collaborative filtering.
*   `templates/`: This directory holds the HTML templates for the web application:
    *   `index.html`: The main page that displays popular books.
    *   `recommend.html`: The page where users can get personalized recommendations.
*   `requirements.txt`: A text file listing all the Python dependencies required to run the project.
*   `.gitignore`: Specifies intentionally untracked files that Git should ignore (e.g., environment files, IDE caches).
*   `Procfile`: Declares the process types for application deployment, likely for platforms like Heroku.
*   `Book Recommendation.pdf`: A PDF document, possibly a project report or presentation.
*   `Project_template_AICTE.pptx`: A PowerPoint presentation, likely related to the project's proposal or documentation for AICTE.

## How to Run the Project

1.  **Prerequisites:**
    *   Python 3.x
    *   pip (Python package installer)

2.  **Clone the Repository (if applicable):**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

3.  **Install Dependencies:**
    Open your terminal or command prompt and navigate to the project's root directory. Then, install the required packages using:
    ```bash
    pip install -r requirements.txt
    ```
    The key dependencies include:
    *   Flask
    *   pandas
    *   numpy
    *   scikit-learn (for `cosine_similarity`)

4.  **Run the Flask Application:**
    Once the dependencies are installed, you can start the web application by running:
    ```bash
    python app.py
    ```
    The application will typically start on `http://127.0.0.1:5000/` or `http://localhost:5000/`. Open this URL in your web browser to use the book recommender.

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
