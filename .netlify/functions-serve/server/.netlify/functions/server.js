var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// .netlify/functions/server.cjs
var server_exports = {};
__export(server_exports, {
  fetchPosts: () => fetchPosts
});
module.exports = __toCommonJS(server_exports);
var API_URL = process.env.NODE_ENV === "development" ? "http://localhost:8888/.netlify/functions" : "/.netlify/functions";
var fetchPosts = async () => {
  try {
    console.log("Fetching posts from:", `${API_URL}/posts`);
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || "Failed to fetch posts";
      } catch {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
    const data = await response.json();
    console.log(`Successfully fetched ${data.length} posts`);
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fetchPosts
});
//# sourceMappingURL=server.js.map
