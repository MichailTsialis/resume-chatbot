// App.js
import React, { useState } from "react";
import ChatBox from "./components/ChatBox";
import InputBox from "./components/InputBox";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [suggestionsEnabled, setSuggestionsEnabled] = useState(true);


  const handleSend = async (userInput) => {
    const userMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userInput }),
      });

      const data = await res.json();
      const botMessage = { sender: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { sender: "bot", text: "Error contacting server." };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="app-container">
      <h1>Michail Tsialis' Agent</h1>
      <ChatBox messages={messages} />
      <InputBox onSend={handleSend} suggestionsEnabled={suggestionsEnabled} />
      <div style={{ textAlign: "center", marginTop: "12px" }}>
  <label>
    <input
      type="checkbox"
      checked={suggestionsEnabled}
      onChange={() => setSuggestionsEnabled(!suggestionsEnabled)}
    />
    Enable Suggestions
  </label>
  </div>
</div>
    
  );

}

export default App;



