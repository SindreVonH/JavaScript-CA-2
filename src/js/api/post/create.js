import { API_SOCIAL_POSTS } from "../constants.js";

/**
 * Creates a new post.
 *
 * @param {Object} postData - The data for the new post.
 * @param {string} postData.title - The title of the post (required).
 * @param {string} [postData.body] - The body/content of the post (optional).
 * @param {Array<string>} [postData.tags] - Tags associated with the post (optional).
 * @param {Object} [postData.media] - Media associated with the post (optional).
 * @param {string} [postData.media.url] - URL of the media (optional).
 * @param {string} [postData.media.alt] - Alt text for the media (optional).
 *
 * @returns {Promise<Object>} The response data from the API.
 */

export async function createPost(postData) {

  try {
    const apiKey = localStorage.getItem("apiKey");
    const accessToken = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user"));

    const response = await fetch(API_SOCIAL_POSTS, {
      method: "POST",
      headers: {
        "X-Noroff-API-Key": apiKey,
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Create post failed:", errorData);
      throw new Error(errorData.message || "Create post failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during creating post:", error);
    throw error;
  }
}






