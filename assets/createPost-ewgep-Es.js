import{c as m}from"./constants-C12GV1x6.js";import{a as u}from"./authGuard-CREZr_1S.js";async function p(a){try{const t=localStorage.getItem("apiKey"),e=localStorage.getItem("accessToken"),i=JSON.parse(localStorage.getItem("user")),r=await fetch(m,{method:"POST",headers:{"X-Noroff-API-Key":t,Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify(a)});if(!r.ok){const o=await r.json();throw console.error("Create post failed:",o),new Error(o.message||"Create post failed")}return await r.json()}catch(t){throw console.error("Error during creating post:",t),t}}async function f(a){a.preventDefault();const t=a.target,e=t.querySelector("button[type='submit']");e.disabled=!0,e.textContent="Creating...";const i=t.title.value.trim(),r=t.body.value.trim(),c=t.tags.value.trim(),o=t.mediaUrl.value.trim(),l=t.mediaAlt.value.trim(),d={title:i,body:r,tags:c?c.split(",").map(s=>s.trim()):[],media:o?{url:o,alt:l||""}:void 0};try{const s=await p(d);alert("Post created successfully!"),t.reset()}catch(s){const n=document.createElement("div");n.style.color="red",n.textContent=`Create post failed: ${s.message}`,n.classList.add("error-message"),t.prepend(n)}finally{e.disabled=!1,e.textContent="Create Post"}}u();const g=document.forms.createPost;g.addEventListener("submit",f);
