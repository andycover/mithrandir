# mithrandir
A web client and server setup for interacting with local llm models
Currently it only supports nomic.ai gpt4all models
You can run the client as standalone container
For running the server you should mount a volume which should have the model to be used
for example if you have a model like: C:/Users/User1/AppData/Local/nomic.ai/GPT4All/ggml-model-gpt4all-falcon-q4_0.bin
then you can run it like this to map the model directory to /models in the container
The code will search for all bin files and try to load the first one
-p 5000:5000 -v C:/Users/User1/AppData/Local/nomic.ai/GPT4All:/models
