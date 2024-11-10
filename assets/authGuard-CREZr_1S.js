function n(){localStorage.getItem("accessToken")||(console.warn("No JWT token found. Redirecting to login."),window.location.href="/auth/login/index.html")}export{n as a};
