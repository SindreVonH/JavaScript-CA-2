export function headers() {
  const headerObj = new Headers();
  const apiKey = localStorage.getItem("apiKey");
  if (apiKey) {
    headerObj.append("X-Noroff-API-Key", apiKey);
  } else {
    console.warn("API_KEY is not defined. X-Noroff-API-Key header will not be set.");
  }

  return headerObj;
}
