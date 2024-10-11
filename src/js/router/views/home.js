import { authGuard } from "../../utilities/authGuard.js";
import { onLogout } from "../../ui/auth/logout.js";
import { displayHomePosts } from "../../ui/post/home.js";

displayHomePosts()
authGuard(); 

const logoutButton = document.getElementById("logout-button");

if (logoutButton) {
  logoutButton.addEventListener("click", onLogout);
  
}

