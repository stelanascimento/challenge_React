import { useState } from "react";
import Column from "./Column";

function KanbanBoard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Tarefa 1", status: "todo" },
    { id: 2, title: "Tarefa 2", status: "inProgress" },
    { id: 3, title: "Tarefa 3", status: "done" },
  ]);

  const moveTask = (task, direction) => {
    const statusOrder = ["todo", "inProgress", "done"];
    const currentIndex = statusOrder.indexOf(task.status);
    let newIndex =
      direction === "next"
        ? Math.min(currentIndex + 1, statusOrder.length - 1)
        : Math.max(currentIndex - 1, 0);

    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, status: statusOrder[newIndex] } : t
    );

    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="kanban-board">
      <Column
        title="Pendente"
        tasks={tasks.filter((task) => task.status === "todo")}
        onMove={moveTask}
        onDelete={deleteTask}
      />
      <Column
        title="Realizando"
        tasks={tasks.filter((task) => task.status === "inProgress")}
        onMove={moveTask}
        onDelete={deleteTask}
      />
      <Column
        title="Concluída"
        tasks={tasks.filter((task) => task.status === "done")}
        onMove={moveTask}
        onDelete={deleteTask}
      />
    </div>
  );
}

export default KanbanBoard;
