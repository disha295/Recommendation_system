import json

def load_json_data(file_name):
    try:
        with open(file_name, "r") as file:
            data = json.load(file)
            print(f"Loaded data: {data}")  # Debug line to check the loaded data
            return data
    except Exception as e:
        print(f"Error loading data: {e}")
        return []
