import axios from "axios";

export const getRecommendations = async (effect) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/recommendations",
      {
        params: { effect },
      }
    );
    if (Array.isArray(response.data)) {
      // If the backend sends an array directly
      return { recommendations: response.data }; // Wrap it in a "recommendations" object
    } else if (response.data && response.data.recommendations) {
      // If the backend sends the correct structure
      return response.data;
    } else {
      console.error("Unexpected response structure:", response.data);
      return { recommendations: [] }; // Fallback to an empty array
    }
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return { recommendations: [] }; // Handle errors gracefully
  }
};
