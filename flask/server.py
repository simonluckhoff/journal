from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from journal import lets_journal
import json
import os
import datetime

app = Flask(__name__)
CORS(app)   

# that /api/ allows to navigate, reverse proxying
@app.route('/api/entries', methods=['GET', 'POST', 'PATCH'])
def add_entry():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    json_file = os.path.join(current_dir, 'entries.json')

    if request.method == 'POST':
        data = request.json
        date_today = data.get('date_today')
        title = data.get('title')
        user_entry = data.get('user_entry')

        new_entry = {
            "date_today": date_today,
            "slug": title,
            "title": title,
            "user_entry": user_entry,
            "created_at": datetime.datetime.now().isoformat()
        }

        try:
            if os.path.exists(json_file) and os.stat(json_file).st_size > 0:
                with open(json_file, "r") as file:
                    entries = json.load(file)
            else:
                entries = []

            entries.append(new_entry)
            with open(json_file, 'w') as file: 
                json.dump(entries, file, indent=2)

            return jsonify({'message': 'Entry added and saved!'}), 200
        except Exception as e:
            return jsonify({'message': f'Error: {str(e)}'}), 500
        
    if request.method == 'GET':
        try: 
            if os.path.exists(json_file) and os.stat(json_file).st_size > 0:
                with open(json_file, "r") as file:
                    entries = json.load(file)
            else:
                entries = []
            # entries=sorted(entries, key=lambda x: datetime.datetime.strptime(x['date_today'], "%d-%m-%Y"), reverse=True)
            entries=sorted(entries, key=lambda x: x.get('created_at', x['date_today']), reverse=True)
            return jsonify(entries), 200
        except Exception as e:
            return jsonify({'message': f'Error: {str(e)}'}), 500
        

        
    if request.method == 'PATCH':
        data = request.get_json()
        with open('entries.json', 'r') as f:
            entries = json.load(f)

        for entry in entries:
            if entry['slug'] == slug:
                entry['date_today'] = data.get('date_today', entry['date_today'])
                entry['title'] = data.get('title', entry['title'])
                entry['user_entry'] = data.get('user_entry', entry['user_entry'])
                break

        with open('entries.json', 'w') as f:
            json.dump(entries, f, indent=2)

        return jsonify({'message': 'Entry updated successfully'})


        
if __name__ == '__main__':
    app.run(debug=True)