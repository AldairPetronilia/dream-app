import argparse
from flask import Flask
from flask import jsonify
from flask import request

app = Flask(__name__)

# Global variable for delay
delay_ms = 0

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

def main():
    global delay_ms
    parser = argparse.ArgumentParser(description="Web server with /hello endpoint")
    parser.add_argument("--port", type=int, default=8080, help="Port to run the server on")
    args = parser.parse_args()
    
    app.run(host='0.0.0.0', port=args.port)

if __name__ == "__main__":
    main()
