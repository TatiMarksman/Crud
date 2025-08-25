const API_URL = "http://localhost:7070/notes";

export async function fetchPosts() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createPost(post) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: 0,
      content: post.content
    }),
  });
  return res.json();
}

export async function updatePost(id, post) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
      content: post.content
    }),
  });
  return res.json();
}

export async function deletePost(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
