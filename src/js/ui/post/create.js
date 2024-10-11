import { createPost } from "../../api/post/create.js";

/**
 * Handles the create post form submission.
 *
 * @param {Event} event - The form submission event.
 */

export async function onCreatePost(event) {
  event.preventDefault(); 

  const form = event.target;
  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.textContent = "Creating...";
  const title = form.title.value.trim();
  const body = form.body.value.trim();
  const tagsInput = form.tags.value.trim();
  const mediaUrl = form.mediaUrl.value.trim();
  const mediaAlt = form.mediaAlt.value.trim();

  const postData = {
    title,
    body,
    tags: tagsInput ? tagsInput.split(",").map(tag => tag.trim()) : [],
    media: mediaUrl ? { url: mediaUrl, alt: mediaAlt || "" } : undefined,
  };

  try {
    const response = await createPost(postData);
    alert("Post created successfully!");
    form.reset();
  } catch (error) {
   
    const errorContainer = document.createElement("div");
    errorContainer.style.color = "red";
    errorContainer.textContent = `Create post failed: ${error.message}`;
    errorContainer.classList.add("error-message");
    form.prepend(errorContainer);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Create Post";
  }
}




