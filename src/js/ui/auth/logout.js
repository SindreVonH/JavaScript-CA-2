/**
 * Logs out the user by clearing the JWT token and user data.
 */

export function onLogout() {
  console.log("Logout function called.");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  localStorage.removeItem("apiKey");
  console.log("JWT token and user data removed from localStorage.");
  alert("You have been logged out.");
  window.location.href = "/auth/login/";
}