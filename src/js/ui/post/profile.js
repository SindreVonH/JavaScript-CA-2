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
  card.classList.add(
    "bg-gray-800",
    "text-gray-100",
    "p-6",
    "rounded-lg",
    "shadow-md",
    "hover:shadow-lg",
    "transition",
    "duration-300"
  );

  card.innerHTML = `
    <h2 class="text-xl font-bold mb-2">${post.title}</h2>
    ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}" class="w-full h-80 object-cover rounded-md mb-4"/>` : ""}
    <p class="text-gray-300 mb-4">${post.body}</p>
    ${post.tags && post.tags.length ? `<p class="text-sm text-gray-400 mb-2">Tags: ${post.tags.join(", ")}</p>` : ""}
    <p class="text-sm text-gray-500 mb-4">Created on: ${new Date(post.created).toLocaleDateString()}</p>
    <div class="button-group flex space-x-4">
      <button class="edit-button bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300" data-post-id="${post.id}">Edit</button>
      <button class="delete-button bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300" data-post-id="${post.id}">Delete</button>
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
    postsContainer.innerHTML = `<p class="text-red-500">${message}</p>`;
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
