import { login } from "../../api/auth/login.js";
import { API_KEY } from "../../api/constants.js";

/**
 * Handles the login form submission.
 *
 * @param {Event} event - The form submission event.
 */

export async function onLogin(event) {
  event.preventDefault(); 
  const form = event.target;
  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.textContent = "Logging in...";
  const email = form.email.value.trim();
  const password = form.password.value.trim();
  const credentials = {
    email,
    password,
  };

  try {
    const response = await login(credentials);
    if (response.data && response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
    } else {
        throw new Error("No access token received.");
    }
    if (response.data) {
        const { accessToken, ...userData } = response.data; 
        localStorage.setItem("user", JSON.stringify(userData));
    } else {
        console.warn("No user data received from login response.");
    }

    localStorage.setItem("apiKey", API_KEY);
    alert("Login successful!");
    
  } catch (error) {
    console.error("Login error:", error);
    alert(`Login failed: ${error.message}`);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Login";
  }
}
