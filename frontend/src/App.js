import React, { useState, useEffect } from "react";
import AskAnything from "./components/AskAnything";
import BriefInfo from "./components/BriefInfo";
import Recommendation from "./components/Recommendation";
import { getRecommendations } from "./services/api";

function App() {
  const [query, setQuery] = useState(""); // User query state
  const [recommendations, setRecommendations] = useState([]); // Recommendations state
  const [selectedRecommendation, setSelectedRecommendation] = useState(null); // Selected recommendation

  // Handle user query submission
  const handleUserQuery = async (userQuery) => {
    try {
      setQuery(userQuery); // Update the query state
      console.log("User query submitted:", userQuery); // Debug log
      const effect = userQuery; // Use user query directly as effect
      const response = await getRecommendations(effect); // Fetch recommendations
      console.log("Fetched recommendations:", response.recommendations); // Debug log
      setRecommendations(response.recommendations || []); // Update recommendations state
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setRecommendations([]); // Reset recommendations on error
    }
  };

  // Handle "Show Details" click
  const handleShowDetailsClick = (recommendation) => {
    setSelectedRecommendation(recommendation); // Set the selected recommendation
  };

  // Handle "Back" click
  const handleBackClick = () => {
    setSelectedRecommendation(null); // Reset the selected recommendation
  };

  // Debug recommendation state updates
  useEffect(() => {
    console.log("Updated recommendations state in App.js:", recommendations);
  }, [recommendations]);

  // Fetch default recommendations on page load
  useEffect(() => {
    const fetchRecommendations = async () => {
      const response = await getRecommendations("relaxation"); // Fetch default recommendations
      console.log("Default fetched recommendations:", response.recommendations); // Debug log
      if (response && response.recommendations) {
        setRecommendations(response.recommendations); // Set default recommendations
      }
    };
    fetchRecommendations();
  }, []);

  return (
    <div>
      {/* Conditional rendering for different app states */}
      {!query ? (
        <AskAnything onSubmit={handleUserQuery} />
      ) : selectedRecommendation ? (
        <Recommendation
          recommendation={selectedRecommendation}
          onBackClick={handleBackClick}
        />
      ) : (
        <BriefInfo
          query={query}
          recommendations={recommendations}
          onShowDetailsClick={handleShowDetailsClick}
        />
      )}
    </div>
  );
}

export default App;
