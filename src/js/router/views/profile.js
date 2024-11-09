import { authGuard } from "../../utilities/authGuard";
import { displayProfilePosts } from "../../ui/post/profile.js";
import { onLogout } from "../../ui/auth/logout.js";

displayProfilePosts();
authGuard();

const logoutButton = document.getElementById("logout-button");

if (logoutButton) {
  logoutButton.addEventListener("click", onLogout);
  
}
