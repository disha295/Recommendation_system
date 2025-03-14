import React, { useState, useEffect } from "react";
import AskAnything from "./components/AskAnything";
import BriefInfo from "./components/BriefInfo";
import { getRecommendations } from "./services/api";

const App = () => {
  const [query, setQuery] = useState(""); // User's query
  const [recommendations, setRecommendations] = useState([]); // Recommendations fetched
  const [currentPage, setCurrentPage] = useState("askAnything"); // Tracks current page

  // Handle user query submission
  const handleOnSubmit = async (userQuery) => {
    try {
      setQuery(userQuery);
      const response = await getRecommendations(userQuery);
      setRecommendations(response.recommendations || []);
      setCurrentPage("briefInfo");
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  // Go back functionality
  const handleGoBackClick = () => {
    setCurrentPage("askAnything");
  };
  useEffect(() => {
    console.log("App mounted or updated");
  }, []);

  return (
    <div>
      {currentPage === "askAnything" && (
        <AskAnything onSubmit={handleOnSubmit} />
      )}
      {currentPage === "briefInfo" && (
        <BriefInfo
          query={query}
          recommendations={recommendations}
          onGoBackClick={handleGoBackClick}
        />
      )}
    </div>
  );
};

export default App;
