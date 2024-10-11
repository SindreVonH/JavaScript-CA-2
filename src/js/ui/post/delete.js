import { API_SOCIAL_POSTS, API_KEY } from "../../api/constants.js";

/**
 * Handles the deletion of a post.
 *
 * @param {Event} event - The click event on the delete button.
 */

export async function onDeletePost(event) {
  event.preventDefault();
  event.stopPropagation(); 
  const button = event.target;
  const postId = button.getAttribute("data-post-id");

  if (!postId) {
    console.error("Post ID not found.");
    return;
  }
  const confirmDelete = confirm("Are you sure you want to delete this post?");
  if (!confirmDelete) {
    return;
  }
  const apiKey = localStorage.getItem("apiKey") || API_KEY;
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    alert("You are not authenticated. Please log in.");
    return;
  }

  const deleteUrl = `${API_SOCIAL_POSTS}/${postId}`;

  try {
    const response = await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        "X-Noroff-API-Key": apiKey,
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete the post.");
    }
    alert("Post deleted successfully.");
    const postCard = button.closest(".post-card");
    if (postCard) {
      postCard.remove();
    }

  } catch (error) {
    console.error("Error deleting post:", error);
    alert(`Failed to delete post: ${error.message}`);
  }
}
