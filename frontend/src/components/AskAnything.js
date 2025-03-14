import React, { useState } from "react";
import "./AskAnything.css";

const AskAnything = ({ onSubmit }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const templateQueries = ["Best tea for relaxation?", "Energized drinks"];

  const handleTemplateClick = async (template) => {
    setQuery(template);
    await handleSubmit(null, template);
  };

  const handleSubmit = async (e, template) => {
    if (e) e.preventDefault();

    const queryToSubmit = template || query;
    if (queryToSubmit.trim()) {
      setLoading(true);
      try {
        await onSubmit(queryToSubmit);
      } catch (error) {
        console.error("Error submitting query:", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please type in a query.");
    }
  };

  return (
    <div className="ask-container">
      {/* Title */}
      <h1 className="ask-title">What can I help you with?</h1>

      {/* Search Bar */}
      <form onSubmit={(e) => handleSubmit(e)} className="search-form">
        <div className="search-bar">
          <i className="search-icon">🔍</i> {}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask me anything..."
            className="search-input"
            disabled={loading}
          />
        </div>
      </form>

      {/* Loading Spinner */}
      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      )}

      {/* Template Queries */}
      <h3 className="template-title">Template Queries</h3>
      <div className="template-queries">
        {templateQueries.map((template, index) => (
          <button
            key={index}
            onClick={() => handleTemplateClick(template)}
            className="template-button"
            disabled={loading}
          >
            {template}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AskAnything;
