import { getPostIdFromURL, displaySinglePost } from "../../ui/post/post";

const postId = getPostIdFromURL();

if (postId) {
  displaySinglePost(postId);
} else {
  console.error("No post ID found in URL.");
}


