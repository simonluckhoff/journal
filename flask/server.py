from flask import Flask, request, jsonify
from flask_cors import CORS
from journal import lets_journal

app = Flask(__name__)
CORS(app)

@app.route('api/journal', methods=['POST'])
def journal():
    data = request.get_json()
    if not data: 
        return jsonify({"status": "error", "message": "No data provided"}), 400
    
    result = lets_journal
    return jsonify(result)

lets_journal()

if __name__ == '__main__':
    app.run(debug=True)