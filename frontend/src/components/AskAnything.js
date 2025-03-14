import React, { useState } from "react";
import "./AskAnything.css"; // Import CSS file for styling

const AskAnything = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const templateQueries = ["Best tea for relaxation?", "Energized drinks"];

  const handleTemplateClick = (template) => {
    setQuery(template); // Update the query state
    onSubmit(template); // Automatically submit the query
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
    } else {
      alert("Please type in a query.");
    }
  };

  return (
    <div className="ask-container">
      {/* Title */}
      <h1 className="ask-title">What can I help you with?</h1>

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-bar">
          <i className="search-icon">🔍</i> {/* Icon inside input field */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask me anything..."
            className="search-input"
          />
        </div>
      </form>

      {/* Template Queries */}
      <h3 className="template-title">Template Queries</h3>
      <div className="template-queries">
        {templateQueries.map((template, index) => (
          <button
            key={index}
            onClick={() => handleTemplateClick(template)}
            className="template-button"
          >
            {template}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AskAnything;
