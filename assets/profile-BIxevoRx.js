import{a as m}from"./authGuard-CREZr_1S.js";import{b as g}from"./read-CEQGBBfd.js";import{a as p,c as f}from"./constants-C12GV1x6.js";import{n as b}from"./edit-CP-wQ_qn.js";import{o as y}from"./logout-D9a-RxZ7.js";async function h(t){t.preventDefault(),t.stopPropagation();const e=t.target,o=e.getAttribute("data-post-id");if(!o){console.error("Post ID not found.");return}if(!confirm("Are you sure you want to delete this post?"))return;const c=localStorage.getItem("apiKey")||p,n=localStorage.getItem("accessToken");if(!n){alert("You are not authenticated. Please log in.");return}const l=`${f}/${o}`;try{const a=await fetch(l,{method:"DELETE",headers:{"X-Noroff-API-Key":c,Authorization:`Bearer ${n}`,"Content-Type":"application/json"}});if(!a.ok){const u=await a.json();throw new Error(u.message||"Failed to delete the post.")}alert("Post deleted successfully.");const s=e.closest(".post-card");s&&s.remove()}catch(a){console.error("Error deleting post:",a),alert(`Failed to delete post: ${a.message}`)}}function E(t){const e=document.createElement("div");e.classList.add("bg-gray-800","text-gray-100","p-6","rounded-lg","shadow-md","hover:shadow-lg","transition","duration-300"),e.innerHTML=`
    <h2 class="text-xl font-bold mb-2">${t.title}</h2>
    ${t.media?`<img src="${t.media.url}" alt="${t.media.alt}" class="w-full h-80 object-cover rounded-md mb-4"/>`:""}
    <p class="text-gray-300 mb-4">${t.body}</p>
    ${t.tags&&t.tags.length?`<p class="text-sm text-gray-400 mb-2">Tags: ${t.tags.join(", ")}</p>`:""}
    <p class="text-sm text-gray-500 mb-4">Created on: ${new Date(t.created).toLocaleDateString()}</p>
    <div class="button-group flex space-x-4">
      <button class="edit-button bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300" data-post-id="${t.id}">Edit</button>
      <button class="delete-button bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300" data-post-id="${t.id}">Delete</button>
    </div>
  `;const o=e.querySelector(".delete-button");o&&o.addEventListener("click",h);const r=e.querySelector(".edit-button");return r&&r.addEventListener("click",()=>b(t.id)),e}function P(t){const e=document.getElementById("posts-container");if(!e){console.error("Posts container not found.");return}e.innerHTML="",t.forEach(o=>{const r=E(o);e.appendChild(r)})}function i(t){const e=document.getElementById("posts-container");e&&(e.innerHTML=`<p class="text-red-500">${t}</p>`)}async function $(){try{const t=JSON.parse(localStorage.getItem("user"));if(!t||!t.name)throw new Error("User not found in localStorage.");const e=t.name,o=await g(e,12,1);o&&o.data?P(o.data):i("No posts available.")}catch(t){i(`Failed to load posts: ${t.message}`)}}$();m();const d=document.getElementById("logout-button");d&&d.addEventListener("click",y);