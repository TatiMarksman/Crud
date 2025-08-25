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
    // Reload all posts after operation
    const data = await fetchPosts();
    setPosts(data);
  };

  const handleDelete = async (id) => {
    await deletePost(id);
    // Reload all posts after deletion
    const data = await fetchPosts();
    setPosts(data);
  };

  const handleEdit = (post) => setPostToEdit(post);
  
  const handleCancel = () => setPostToEdit(null);

  const handleUpdate = async (id) => {
    // Reload all posts after update
    const data = await fetchPosts();
    setPosts(data);
  };

  return (
    <div className="container">
      <h1 className="title">Notes CRUD</h1>
      <PostForm onSubmit={handleSubmit} postToEdit={postToEdit} onCancel={handleCancel} />
      <PostList posts={posts} onEdit={handleEdit} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
}

export default App;
