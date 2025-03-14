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
      return { recommendations: response.data };
    } else if (response.data && response.data.recommendations) {
      return response.data;
    } else {
      console.error("Unexpected response structure:", response.data);
      return { recommendations: [] };
    }
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return { recommendations: [] };
  }
};
