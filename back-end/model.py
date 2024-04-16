from config import db

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300), unique=False)
    content = db.Column(db.String(300), unique=False)
    start_time = db.Column(db.DateTime, unique=False)
    end_time = db.Column(db.DateTime, unique=False)
    priority_level = db.Column(db.Integer, unique=False)
    
    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'startTime': self.start_time,
            'endTime': self.end_time,
            'priorityLevel': self.priority_level
        }