from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, send
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
socketio = SocketIO(app)

# Set up a folder to store uploaded files
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'txt', 'pdf', 'doc', 'docx'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Create the upload folder if it doesn't exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Helper function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return render_template('index.html')

# Handling messages from frontend
@socketio.on('message')
def handle_message(msg):
    # If the message contains a file, handle it
    if isinstance(msg, dict) and 'file' in msg:
        # Get the file and save it
        file = msg['file']
        filename = secure_filename(file.filename)
        if allowed_file(filename):
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            send(f"File {filename} received and saved.", broadcast=True)
        else:
            send(f"File {filename} is not allowed.", broadcast=True)
    else:
        # Normal text message
        send(msg, broadcast=True)

# Route to handle file uploads directly (optional if needed)
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify({'message': f'File {filename} uploaded successfully'}), 200
    return jsonify({'error': 'File type not allowed'}), 400

if __name__ == '__main__':
    socketio.run(app, debug=True)
