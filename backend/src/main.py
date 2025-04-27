import argparse
from flask import Flask
from flask import jsonify
from flask import request
import numpy as np
from sentence_transformers import SentenceTransformer
from flask_cors import CORS
from sklearn.cluster import KMeans
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from collections import Counter
import re
from nltk.corpus import stopwords
import nltk
import sqlite3
from datetime import datetime

# Download NLTK data if not already downloaded
try:
    stopwords.words('english')
except LookupError:
    nltk.download('stopwords')

app = Flask(__name__)
CORS(app) 

# Global variable for delay
delay_ms = 0

# Global variables to store the seed text and its vector
seed_text = None
seed_vector = None

# Initialize the embedding model 
model = SentenceTransformer('all-MiniLM-L6-v2')

@app.route('/hello')
def hello():
    print("Hello world!")  # This prints to logs
    return jsonify({"message": "Hello world!"})  # Returns JSON to the client

@app.route('/')
def default():
    print("Default endpoint")  # This prints to logs
    return {"status": "ok", "message": "Default endpoint"}

@app.route('/text', methods=['POST'])
def text():
    print("Text endpoint (POST)")
    # Get data from the request
    data = request.get_json()
    # Return status and received data
    return jsonify({"status": "ok", "message": data})

# New endpoint to set the seed text and compute its embedding
@app.route('/set_seed', methods=['POST'])
def set_seed():
    global seed_text, seed_vector
    data = request.get_json()
    if not data or 'seed' not in data:
        return jsonify({"status": "error", "message": "Missing seed"}), 400
    seed_text = data['seed']
    seed_vector = model.encode(seed_text)
    print("Seed set:", seed_text)
    return jsonify({"status": "ok", "message": "Seed set successfully", "seed": seed_text})

# New endpoint to accept a guess and calculate similarity
@app.route('/guess', methods=['POST'])
def guess():
    global seed_text, seed_vector
    try:
        data = request.get_json()
        if seed_vector is None:
            return jsonify({"status": "error", "message": "Seed not set"}), 400
        if not data or 'guess' not in data:
            return jsonify({"status": "error", "message": "Missing guess"}), 400
        
        guess_text = data['guess']
        if guess_text == seed_text:
            return jsonify({"status": "error", "message": "Guess cannot be exactly the same as the seed"}), 400
        
        guess_vector = model.encode(guess_text)
        # Calculate cosine similarity between the seed and guess vectors
        cosine_similarity = np.dot(seed_vector, guess_vector) / (np.linalg.norm(seed_vector) * np.linalg.norm(guess_vector))
        # Convert numpy float to Python float for JSON serialization
        similarity_value = float(cosine_similarity)
        
        print(f"Seed: {seed_text} | Guess: {guess_text} | Similarity: {similarity_value}")
        return jsonify({"status": "ok", "similarity": similarity_value})
    except Exception as e:
        print(f"Error in guess endpoint: {str(e)}")
        return jsonify({"status": "error", "message": f"Error processing guess: {str(e)}"}), 500

def preprocess_text(text):
    """Clean and preprocess text for analysis."""
    # Convert to lowercase and remove special characters
    text = re.sub(r'[^\w\s]', '', text.lower())
    # Remove numbers
    text = re.sub(r'\d+', '', text)
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def extract_dream_trends(dream_texts, num_clusters=5, top_terms_per_cluster=5):
    """Extract trends from a collection of dream descriptions."""
    # Preprocess texts
    processed_texts = [preprocess_text(text) for text in dream_texts]
    
    # Generate embeddings for all texts
    embeddings = model.encode(processed_texts)
    
    # Cluster the dream embeddings
    kmeans = KMeans(n_clusters=num_clusters, random_state=42)
    clusters = kmeans.fit_predict(embeddings)
    
    # Setup TF-IDF to find important terms (not working)
    #stop_words = list(stopwords.words('english'))
    #stop_words.extend(['saw', 'dream', 'felt', 'went', 'came', 'got', 'like', 'just'])  # Common dream words
    
    tfidf = TfidfVectorizer(
        min_df=2, max_df=0.5, 
        ngram_range=(1, 2), # includes single words and bigrams
        stop_words='english'  # Use string 'english' instead of a list
    )
    tfidf_matrix = tfidf.fit_transform(processed_texts)
    feature_names = tfidf.get_feature_names_out()
    
    # Extract top terms for each cluster
    trends = []
    for i in range(num_clusters):
        # Get indices of dreams in this cluster
        cluster_indices = [idx for idx, label in enumerate(clusters) if label == i]
        if not cluster_indices:
            continue
            
        # Get average TF-IDF scores for this cluster
        cluster_tfidf = np.mean(tfidf_matrix[cluster_indices].toarray(), axis=0)
        
        # Get top terms for this cluster
        top_indices = np.argsort(cluster_tfidf)[-top_terms_per_cluster:][::-1]
        top_terms = [feature_names[idx] for idx in top_indices]
        
        # Add this trend to our results
        cluster_size = len(cluster_indices) / len(dream_texts)
        trends.append({
            "trend": top_terms,
            "weight": float(cluster_size),
            "representative_dreams": [dream_texts[idx] for idx in cluster_indices[:3]]  # Sample dreams
        })
    
    # Sort trends by cluster size (weight)
    trends.sort(key=lambda x: x["weight"], reverse=True)
    return trends

@app.route('/add_dream', methods=['POST'])
def add_dream():
    try:
        data = request.get_json()
        if not data or 'dream' not in data:
            return jsonify({"status": "error", "message": "Missing dream text"}), 400
            
        dream_text = data['dream']
        timestamp = datetime.now().isoformat()
        
        conn = sqlite3.connect('dreams.db')
        cursor = conn.cursor()
        cursor.execute("INSERT INTO dreams (text, timestamp) VALUES (?, ?)", 
                     (dream_text, timestamp))
        conn.commit()
        conn.close()
        
        return jsonify({
            "status": "ok",
            "message": "Dream added successfully"
        })
    except Exception as e:
        print(f"Error adding dream: {str(e)}")
        return jsonify({
            "status": "error", 
            "message": f"Error adding dream: {str(e)}"
        }), 500

@app.route('/get_trends', methods=['GET'])
def get_trends():
    try:
        # Get all dreams from the database
        conn = sqlite3.connect('dreams.db')
        cursor = conn.cursor()
        cursor.execute("SELECT text FROM dreams")
        dreams = [row[0] for row in cursor.fetchall()]
        conn.close()
        
        if not dreams:
            return jsonify({
                "status": "ok",
                "trends": [],
                "dream_count": 0,
                "message": "No dreams found in database"
            })
        
        # Calculate appropriate number of clusters based on data size
        num_clusters = min(10, max(3, len(dreams) // 10))
        
        # Extract trends from all dreams
        trends = extract_dream_trends(dreams, num_clusters=num_clusters)
        
        return jsonify({
            "status": "ok",
            "trends": trends,
            "dream_count": len(dreams)
        })
    except Exception as e:
        print(f"Error getting trends: {str(e)}")
        return jsonify({
            "status": "error", 
            "message": f"Error getting trends: {str(e)}"
        }), 500
    
# Database initialization function
def init_db():
    conn = sqlite3.connect('dreams.db')
    cursor = conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS dreams (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        timestamp TEXT NOT NULL
    )
    ''')
    conn.commit()
    conn.close()
    print("Database initialized")

@app.route('/clear_dreams', methods=['POST'])
def clear_dreams():
    try:
        conn = sqlite3.connect('dreams.db')
        cursor = conn.cursor()
        cursor.execute("DELETE FROM dreams")
        conn.commit()
        conn.close()
        return jsonify({"status": "ok", "message": "All dreams cleared"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

def main():
    global delay_ms
    parser = argparse.ArgumentParser(description="Web server with /hello endpoint")
    parser.add_argument("--port", type=int, default=8080, help="Port to run the server on")
    args = parser.parse_args()
    
    init_db() # Initialize the database
    app.run(host='0.0.0.0', port=args.port)

if __name__ == "__main__":
    main()
