// Chatbot.js

import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5001/api/prompt', { prompt });
      setResponse(res.data.response);
    } catch (error) {
      setResponse('Error fetching response. Please try again.');
    }
  };

  return (
    <div className="chatbot-container">
      <h1>Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default Chatbot;
