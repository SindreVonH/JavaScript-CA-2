import { authGuard } from "../../utilities/authGuard";
import { displayProfilePosts } from "../../ui/post/profile.js";

displayProfilePosts();
authGuard();
