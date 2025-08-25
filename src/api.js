const API_URL = "http://localhost:3001/posts";

export async function fetchPosts() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createPost(post) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return res.json();
}

export async function updatePost(id, post) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return res.json();
}

export async function deletePost(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
