from langchain import PromptTemplate, LLMChain
from langchain.llms import GPT4All
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

def getModelResponse(question, local_path):
    template = """Question: {question}\n\nAnswer: Let's think step by step."""
    template2 = """Question: {question}\n\nAnswer: Let's think step by step. If I understand correctly what you want is to """
    prompt = PromptTemplate(template=template2, input_variables=["question"])

    callbacks = [StreamingStdOutCallbackHandler()]

    llm = GPT4All(model=local_path, callbacks=callbacks, verbose=True)

    llm_chain = LLMChain(prompt=prompt, llm=llm)

    response = llm_chain.run(question)
    return response

# Example usage
'''
question = "Write a short horror story."
local_path = "C:/Users/user1/AppData/Local/nomic.ai/GPT4All/ggml-model-gpt4all-falcon-q4_0.bin"
response = getModelResponse(question, local_path)
print(response)
'''
