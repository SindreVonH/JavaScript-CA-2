import{a as r}from"./read-CEQGBBfd.js";import"./constants-C12GV1x6.js";function s(){const e=new URLSearchParams(window.location.search).get("id");return console.log(`Extracted postId: ${e}`),e}function c(t){const e=document.createElement("div");return e.classList.add("bg-gray-800","text-gray-100","p-6","rounded-lg","shadow-md","mb-6"),e.innerHTML=`
    <h2 class="text-2xl font-bold mb-4">${t.title}</h2>
    ${t.media?`<img src="${t.media.url}" alt="${t.media.alt}" class="w-full h-100 object-cover rounded-md mb-6"/>`:""}
    <p class="text-gray-300 mb-4">${t.body}</p>
    ${t.tags&&t.tags.length?`<p class="text-sm text-gray-400 mb-4">Tags: ${t.tags.join(", ")}</p>`:""}
    <p class="text-sm text-gray-500 mb-4">Created on: ${new Date(t.created).toLocaleDateString()}</p>
    ${t.updated?`<p class="text-sm text-gray-500 mb-4">Last updated: ${new Date(t.updated).toLocaleDateString()}</p>`:""}
    <p class="text-sm text-gray-500 mb-4">Comments: ${t._count.comments}</p>
    <p class="text-sm text-gray-500">Reactions: ${t._count.reactions}</p>
  `,e}async function l(t){try{console.log(`Fetching single post with ID: ${t}`);const e=await r(t,{includeAuthor:!0});if(e&&e.data)return console.log("Post data fetched successfully."),e.data;throw new Error("Post not found.")}catch(e){throw console.error("Error in fetchSinglePost:",e),e}}async function d(t){try{const e=await l(t),a=c(e),o=document.getElementById("post-container");o?o.appendChild(a):console.error("Post container element not found.")}catch(e){console.error("Error displaying single post:",e)}}const n=s();n?d(n):console.error("No post ID found in URL.");
