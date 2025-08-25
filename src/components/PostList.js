export default function PostList({ posts, onEdit, onDelete, onUpdate }) {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <p className="post-body">{post.content}</p>
          <div className="post-actions">
            <button
              onClick={() => onUpdate(post.id)}
              className="btn btn-success"
            >
              🔄 Update
            </button>
            <button
              onClick={() => onEdit(post)}
              className="btn btn-warning"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(post.id)}
              className="btn btn-danger"
            >
              ✕ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
