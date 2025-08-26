import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");

  // GET all notes
  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:7070/notes");
      if (!response.ok) throw new Error("Ошибка загрузки");
      const data = await response.json();
      setNotes(data);
    } catch (e) {
      console.error(e);
      alert("Ошибка при загрузке заметок");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // POST new note (без id)
  const addNote = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    try {
      await fetch("http://localhost:7070/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: input }),
      });
      setInput("");
      fetchNotes();
    } catch (e) {
      console.error(e);
      alert("Ошибка при добавлении заметки");
    }
  };

  // DELETE note by id
  const deleteNote = async (id) => {
    try {
      await fetch(`http://localhost:7070/notes/${id}`, { method: "DELETE" });
      fetchNotes();
    } catch (e) {
      console.error(e);
      alert("Ошибка при удалении заметки");
    }
  };

  return (
    <div className="app">
      <h1>Заметки</h1>

      {/* форма добавления */}
      <form onSubmit={addNote}>
        <input
          type="text"
          placeholder="Введите текст..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Добавить</button>
      </form>

      {/* общий Update button */}
      <button className="update" onClick={fetchNotes}>
        Обновить
      </button>

      {/* список заметок */}
      <div className="notes">
        {notes.map((note) => (
          <div key={note.id} className="note">
            <span>{note.content}</span>
            <button className="delete" onClick={() => deleteNote(note.id)}>Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
