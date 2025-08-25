import { useState, useEffect } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import { fetchPosts, createPost, updatePost, deletePost } from "./api";

function App() {
  const [posts, setPosts] = useState([]);
  const [postToEdit, setPostToEdit] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      const data = await fetchPosts();
      setPosts(data);
    }
    loadPosts();
  }, []);

  const handleSubmit = async (post) => {
    if (post.id) {
      const updated = await updatePost(post.id, post);
      setPosts(posts.map((p) => (p.id === post.id ? updated : p)));
      setPostToEdit(null);
    } else {
      const created = await createPost(post);
      setPosts([...posts, created]);
    }
  };

  const handleDelete = async (id) => {
    await deletePost(id);
    setPosts(posts.filter((p) => p.id !== id));
  };

  const handleEdit = (post) => setPostToEdit(post);
  const handleCancel = () => setPostToEdit(null);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">CRUD Posts</h1>
      <PostForm onSubmit={handleSubmit} postToEdit={postToEdit} onCancel={handleCancel} />
      <PostList posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;
