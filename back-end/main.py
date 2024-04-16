from config import app, db
from model import Task
from flask import request, jsonify

@app.route('/', methods=['GET'])
def test():
    return jsonify({"message": "SERVER WORKS"}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
    app.run(debug=True, port=3001)