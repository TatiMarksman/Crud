export default function PostList({ posts, onEdit, onDelete }) {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="border p-4 mb-2 rounded shadow">
          <h2 className="font-bold">{post.title}</h2>
          <p className="text-gray-700 mb-2">{post.body}</p>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(post)}
              className="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(post.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
