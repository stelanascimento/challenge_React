function Task({ task, onMove, onDelete }) {
  return (
    <div className="task">
      <p>{task.title}</p>
      <button onClick={() => onMove(task, 'prev')}>⬅️</button>
      <button onClick={() => onMove(task, 'next')}>➡️</button>
      <button onClick={() => onDelete(task.id)}>🗑️</button>
    </div>
  );
}

export default Task;
