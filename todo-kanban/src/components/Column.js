import Task from "./Task";

function Column({ title, tasks, onMove, onDelete, onEdit }) {
  // Define o status baseado no título da coluna
  const status =
    title === "A Fazer"
      ? "todo"
      : title === "Em Progresso"
      ? "inProgress"
      : "done";

  return (
    <div className="column">
      <h2>{title}</h2>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onMove={onMove}
          onDelete={onDelete}
          onEdit={onEdit}
          status={status} // Passa o status para cada tarefa
        />
      ))}
    </div>
  );
}

export default Column;