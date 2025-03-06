import Task from "./Task";

function Column({ title, tasks, onMove, onDelete }) {
  return (
    <div className="column">
      <h2>{title}</h2>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onMove={onMove} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default Column;
