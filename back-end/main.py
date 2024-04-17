from config import app, db
from model import Task
from flask import request, jsonify
from datetime import datetime

@app.route('/tasks', methods=['GET'])
def get_tasks():
    try:
        tasks = Task.query.all()
        tasks_json = list(map(lambda x: x.to_json(), tasks))
        
        if not tasks:
            return jsonify({"message": "No tasks found!"}), 404
        
        return jsonify({"tasks": tasks_json}), 200
    except Exception as e:
        return jsonify({"message": "There was an error " + str(e) + "!"}), 500

@app.route('/create_task', methods=['POST'])
def create_task():
    title = request.json.get('title')
    content = request.json.get('content')
    priority_level = request.json.get('priorityLevel')
    end_time_str = request.json.get('endTime')
    
    end_time = datetime.strptime(end_time_str, "%Y-%m-%d %H:%M:%S")
    start_time = datetime.now()
    
    new_task = Task(title = title, content = content, start_time = start_time, end_time = end_time, priority_level = priority_level)
    try:
        db.session.add(new_task)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": "There was an error " + str(e) + "!"}), 400
    
    return jsonify({"message": "New task created successfully!"}), 201

@app.route('/delete_task/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get(task_id)
    
    try:
        db.session.delete(task)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": "There was an error " + str(e) + "!"}), 400
    
    return jsonify({"message": "The task was deleted successfully!"}), 200

@app.route('/edit_task/<int:task_id>', methods=['PATCH'])
def edit_task(task_id):
    return NotImplementedError

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
    app.run(debug=True, port=3001)