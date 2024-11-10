import { readPost } from "../../api/post/read.js";

/**
 * Extracts the post ID from the current URL.
 *
 * @returns {number|string|null} The post ID if present, otherwise null.
 */

export function getPostIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");
  console.log(`Extracted postId: ${postId}`);
  return postId;
}

/**
 * Creates an HTML element for a single post.
 *
 * @param {Object} post - The post data.
 * @returns {HTMLElement} The post element.
 */

export function createPostElement(post) {
  const postContainer = document.createElement("div");
  postContainer.classList.add(
    "bg-gray-800",
    "text-gray-100",
    "p-6",
    "rounded-lg",
    "shadow-md",
    "mb-6"
  );

  postContainer.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">${post.title}</h2>
    ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}" class="w-full h-100 object-cover rounded-md mb-6"/>` : ""}
    <p class="text-gray-300 mb-4">${post.body}</p>
    ${post.tags && post.tags.length ? `<p class="text-sm text-gray-400 mb-4">Tags: ${post.tags.join(", ")}</p>` : ""}
    <p class="text-sm text-gray-500 mb-4">Created on: ${new Date(post.created).toLocaleDateString()}</p>
    ${
      post.updated
        ? `<p class="text-sm text-gray-500 mb-4">Last updated: ${new Date(post.updated).toLocaleDateString()}</p>`
        : ""
    }
    <p class="text-sm text-gray-500 mb-4">Comments: ${post._count.comments}</p>
    <p class="text-sm text-gray-500">Reactions: ${post._count.reactions}</p>
  `;

  return postContainer;
}

/**
 * Fetches the post data based on the provided ID.
 *
 * @param {number|string} id - The ID of the post to fetch.
 * @returns {Promise<Object>} The post data.
 */

export async function fetchSinglePost(id) {
  try {
    console.log(`Fetching single post with ID: ${id}`);
    const postData = await readPost(id, { includeAuthor: true });

    if (postData && postData.data) {
      console.log("Post data fetched successfully.");
      return postData.data;
    } else {
      throw new Error("Post not found.");
    }
  } catch (error) {
    console.error("Error in fetchSinglePost:", error);
    throw error;
  }
}

/**
 * Displays a single post on the page.
 *
 * @param {number|string} postId - The ID of the post to display.
 */

export async function displaySinglePost(postId) {
  try {
    const post = await fetchSinglePost(postId);
    const postElement = createPostElement(post);
    const container = document.getElementById("post-container");
    if (container) {
      container.appendChild(postElement);
    } else {
      console.error("Post container element not found.");
    }
  } catch (error) {
    console.error("Error displaying single post:", error);
  }
}
