import { API_AUTH_LOGIN } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Logs in a user.
 *
 * @param {Object} credentials - The user's login credentials.
 * @param {string} credentials.email - The user's email.
 * @param {string} credentials.password - The user's password.
 *
 * @returns {Promise<Object>} The response data from the API.
 */

export async function login(credentials) {

  try {
    const response = await fetch(`${API_AUTH_LOGIN}`, {
      method: "POST",
      headers: {
        ...headers(), 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Login failed:", errorData);
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();

    return data; 
  } catch (error) {
    throw error;
  }
}


