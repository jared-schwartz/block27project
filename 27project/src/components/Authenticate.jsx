import { useState } from "react";

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleClick() {
    // Check if token is valid
    if (!token) {
      setError("Token is missing or invalid.");
      setSuccessMessage(null);
      return;
    }

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.statusText}`);
      }

      const result = await response.json();
      setSuccessMessage(result.message); // Display success message
      setError(null); // Clear any error messages
    } catch (error) {
      setError(error.message); // Display error message
      setSuccessMessage(null); // Clear success message
    }
  }

  return (
    <div>
      <h2>Authenticate</h2>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}
