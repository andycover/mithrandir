from app import app
from flask import request, jsonify
from app.llms.gpt4all import getModelResponse

LOCAL_PATH = "C:/Users/andyc/AppData/Local/nomic.ai/GPT4All/ggml-model-gpt4all-falcon-q4_0.bin"

@app.route('/')
def index():
    return jsonify({"message": "Hello, Flask REST API!"})

@app.route('/', methods=['POST'])
def post_example():
    data = request.json  # Assuming the client sends data as JSON

    if 'prompt_string' in data:
        prompt_string = data['prompt_string']
        #response_string = f"Received: {prompt_string}"
        response_string = f"{getModelResponse(prompt_string, LOCAL_PATH)}"
        return jsonify(response_string)
    else:
        return jsonify({"error": "No 'prompt_string' provided in the request."})
