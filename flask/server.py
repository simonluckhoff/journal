from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from journal import lets_journal
import json

app = Flask(__name__)
CORS(app)      # allows for requests from React

# that /api/ allows to navigate, reverse proxying
@app.route('/api/entries', methods=['GET'])
def get_entries():
    with open('entries.json') as f:
        entries = json.load(f)
    return jsonify(entries)


# need this line to engage with the server, otherwise will just execute the folder. 
if __name__ == '__main__':
    app.run(debug=True)