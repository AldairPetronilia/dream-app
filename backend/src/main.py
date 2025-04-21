import argparse
from flask import Flask
from flask import jsonify
from flask import request
import numpy as np
from sentence_transformers import SentenceTransformer
from flask_cors import CORS

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

def main():
    global delay_ms
    parser = argparse.ArgumentParser(description="Web server with /hello endpoint")
    parser.add_argument("--port", type=int, default=8080, help="Port to run the server on")
    args = parser.parse_args()
    
    app.run(host='0.0.0.0', port=args.port)

if __name__ == "__main__":
    main()
