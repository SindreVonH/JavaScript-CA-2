export function authGuard() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.warn("No JWT token found. Redirecting to login.");
    window.location.href = "/auth/login/index.html"; 
  } 
}
