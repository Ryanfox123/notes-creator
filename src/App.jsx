import { useState, useEffect } from "react";
import Note from "./components/Note";

const emptyNote = {
  title: "",
  description: "",
  author: "",
};

function App() {
  const [note, setNote] = useState(emptyNote);
  const [notes, setNotes] = useState([]);

  function handle(key, value) {
    setNote((prev) => {
      return { ...prev, [key]: value };
    });
  }

  async function getNotes() {
    const response = await fetch("http://localhost:3000/notes");

    const data = await response.json();

    setNotes(data);
  }

  // On the first render getNotes
  // So that we have the list of notes already
  useEffect(() => {
    getNotes();
  }, []);

  async function remove(id) {
    // Delete note
    await fetch(`http://localhost:3000/notes/${id}`, {
      method: "DELETE",
    });

    getNotes();
  }

  async function submit() {
    // Make a POST request to /notes
    // Body is note
    await fetch("http://localhost:3000/notes", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Get them again
    getNotes();
  }

  return (
    <div className="w-96 mx-auto">
      <h1 className="block font-medium leading-6 text-gray-900 text-center text-xl">
        Notes Creator
      </h1>
      <div className="flex flex-col gap-y-3">
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            onChange={(e) => handle("title", e.target.value)}
            value={note.title}
            className="
          block
          w-full
          rounded-md
          border-0
          py-1
          text-gray-900
          shadow-sm
          ring-1
          ring-inset
          ring-gray-300
          placeholder:text-gray-400
          focus:ring-2
          focus:ring-inset
          focus:ring-indigo-600
          sm:text-sm
          sm:leading-6
          px-2"
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            onChange={(e) => handle("description", e.target.value)}
            value={note.description}
            className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></textarea>
        </div>
        <div>
          <label>Author</label>
          <input
            type="text"
            name="author"
            onChange={(e) => handle("author", e.target.value)}
            value={note.author}
            className="block
          w-full
          rounded-md
          border-0
          py-1
          text-gray-900
          shadow-sm
          ring-1
          ring-inset
          ring-gray-300
          placeholder:text-gray-400
          focus:ring-2
          focus:ring-inset
          focus:ring-indigo-600
          sm:text-sm
          sm:leading-6
          px-2"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
            onClick={submit}
          >
            Add Note
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-y-10 my-10 rounded-lg border-gray-500 ">
        {/* <Note />
        <Note /> */}
        {notes.map((n) => (
          <Note
            title={n.title}
            description={n.description}
            author={n.author}
            date={n.date}
            onDelete={() => remove(n.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
