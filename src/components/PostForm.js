import { useState, useEffect } from "react";

export default function PostForm({ onSubmit, postToEdit, onCancel }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (postToEdit) {
      setContent(postToEdit.content);
    }
  }, [postToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ content, id: postToEdit?.id });
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <textarea
        placeholder="Enter your note content..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="textarea"
        required
      />
      <div className="button-group">
        <button type="submit" className="btn btn-primary">
          {postToEdit ? "Update" : "Add"}
        </button>
        {postToEdit && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
