from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up logging
logging.basicConfig(level=logging.DEBUG)

try:
    summarizer = pipeline("summarization")
except Exception as e:
    app.logger.error(f"Error initializing summarization pipeline: {e}")
    summarizer = None

@app.route('/summarize', methods=['POST'])
def summarize():
    if summarizer is None:
        return jsonify({'error': 'Summarization pipeline is not initialized'}), 500

    data = request.get_json()
    text = data.get('text', '')

    if not text:
        return jsonify({'error': 'No text provided'}), 400

    try:
        summary = summarizer(text, max_length=150, min_length=30, length_penalty=2.0, num_beams=4, early_stopping=True)
        return jsonify({'summary': summary[0]['summary_text']})
    except Exception as e:
        app.logger.error(f"Error during summarization: {e}")
        return jsonify({'error': 'Error during summarization'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001)