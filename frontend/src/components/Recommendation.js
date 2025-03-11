import React from "react";

const Recommendation = ({ recommendation, onBackClick }) => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Details for: {recommendation.name}</h2>
      <p>{recommendation.description}</p>
      <h4>Ingredients:</h4>
      <ul>
        {recommendation.ingredient_details.map((detail, index) => (
          <li key={index}>
            {detail.ingredient}: {detail.properties}
          </li>
        ))}
      </ul>
      <button
        onClick={onBackClick}
        style={{
          background: "#007BFF",
          color: "#fff",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        Back to Recommendations
      </button>
    </div>
  );
};

export default Recommendation;
