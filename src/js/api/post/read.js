import { API_SOCIAL_POSTS, API_SOCIAL_PROFILES, API_KEY } from "../constants.js";

/**
 * Fetches multiple posts for the homepage.
 *
 * @param {number} [limit=12] - Number of posts per page.
 * @param {number} [page=1] - Page number.
 * @param {string} [tag] - Filter posts by tag.
 * @returns {Promise<Object>} The posts data with pagination.
 */

export async function readPosts(limit = 12, page = 1, tag) {
  try {
    const apiKey = localStorage.getItem("apiKey") || API_KEY;
    const accessToken = localStorage.getItem("accessToken");

    let url = `${API_SOCIAL_POSTS}?limit=${limit}&page=${page}`;
    if (tag) {
      url += `&tag=${encodeURIComponent(tag)}`;
    }

    const headers = {
      "X-Noroff-API-Key": apiKey,
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch posts.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in readPosts:", error);
    throw error;
  }
}

/**
 * Fetches a single post by its ID.
 *
 * @param {number|string} id - The ID of the post to retrieve.
 * @param {Object} [options] - Optional parameters to include additional data.
 * @param {boolean} [options.includeAuthor=false] - Whether to include author data.
 * @param {boolean} [options.includeComments=false] - Whether to include comments.
 * @param {boolean} [options.includeReactions=false] - Whether to include reactions.
 * @returns {Promise<Object>} The post data.
 */

export async function readPost(id, options = {}) {
  try {
    const apiKey = localStorage.getItem("apiKey") || API_KEY;
    const accessToken = localStorage.getItem("accessToken");

    let url = `${API_SOCIAL_POSTS}/${id}`;
    const queryParams = [];

    if (options.includeAuthor) {
      queryParams.push("_author=true");
    }
    if (options.includeComments) {
      queryParams.push("_comments=true");
    }
    if (options.includeReactions) {
      queryParams.push("_reactions=true");
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join("&")}`;
    }

    const headers = {
      "X-Noroff-API-Key": apiKey,
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    console.log("Read Single Post API response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch the post.");
    }

    const data = await response.json();
    console.log("Single post fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error in readPost:", error);
    throw error;
  }
}

/**
 * Fetches posts made by a specific user.
 *
 * @param {string} username - The username of the profile.
 * @param {number} [limit=12] - Number of posts per page.
 * @param {number} [page=1] - Page number.
 * @param {string} [tag] - Filter posts by tag.
 * @returns {Promise<Object>} The posts data with pagination.
 */

export async function readPostsByUser(username, limit = 12, page = 1, tag) {
  
  try {
    const apiKey = localStorage.getItem("apiKey") || API_KEY;
    const accessToken = localStorage.getItem("accessToken");

    if (!username) {
      throw new Error("Username is required to fetch posts.");
    }

    let url = `${API_SOCIAL_PROFILES}/${encodeURIComponent(username)}/posts?limit=${limit}&page=${page}`;
    if (tag) {
      url += `&tag=${encodeURIComponent(tag)}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Noroff-API-Key": apiKey,
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch user's posts:", errorData);
      throw new Error(errorData.message || "Failed to fetch user's posts.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}