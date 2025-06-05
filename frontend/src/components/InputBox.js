// src/components/InputBox.js
import React, { useState, useEffect, useRef } from "react";

const suggestionsMap = {
  what: "what are your hobbies?",
  where: "where do you study?",
  who: "who are you?",
  how: "how do you work?",
  when: "when did you graduate?",
};

function InputBox({ onSend, suggestionsEnabled }) {
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!suggestionsEnabled) {
      setSuggestion("");
      return;
    }

    const firstWord = input.trim().split(" ")[0].toLowerCase();
    const match = suggestionsMap[firstWord];

    if (match && input.length < match.length) {
      setSuggestion(match);
    } else {
      setSuggestion("");
    }
  }, [input, suggestionsEnabled]);

  const handleClick = () => {
    const toSend =
      suggestion && input.trim() === suggestion.slice(0, input.trim().length)
        ? suggestion
        : input;

    if (toSend.trim()) {
      onSend(toSend);
      setInput("");
      setSuggestion("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    } else if (e.key === "Tab" && suggestion) {
      e.preventDefault();
      setInput(suggestion);
      setSuggestion("");
    }
  };

  return (
    <div className="input-box" style={{ display: "flex", alignItems: "center" }}>
      <div style={{ position: "relative", flex: 1 }}>
        {/* Ghost suggestion */}
        {suggestionsEnabled && suggestion && input !== suggestion && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              padding: "10px",
              color: "#ccc",
              fontFamily: "inherit",
              fontSize: "14px",
              pointerEvents: "none",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {suggestion}
          </div>
        )}

        {/* Real input */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          placeholder="Ask something..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            width: "calc(100% - 60px)",
            padding: "10px",
            paddingRight: "60px",
            fontFamily: "inherit",
            fontSize: "14px",
            backgroundColor: "transparent",
            border: "1px solid #ccc",
            borderRadius: "4px",
            position: "relative",
            zIndex: 1,
          }}
        />
      </div>

      <button
        onClick={handleClick}
        style={{
          marginLeft: "8px",
          padding: "10px 16px",
          backgroundColor: "#6c63ff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontSize: "14px",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
}

export default InputBox;
