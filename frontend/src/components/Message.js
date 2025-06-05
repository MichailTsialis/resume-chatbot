// src/components/Message.js
import React from "react";

function Message({ sender, text }) {
  return (
    <div className={`message ${sender === "user" ? "user" : "bot"}`}>
      <p>{text}</p>
    </div>
  );
}

export default Message;
