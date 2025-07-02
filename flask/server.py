from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from journal import lets_journal
import json

app = Flask(__name__)
CORS(app)      # allows for requests from React

@app.route('/api/journal', methods=['GET', 'POST'])
def display_entries():
    if request.method == 'GET':
        with open('entries.json', 'r') as file:
            data = json.load(file)
        return jsonify(data['journal_entries'])
    elif request.method == 'POST':
        data = request.get_json()
        if not data: 
            return jsonify({"status": "error", "message": "No data provided"}), 400
        result = lets_journal
        return jsonify(result)
    
    result = lets_journal
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)