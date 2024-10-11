import { readPostsByUser } from "../../api/post/read.js";
import { onDeletePost } from "./delete.js";
import { navigateToEditPage } from './edit.js';

/**
 * Creates a card element for a single post.
 *
 * @param {Object} post - The post data.
 * @returns {HTMLElement} The card element.
 */

function createPostCard(post) {
  const card = document.createElement("div");
  card.classList.add("post-card");

  card.innerHTML = `
    <h2>${post.title}</h2>
    ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}" class="post-media"/>` : ""}
    <p>${post.body}</p>
    ${post.tags && post.tags.length ? `<p class="tags">Tags: ${post.tags.join(", ")}</p>` : ""}
    <p class="created-date">Created on: ${new Date(post.created).toLocaleDateString()}</p>
    <div class="button-group">
      <button class="edit-button" data-post-id="${post.id}">Edit</button>
      <button class="delete-button" data-post-id="${post.id}">Delete</button>
    </div>
  `;

  const deleteButton = card.querySelector(".delete-button");
  if (deleteButton) {
    deleteButton.addEventListener("click", onDeletePost);
  }

  const editButton = card.querySelector(".edit-button");
  if (editButton) {
    editButton.addEventListener("click", () => navigateToEditPage(post.id));
  }

  return card;
}

/**
 * Renders all posts on the profile page as cards.
 *
 * @param {Array<Object>} posts - Array of post objects.
 */

export function renderProfilePosts(posts) {
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
 * Displays an error message on the profile page.
 *
 * @param {string} message - The error message to display.
 */

export function displayProfileError(message) {
  const postsContainer = document.getElementById("posts-container");
  if (postsContainer) {
    postsContainer.innerHTML = `<p class="error-message">${message}</p>`;
  }
}

/**
 * Fetches and displays posts on the profile page.
 */

export async function displayProfilePosts() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.name) {
      throw new Error("User not found in localStorage.");
    }

    const name = user.name;
    const postsData = await readPostsByUser(name, 12, 1);

    if (postsData && postsData.data) {
      renderProfilePosts(postsData.data);
    } else {
      displayProfileError("No posts available.");
    }
  } catch (error) {
    displayProfileError(`Failed to load posts: ${error.message}`);
  }
}