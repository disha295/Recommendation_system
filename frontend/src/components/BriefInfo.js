import React from "react";

const BriefInfo = ({ recommendations, onGoBackClick }) => {
  console.log(recommendations);

  return (
    <div style={styles.pageContainer}>
      {/* Back Button */}
      <button onClick={onGoBackClick} style={styles.backButton}>
        ❮ Back
      </button>

      <div style={styles.heading}>
        <h1>Here are some recommendations for you:</h1>
      </div>

      {/* Cards Container */}
      <div style={styles.container}>
        {recommendations.map((rec) => (
          <div key={rec.id} style={styles.card}>
            {/* Product Title */}
            <h3 style={styles.title}>{rec.name}</h3>

            {/* Product Image */}
            <img src={rec.image} alt={rec.name} style={styles.image} />

            {/* Product Ingredients */}
            <div style={styles.ingredientsBox}>
              <h4 style={styles.sectionHeader}>Ingredients:</h4>
              <ul style={styles.ingredientsList}>
                {rec.ingredients.map((ingredient, index) => (
                  <li key={index} style={styles.ingredientItem}>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Benefits */}
            <div style={styles.effectsBox}>
              <h4 style={styles.sectionHeader}>Key Benefits:</h4>
              <ul style={styles.effectsList}>
                {rec.effects.map((effect, index) => (
                  <li key={index} style={styles.effectItem}>
                    {effect}
                  </li>
                ))}
              </ul>
            </div>

            {/* Augmented Description */}
            <div style={styles.augmentedDescriptionBox}>
              <h4 style={styles.sectionHeader}>Description:</h4>
              <p style={styles.augmentedDescriptionText}>
                {rec.augmented_description ||
                  "No additional details available."}
              </p>
            </div>

            {/* Product Price */}
            <div style={styles.priceBox}>
              <h4 style={styles.price}>Price: ${rec.price.toFixed(2)}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    fontFamily: "'Poppins', Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#cbdefa",
    minHeight: "100vh",
    justifyContent: "space-between",
  },

  backButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#007bff",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none",
    padding: "5px 10px",
    outline: "none",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "300px",
    padding: "15px",
    cursor: "pointer",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  title: {
    fontSize: "1.4rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  ingredientsBox: {
    marginTop: "10px",
    textAlign: "left",
    backgroundColor: "#f8f9fa",
    padding: "10px",
    borderRadius: "8px",
  },
  sectionHeader: {
    fontSize: "1rem",
    fontWeight: "600",
    marginBottom: "5px",
    color: "#34495e",
  },
  ingredientsList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  ingredientItem: {
    fontSize: "0.9rem",
    color: "#2c3e50",
    paddingBottom: "5px",
  },
  effectsBox: {
    marginTop: "10px",
    textAlign: "left",
    backgroundColor: "#f8f9fa",
    padding: "10px",
    borderRadius: "8px",
  },
  effectsList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  effectItem: {
    fontSize: "0.9rem",
    color: "#2c3e50",
    paddingBottom: "5px",
  },
  augmentedDescriptionBox: {
    marginTop: "10px",
    textAlign: "left",
    backgroundColor: "#f8f9fa",
    padding: "10px",
    borderRadius: "8px",
  },
  augmentedDescriptionText: {
    fontSize: "0.9rem",
    color: "#2c3e50",
  },
  priceBox: {
    marginTop: "10px",
    textAlign: "center",
    fontWeight: "600",
  },
  price: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#27ae60",
  },
};

export default BriefInfo;
