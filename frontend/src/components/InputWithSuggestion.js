/*import React, { useState, useRef } from "react";

const suggestions = [
  "what are your hobbies?",
  "where do you study?",
  "how old are you?",
  "when is your birthday?",
  "why do you want this job?"
];

export default function InputWithSuggestion({ onSend }) {
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const inputRef = useRef(null);

  const onChange = (e) => {
    const val = e.target.value;
    setInput(val);

    if (!val) {
      setSuggestion("");
      return;
    }

    // Find first suggestion that starts with input (case insensitive)
    const match = suggestions.find(s => s.toLowerCase().startsWith(val.toLowerCase()));
    if (match && match.toLowerCase() !== val.toLowerCase()) {
      setSuggestion(match);
    } else {
      setSuggestion("");
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && suggestion) {
      e.preventDefault();
      setInput(suggestion);
      setSuggestion("");
      if(onSend) onSend(suggestion);
    } else if (e.key === "Tab" && suggestion) {
      // Optional: Accept suggestion on Tab key
      e.preventDefault();
      setInput(suggestion);
      setSuggestion("");
    } else if (e.key === "Enter") {
      if(onSend) onSend(input);
      setInput("");
      setSuggestion("");
    }
  };

  return (
    <div style={{ position: "relative", width: "300px" }}>
      {/* Ghost text div behind input */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          color: "gray",
          pointerEvents: "none",
          fontFamily: "inherit",
          fontSize: "inherit",
          padding: "8px",
          whiteSpace: "pre-wrap",
          userSelect: "none",
          opacity: 0.5,
          zIndex: 0,
        }}
      >
        {suggestion && suggestion.toLowerCase().startsWith(input.toLowerCase())
          ? input + suggestion.slice(input.length)
          : ""}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={{
          position: "relative",
          background: "transparent",
          width: "100%",
          padding: "8px",
          fontFamily: "inherit",
          fontSize: "inherit",
          zIndex: 1,
          boxSizing: "border-box"
        }}
        placeholder="Type a question"
      />
    </div>
  );
}
