import { readPosts } from "../../api/post/read.js";

/**
 * Creates a card element for a single post with a clickable link.
 *
 * @param {Object} post - The post data.
 * @returns {HTMLElement} The card element.
 */

function createPostCard(post) {
  const card = document.createElement("div");
  card.classList.add("post-card");
  const postLink = document.createElement("a");
  postLink.href = `/post/?id=${post.id}`;
  postLink.classList.add("post-link"); 
  postLink.innerHTML = `
    <h2>${post.title}</h2>
    ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}" class="post-media"/>` : ""}
    <p>${post.body}</p>
    ${post.tags && post.tags.length ? `<p class="tags">Tags: ${post.tags.join(", ")}</p>` : ""}
    <p class="created-date">Created on: ${new Date(post.created).toLocaleDateString()}</p>
  `;

  card.appendChild(postLink);
  return card;
}

/**
 * Renders all posts on the homepage as cards.
 *
 * @param {Array<Object>} posts - Array of post objects.
 */

export function renderHomePosts(posts) {
  const postsContainer = document.getElementById("posts-container");
  if (!postsContainer) {
    console.error("Posts container not found.");
    return;
  }
  postsContainer.innerHTML = ""; 

  posts.forEach(post => {
    const postCard = createPostCard(post);
    postsContainer.appendChild(postCard);
  });
}

/**
 * Displays an error message on the homepage.
 *
 * @param {string} message - The error message to display.
 */

export function displayHomeError(message) {
  const postsContainer = document.getElementById("posts-container");
  if (postsContainer) {
    postsContainer.innerHTML = `<p class="error-message">${message}</p>`;
  } 
}

/**
 * Fetches and displays posts on the homepage.
 */

export async function displayHomePosts() {
  try {
    const postsData = await readPosts(12, 1); 

    if (postsData && postsData.data) {
      renderHomePosts(postsData.data);
    } else {
      displayHomeError("No posts available.");
    }
  } catch (error) {
    displayHomeError(`Failed to load posts: ${error.message}`);
  }
}
