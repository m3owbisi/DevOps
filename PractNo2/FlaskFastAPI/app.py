from flask import Flask, jsonify, request
app = Flask(__name__)
# In-memory storage for to-dos
todos = []
# Create
@app.route('/', methods=['POST'])
def create_todo():
    todo = request.get_json()
    todos.append(todo)
    return jsonify(todo), 201
# Read All
@app.route('/', methods=['GET'])
def get_all_todos():
    return jsonify(todos)
# Read One
@app.route('//<int:todo_id>', methods=['GET'])
def get_todo(todo_id):
    for todo in todos:
        if todo['id'] == todo_id:
            return jsonify(todo)
    return jsonify({'error': 'To-Do not found'}), 404
# Update
@app.route('//<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    updated_data = request.get_json()
    for i, todo in enumerate(todos):
        if todo['id'] == todo_id:
            todos[i] = updated_data
            return jsonify(updated_data)
    return jsonify({'error': 'To-Do not found'}), 404
# Delete
@app.route('//<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    for i, todo in enumerate(todos):
        if todo['id'] == todo_id:
            del todos[i]
            return jsonify({'message': 'Deleted successfully'})
    return jsonify({'error': 'To-Do not found'}), 404
if __name__ == '__main__':
    app.run(debug=True)