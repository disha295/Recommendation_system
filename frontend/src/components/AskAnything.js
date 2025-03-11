import React, { useState } from "react";

const AskAnything = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const templateQueries = [
    "Best tea for relaxation?",
    "Snacks for movie night?",
    "Gifts for coffee lovers?",
    "Energy drinks under $10?",
  ];

  const handleSubmit = () => {
    if (query.trim()) {
      onSubmit(query); // Pass query to parent component
    } else {
      alert("Please type in a query.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>What can I help you with?</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything..."
          style={{
            width: "60%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            marginLeft: "10px",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "#007BFF",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          ➡️
        </button>
      </div>

      <h3 style={{ textAlign: "center" }}>Template Queries</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {templateQueries.map((template, index) => (
          <button
            key={index}
            onClick={() => setQuery(template)}
            style={{
              padding: "10px 15px",
              background: "#f1f1f1",
              border: "1px solid #ccc",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {template}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AskAnything;
