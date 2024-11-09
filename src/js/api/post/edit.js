import { API_SOCIAL_POSTS, API_KEY } from '../constants.js';

/**
 * Fetch a post by its ID.
 * @param {number|string} postId - The ID of the post to fetch.
 * @returns {Promise<Object>} - The fetched post data.
 */

export async function getPostById(postId) {
  const accessToken = localStorage.getItem("accessToken"); 

  const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': API_KEY, 
      'Authorization': `Bearer ${accessToken}`, 
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch post data');
  }

  const data = await response.json();
  return data.data; 
}

/**
 * Update a post by its ID.
 * @param {number|string} postId - The ID of the post to update.
 * @param {Object} postData - The updated post data.
 * @returns {Promise<Object>} - The updated post data from the API.
 */

export async function updatePost(postId, postData) {
  const accessToken = localStorage.getItem("accessToken"); 

  const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': API_KEY, 
      'Authorization': `Bearer ${accessToken}`, 
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update post');
  }

  const data = await response.json();
  return data;
}
