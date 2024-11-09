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
  postContainer.classList.add("single-post");

  postContainer.innerHTML = `
    <h2>${post.title}</h2>
    ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}" class="post-media"/>` : ""}
    <p>${post.body}</p>
    ${post.tags && post.tags.length ? `<p class="tags">Tags: ${post.tags.join(", ")}</p>` : ""}
    <p class="created-date">Created on: ${new Date(post.created).toLocaleDateString()}</p>
    <p class="updated-date">Last updated: ${new Date(post.updated).toLocaleDateString()}</p>
    <p class="comments-count">Comments: ${post._count.comments}</p>
    <p class="reactions-count">Reactions: ${post._count.reactions}</p>
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
