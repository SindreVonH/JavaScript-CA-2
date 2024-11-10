import{a as r}from"./authGuard-CREZr_1S.js";import{o as d}from"./logout-D9a-RxZ7.js";import{r as i}from"./read-CEQGBBfd.js";import"./constants-C12GV1x6.js";function c(t){const e=document.createElement("div");e.classList.add("bg-gray-800","text-gray-100","p-6","rounded-lg","shadow-lg","hover:shadow-xl","transition","duration-300");const o=document.createElement("a");return o.href=`/post/?id=${t.id}`,o.classList.add("post-link","block","space-y-4"),o.innerHTML=`
    <h2 class="text-xl font-bold">${t.title}</h2>
    ${t.media?`<img src="${t.media.url}" alt="${t.media.alt}" class="w-full h-80 object-cover rounded-md"/>`:""}
    <p class="text-gray-300">${t.body}</p>
    ${t.tags&&t.tags.length?`<p class="text-sm text-gray-400">Tags: ${t.tags.join(", ")}</p>`:""}
    <p class="text-sm text-gray-500">Created on: ${new Date(t.created).toLocaleDateString()}</p>
  `,e.appendChild(o),e}function l(t){const e=document.getElementById("posts-container");if(!e){console.error("Posts container not found.");return}e.innerHTML="",t.forEach(o=>{const s=c(o);e.appendChild(s)})}function a(t){const e=document.getElementById("posts-container");e&&(e.innerHTML=`<p class="text-red-500">${t}</p>`)}async function m(){try{const t=await i(12,1);t&&t.data?l(t.data):a("No posts available.")}catch(t){a(`Failed to load posts: ${t.message}`)}}m();r();const n=document.getElementById("logout-button");n&&n.addEventListener("click",d);
