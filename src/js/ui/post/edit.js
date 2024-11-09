import { getPostById, updatePost } from '../../api/post/edit.js';

/**
 * Navigate to the edit page with the specified post ID.
 * @param {number|string} postId - The ID of the post to edit.
 */

export function navigateToEditPage(postId) {
  window.location.href = `/post/edit/?id=${postId}`;
}

/**
 * Initialize the Edit Post Page
 */

document.addEventListener("DOMContentLoaded", initializeEditPage);

async function initializeEditPage() {
  const postId = getPostIdFromURL();

  if (!postId) {
    alert("No post ID provided.");
    redirectToProfilePage();
    return;
  }

  try {
    const post = await getPostById(postId);
    populateEditForm(post);
  } catch (error) {
    console.error("Error fetching post data:", error);
    alert("Failed to load post data.");
    redirectToProfilePage();
  }

  const form = document.getElementById('edit-post-form');
  form.addEventListener("submit", handleFormSubmit);
}

/**
 * Retrieve the post ID from the URL query parameters.
 * @returns {string|null} - The post ID or null if not found.
 */

function getPostIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

/**
 * Populate the edit form with the existing post data.
 * @param {Object} post - The post data.
 */

function populateEditForm(post) {
  document.getElementById('title').value = post.title || '';
  document.getElementById('body').value = post.body || '';
  document.getElementById('tags').value = (post.tags && post.tags.join(', ')) || '';
  document.getElementById('media-url').value = (post.media && post.media.url) || '';
  document.getElementById('media-alt').value = (post.media && post.media.alt) || '';
}

/**
 * Handle the form submission to update the post.
 * @param {Event} event - The form submission event.
 */

async function handleFormSubmit(event) {
  event.preventDefault();

  const postId = getPostIdFromURL();
  if (!postId) {
    alert("No post ID provided.");
    return;
  }

  const updatedPost = {
    title: document.getElementById('title').value.trim(),
    body: document.getElementById('body').value.trim(),
    tags: document.getElementById('tags').value.split(',').map(tag => tag.trim()).filter(tag => tag),
    media: {
      url: document.getElementById('media-url').value.trim(),
      alt: document.getElementById('media-alt').value.trim()
    }
  };

  try {
    const response = await updatePost(postId, updatedPost);
    alert("Post updated successfully!");
    window.location.href = `/profile/`; 
  } catch (error) {
    console.error("Error updating post:", error);
    alert(`Failed to update post: ${error.message}`);
  }
}

