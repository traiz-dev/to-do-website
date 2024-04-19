from config import app, db
from model import Task
from flask import request, jsonify
from datetime import datetime

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    try:
        tasks = Task.query.all()
        tasks_json = list(map(lambda x: x.to_json(), tasks))
        
        if not tasks:
            return jsonify({"message": "No tasks found!"}), 404
        
        return jsonify({"tasks": tasks_json}), 200
    except Exception as e:
        return jsonify({"message": "There was an error " + str(e) + "!"}), 500

@app.route('/api/create_task', methods=['POST'])
def create_task():
    title = request.json.get('title')
    content = request.json.get('content')
    priority_level = request.json.get('priorityLevel')
    end_time_str = request.json.get('endTime')
    
    end_time = datetime.strptime(end_time_str, "%Y-%m-%d %H:%M:%S")
    start_time = datetime.now()
    last_updated = datetime.now()
    
    new_task = Task(
        title = title, 
        content = content, 
        start_time = start_time, 
        end_time = end_time, 
        priority_level = priority_level, 
        is_done = False, 
        last_updated = last_updated
        )
    
    try:
        db.session.add(new_task)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": "There was an error " + str(e) + "!"}), 400
    
    return jsonify({"message": "New task created successfully!"}), 201

@app.route('/api/delete_task/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get(task_id)
    
    try:
        db.session.delete(task)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": "There was an error " + str(e) + "!"}), 400
    
    return jsonify({"message": "The task was deleted successfully!"}), 200

@app.route('/api/edit_task/<int:task_id>', methods=['PATCH'])
def edit_task(task_id):
    task = Task.query.get(task_id)
    
    if not task:
        return jsonify({"message": "There was no task found!"}), 404
    
    task.title = request.json.get("title", task.title)
    task.content = request.json.get("content", task.content)
    task.priority_level = request.json.get("priorityLevel", task.priority_level)
    
    # Convert string representation of end_time to datetime object
    end_time_str = request.json.get('endTime')
    if end_time_str:
        task.end_time = datetime.strptime(end_time_str, '%Y-%m-%d %H:%M:%S')
        
    task.last_updated = datetime.now()
    
    try:
        db.session.commit()
    except Exception as e:
        return jsonify({"message": "There was an error" + str(e) + "!"}), 400
    
    return jsonify({"message": "The task was edited successfully!"}), 200

@app.route('/api/update_task/<int:task_id>', methods=['PUT', "PATCH"])
def update_task(task_id):
    try:
        task = Task.query.get(task_id)
        
        if not task:
            return jsonify({"message": "There was no task found!"}), 404
        
        # Toggle the is_done field directly
        task.is_done = not task.is_done
        
        try:
            # Commit the changes to the database
            db.session.commit()
        except Exception as e:
            return jsonify({"message": "There was an error while updating database " + str(e) + "!"}), 400
            
        return jsonify({"message": "Task updated successfully!"}), 200
    except Exception as e:
        return jsonify({"message": "There was an error while performing update " + str(e) + "!"}), 400
    
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
    app.run(debug=True, port=3001)