import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [requestResponses, setRequestResponses] = useState([]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {
    if (inputText.trim() === '') {
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Replace this with your actual API call
    const mockResponse = `AI response to: ${inputText}`;
    const newRequestResponse = { request: inputText, response: mockResponse };

    setRequestResponses([...requestResponses, newRequestResponse]);
    setResponse(mockResponse);

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
            <strong>Your Question:</strong> {item.request}
            <br />
            <strong>AI Response:</strong> {item.response}
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
