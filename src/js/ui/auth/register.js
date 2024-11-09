import { register } from "../../api/auth/register";

/**
 * Handles the registration form submission.
 *
 * @param {Event} event - The form submission event.
 */

export async function onRegister(event) {
  event.preventDefault(); 
  const form = event.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value.trim();
  const userData = {
    name,
    email,
    password,
  };
  try {
    const response = await register(userData);
    console.log("User registered successfully:", response);

    alert("Registration successful! Redirecting to login page...");
  } catch (error) {
    console.error("Registration error:", error);
    alert(`Registration failed: ${error.message}`);
  }
}
