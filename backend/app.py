from flask import Flask, request, jsonify
from groq import Groq
from langchain.chains import ConversationChain
from langchain.chains.conversation.memory import ConversationBufferWindowMemory
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)
groq_api_key = os.environ['GROQ_API_KEY'] 

# Initialize Groq Langchain chat object and conversation
groq_chat = ChatGroq(
    groq_api_key=groq_api_key,
    model_name='mixtral-8x7b-32768',  # Default model
)

conversation_memory = ConversationBufferWindowMemory(k=10)  # Default memory length
conversation = ConversationChain(llm=groq_chat, memory=conversation_memory)

@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_question = data.get('userQuestion')
    model = data.get('model')
    
    # Change model if provided in the request
    if model and model in ['mixtral-8x7b-32768', 'llama2-70b-4096']:
        groq_chat.model_name = model

    response = conversation(user_question)
    return jsonify(response)


if __name__ == '__main__':
    app.run(port=5000,debug=True)  # You may want to set debug to False in production
