export default function Note(props) {
  return (
    <div className="flex flex-col gap-y-4 text-gray-900 border-b-4  border-indigo-600">
      <div className="flex gap-x-4 items-center">
        <button
          onClick={props.onDelete}
          className="rounded-md px-2 py-1 bg-red-800 text-white"
        >
          X
        </button>
        <h1 className="text-xl font-semibold text-indigo-600">{props.title}</h1>
      </div>
      <p>{props.description}</p>
      <div className="flex justify-between">
        <p className="italic">{props.author}</p>
        <p className="text-gray-700">{props.date}</p>
      </div>
    </div>
  );
}

/**
 * DELETE /notes/:id
 */
