import React, { useState } from 'react';
import './App.css';
import { callApi } from './api/restapi';

//const url = "http://localhost:5000";

function App() {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [requestResponses, setRequestResponses] = useState([]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {
    console.log('Entering submit handler ...')
    if (inputText.trim() === '') {
      return;
    }

    setIsLoading(true);
    console.log("Loading ...")

    const request = { "prompt_string": inputText };

    try {
      console.log("Attempting connection")
      const responseString = await callApi("http://localhost:5000", request);

      // Simulate API call delay
      //await new Promise((resolve) => setTimeout(resolve, 1000));

      // Replace this with your actual API call
      //const responseString = `${inputText}`;
      //const responseString = apiResponse.data;
      const newRequestResponse = { request: inputText, response: responseString };

      setRequestResponses([...requestResponses, newRequestResponse]);
      //setResponse(mockResponse);
      setResponse(responseString);

    } catch (error) {
      console.error('Error fetching reponse: ', error.message);
    }

    setInputText('');
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit();
    } else if (e.shiftKey && e.key === 'Enter') {
      setInputText(inputText + '\n');
    }
  };

  return (
    <div className="App">
      <div className="previous-responses">
        {requestResponses.map((item, index) => (
          <div key={index} className="previous-response">
            <strong>You:</strong> <p>{item.request}</p>
            <br />
            <strong>Mithrandir: </strong> {item.response}
          </div>
        ))}
      </div>
      <div className="input-container">
        <textarea
          rows="3"
          placeholder="Enter your question..."
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button onClick={handleSubmit} disabled={isLoading}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
