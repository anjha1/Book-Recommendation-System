from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for React app

# Load all pickled data
popular_df = pickle.load(open('popular.pkl', 'rb'))
pt = pickle.load(open('pt.pkl', 'rb'))
books = pickle.load(open('books.pkl', 'rb'))
similarity_scores = pickle.load(open('similarity_scores.pkl', 'rb'))

@app.route('/')
def index():
    return render_template('index.html',
                           book_name=list(popular_df['Book-Title'].values),
                           author=list(popular_df['Book-Author'].values),
                           image=list(popular_df['Image-URL-M'].values),
                           votes=list(popular_df['num_ratings'].values),
                           rating=list(popular_df['avg_rating'].values))

@app.route('/recommend')
def recommend_ui():
    return render_template('recommend.html')

@app.route('/recommend_books', methods=['POST'])
def recommend():
    user_input = request.form.get('user_input')

    if user_input not in pt.index:
        return render_template('recommend.html', data=[], error="Book not found. Please enter a valid book title.")

    index = np.where(pt.index == user_input)[0][0]
    similar_items = sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[1:5]

    data = []
    for i in similar_items:
        temp_df = books[books['Book-Title'] == pt.index[i[0]]].drop_duplicates('Book-Title')
        if not temp_df.empty:
            item = [
                temp_df['Book-Title'].values[0],
                temp_df['Book-Author'].values[0],
                temp_df['Image-URL-M'].values[0]
            ]
            data.append(item)

    return render_template('recommend.html', data=data)

# API Routes for React App

@app.route('/api/books')
def get_books():
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 20))
    q = request.args.get('q', '')
    genre = request.args.get('genre', '')
    language = request.args.get('language', '')
    rating = request.args.get('rating', '')
    year = request.args.get('year', '')
    sort = request.args.get('sort', 'popularity')

    # Start with popular books
    df = popular_df.copy()

    # Apply search filter
    if q:
        df = df[df['Book-Title'].str.contains(q, case=False, na=False) |
                df['Book-Author'].str.contains(q, case=False, na=False)]

    # Apply filters
    if genre:
        # Since popular_df doesn't have genre column, we'll skip filtering for now
        # In a real app, you'd have genre data
        pass

    if language:
        # Since popular_df doesn't have language column, we'll skip filtering for now
        # In a real app, you'd have language data
        pass

    if rating:
        min_rating = float(rating.replace('+', ''))
        df = df[df['avg_rating'] >= min_rating]

    if year:
        # Since popular_df doesn't have year column, we'll skip filtering for now
        # In a real app, you'd have publication year data
        pass

    # Apply sorting
    if sort == 'rating':
        df = df.sort_values('avg_rating', ascending=False)
    elif sort == 'newest':
        # Assuming we have year data, for now sort by rating
        df = df.sort_values('avg_rating', ascending=False)
    elif sort == 'title':
        df = df.sort_values('Book-Title')

    # Pagination
    start_idx = (page - 1) * limit
    end_idx = start_idx + limit
    paginated_df = df.iloc[start_idx:end_idx]

    books_list = []
    for _, row in paginated_df.iterrows():
        books_list.append({
            'id': str(_),  # Use index as ID
            'title': row['Book-Title'],
            'author': row['Book-Author'],
            'cover_url': row['Image-URL-M'],
            'rating': float(row['avg_rating']),
            'votes': int(row['num_ratings'])
        })

    return jsonify({
        'books': books_list,
        'total': len(df),
        'hasMore': end_idx < len(df)
    })

@app.route('/api/book/<book_id>')
def get_book(book_id):
    # For simplicity, return a book from popular_df
    # In a real app, you'd have a proper book details lookup
    try:
        idx = int(book_id)
        if idx < len(popular_df):
            row = popular_df.iloc[idx]
            return jsonify({
                'id': book_id,
                'title': row['Book-Title'],
                'author': row['Book-Author'],
                'cover_url': row['Image-URL-M'],
                'description': f"A highly rated book by {row['Book-Author']} with {row['num_ratings']} ratings.",
                'rating': float(row['avg_rating']),
                'votes': int(row['num_ratings']),
                'tags': ['fiction', 'bestseller'],  # Placeholder
                'published_year': 2020  # Placeholder
            })
    except:
        pass

    return jsonify({'error': 'Book not found'}), 404

@app.route('/api/recommend', methods=['POST'])
def api_recommend():
    data = request.get_json()
    recommendations = []

    if 'book_id' in data:
        # Recommend similar books based on book_id
        try:
            book_idx = int(data['book_id'])
            if book_idx < len(popular_df):
                book_title = popular_df.iloc[book_idx]['Book-Title']
                if book_title in pt.index:
                    index = np.where(pt.index == book_title)[0][0]
                    similar_items = sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[1:6]

                    for idx, score in similar_items:
                        temp_df = books[books['Book-Title'] == pt.index[idx]].drop_duplicates('Book-Title')
                        if not temp_df.empty:
                            row = temp_df.iloc[0]
                            recommendations.append({
                                'book_id': str(idx),
                                'title': row['Book-Title'],
                                'author': row['Book-Author'],
                                'cover_url': row['Image-URL-M'],
                                'summary': f"Similar to your selected book with {score:.2f} similarity score.",
                                'score': float(score),
                                'rating': 4.5  # Default rating
                            })
        except:
            pass

    elif 'preferences' in data:
        # Recommend based on text preferences - try to find similar books using similarity matrix
        text = data['preferences'].get('text', '')

        # First, try to find the book in the pivot table for similarity-based recommendations
        book_found = False
        if text:
            # Check if the input matches a book title in pt.index
            for book_title in pt.index:
                if text.lower() in book_title.lower():
                    try:
                        index = np.where(pt.index == book_title)[0][0]
                        similar_items = sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[1:6]

                        for i in similar_items:
                            temp_df = books[books['Book-Title'] == pt.index[i[0]]].drop_duplicates('Book-Title')
                            if not temp_df.empty:
                                row = temp_df.iloc[0]
                                recommendations.append({
                                    'book_id': str(i[0]),
                                    'title': row['Book-Title'],
                                    'author': row['Book-Author'],
                                    'cover_url': row['Image-URL-M'],
                                    'summary': f"Similar to '{book_title}' with {i[1]:.2f} similarity score.",
                                    'score': float(i[1]),
                                    'rating': 4.5  # Default rating since books doesn't have ratings
                                })
                        book_found = True
                        break
                    except:
                        continue

        # If no similar books found via similarity matrix, fall back to text matching
        if not book_found:
            matching_books = popular_df[
                popular_df['Book-Title'].str.contains(text, case=False, na=False) |
                popular_df['Book-Author'].str.contains(text, case=False, na=False)
            ].head(5)

            for idx, row in matching_books.iterrows():
                recommendations.append({
                    'book_id': str(idx),
                    'title': row['Book-Title'],
                    'author': row['Book-Author'],
                    'cover_url': row['Image-URL-M'],
                    'summary': f"Matches your preferences with rating {row['avg_rating']}.",
                    'score': 0.8,  # Placeholder score
                    'rating': float(row['avg_rating'])
                })

    return jsonify({'recommendations': recommendations})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
