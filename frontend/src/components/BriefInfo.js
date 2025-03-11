import React from "react";

const BriefInfo = ({ query, recommendations, onShowDetailsClick }) => {
  console.log("Recommendations received in BriefInfo.js:", recommendations); // Debug log

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Recommendations for: "{query}"</h2>

      {Array.isArray(recommendations) && recommendations.length > 0 ? (
        recommendations.map((rec, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "15px",
              margin: "20px 0",
              textAlign: "center",
            }}
          >
            <h3>{rec.name}</h3>
            <p>{rec.description}</p>
            {rec.image && (
              <img
                src={rec.image}
                alt={rec.name}
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  margin: "10px 0",
                }}
              />
            )}
            <button
              onClick={() => onShowDetailsClick(rec)}
              style={{
                background: "#007BFF",
                color: "#fff",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Show Details
            </button>
          </div>
        ))
      ) : (
        <p>No recommendations found.</p>
      )}
    </div>
  );
};

export default BriefInfo;
