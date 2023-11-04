from flask import Flask, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Hello, World!"

@app.route("/board", methods=["GET", "POST"])
def board():
    if request.method == "GET":
        board_response = requests.get("http://localhost:4000/board")
        if board_response.status_code == 200:
            return board_response.json(), 200
        else:
            return "ERROR", 500
    elif request.method == "POST":
        board_response = requests.post("http://localhost:4000/board", request.get_json())
        if board_response.status_code == 200:
            return board_response.json(), 200
        else:
            return "ERROR", 500

@app.route("/board/<int:id>", methods=["GET", "PUT", "DELETE"])
def boardDetail(id):
    if request.method == "GET":
        board_response = requests.get(f"http://localhost:4000/board/{id}")
        if board_response.status_code == 200:
            return board_response.json(), 200
        else:
            return "ERROR", 500
    elif request.method == "PUT":
        board_response = requests.put(f"http://localhost:4000/board/{id}", request.get_json())
        print(board_response.text)
        if board_response.status_code == 200:
            return board_response.json(), 200
        else:
            return "ERROR", 500
    elif request.method == "DELETE":
        board_response = requests.delete(f"http://localhost:4000/board/{id}")
        print(board_response.text)
        if board_response.status_code == 200:
            return board_response.json(), 200
        else:
            return "ERROR", 500

if __name__ == "__main__":
    app.run(debug=True)