import { API_AUTH_REGISTER } from "../constants";
import { headers } from "../headers";

/**
 * Registers a new user.
 *
 * @param {Object} userData - The user data to register.
 * @param {string} userData.name - The username (required).
 * @param {string} userData.email - The user's email (required).
 * @param {string} userData.password - The user's password (required).
 *
 * @returns {Promise<Object>} The response data from the API.
 */

export async function register(userData) {
  console.log("Register function called with data:", userData);
  
  try {
    const response = await fetch(`${API_AUTH_REGISTER}`, {
      method: "POST",
      headers: {
        ...headers(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    console.log("Register API response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Registration failed:", errorData);
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await response.json();
    console.log("Registration successful:", data);
    return data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}


