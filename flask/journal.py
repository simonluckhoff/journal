from datetime import date
import json
import os


def lets_journal():
    date_today = date.today().strftime("%d-%m-%Y")
    print(date_today)
    user_entry = input()

    new_entry = {
        "date_today": date_today,
        "user_entry": user_entry
    }

    filename = "entries.json"

    if not os.path.exists(filename) or os.stat(filename).st_size == 0:
        data = {"journal_entries": []}
    else:
        with open(filename, "r") as file:
            data = json.load(file)

    data["journal_entries"].append(new_entry)

    with open(filename, "w") as file:
        json.dump(data, file, indent=2)

# must call the methods you idiot.

