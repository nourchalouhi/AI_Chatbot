from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import google.generativeai as genai

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})  # Allow requests from React at http://localhost:3000

api_key = os.getenv('API_KEY')
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-pro')


@app.route('/api/prompt', methods=['POST'])
def get_response():
    data = request.get_json()
    prompt = data.get('prompt')
    response = model.generate_content(prompt)
    summary_generated = response.text

    if prompt.endswith('?'):
        summary_generated = "Thank you for your question. " + summary_generated
   
    return jsonify({"response": summary_generated})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
