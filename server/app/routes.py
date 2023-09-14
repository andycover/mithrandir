from app import app
from flask import request, jsonify
from app.llms.gpt4all import getModelResponse

import os
import glob

#LOCAL_PATH = "C:/Users/andyc/AppData/Local/nomic.ai/GPT4All/ggml-model-gpt4all-falcon-q4_0.bin"
LOCAL_PATH = "/models"

def find_bin_files(directory):
    bin_files = []
    
    # Define the pattern to search for .bin files
    pattern = os.path.join(directory, "**/*.bin")
    
    # Use glob to find all .bin files in the specified directory and subdirectories
    bin_files = glob.glob(pattern, recursive=True)

    # Filter out file names that begin with "incomplete"
    bin_files = [file for file in bin_files if not os.path.basename(file).startswith("incomplete")]

    
    return bin_files

@app.route('/')
def index():
    return jsonify({"message": "Hello, Flask REST API!"})

@app.route('/', methods=['POST'])
def post_example():
    data = request.json  # Assuming the client sends data as JSON

    if 'prompt_string' in data:
        prompt_string = data['prompt_string']
        #response_string = f"Received: {prompt_string}"
        #use the first model found in this path
        model_list = find_bin_files(LOCAL_PATH)
        model_path = model_list[0]
        #use the first model found in this path
        response_string = getModelResponse(prompt_string, model_path)
        #Replace the \n with os specific newline char sequence
        #response_string = response_string.replace("\n", os.linesep)
        response_json = jsonify({"response_string": response_string, "model": os.path.basename(model_path)})
        return response_json
    else:
        return jsonify({"error": "No 'prompt_string' provided in the request."})
