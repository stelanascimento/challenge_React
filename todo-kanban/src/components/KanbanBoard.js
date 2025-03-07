import { useState } from "react";
import Column from "./Column";

function KanbanBoard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Tarefa 1", status: "todo", priority: "medium" },
    { id: 2, title: "Tarefa 2", status: "inProgress", priority: "low" },
    { id: 3, title: "Tarefa 3", status: "done", priority: "high" },
  ]);

  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState("medium");

  // 🟢 Função para adicionar uma nova tarefa
  const addTask = () => {
    if (!newTask.trim()) return;
    const newTaskObj = {
      id: Date.now(),
      title: newTask,
      status: "todo",
      priority: newPriority,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
    setNewPriority("medium");
  };

  // 🔵 Função para mover uma tarefa entre colunas
  const moveTask = (task, direction) => {
    const statusOrder = ["todo", "inProgress", "done"];
    const currentIndex = statusOrder.indexOf(task.status);
    const newIndex =
      direction === "next"
        ? Math.min(currentIndex + 1, statusOrder.length - 1)
        : Math.max(currentIndex - 1, 0);

    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, status: statusOrder[newIndex] } : t
    );

    setTasks(updatedTasks);
  };

  // 🔴 Função para excluir uma tarefa
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // 🟡 Atualizar a prioridade de uma tarefa
  const updatePriority = (id, priority) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, priority: priority } : task
      )
    );
  };

  return (
    <div className="kanban-board">
      {/* Formulário para adicionar nova tarefa */}
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nova tarefa..."
        />
        <select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
        >
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
        </select>
        <button onClick={addTask}>Adicionar</button>
      </div>

      {/* Colunas do Kanban */}
      <div className="colunas">
      <Column
        title="A Fazer"
        tasks={tasks.filter((task) => task.status === "todo")}
        onMove={moveTask}
        onDelete={deleteTask}
        onUpdatePriority={updatePriority}
      />
      <Column
        title="Em Progresso"
        tasks={tasks.filter((task) => task.status === "inProgress")}
        onMove={moveTask}
        onDelete={deleteTask}
        onUpdatePriority={updatePriority}
      />
      <Column
        title="Concluído"
        tasks={tasks.filter((task) => task.status === "done")}
        onMove={moveTask}
        onDelete={deleteTask}
        onUpdatePriority={updatePriority}
      />
      </div>
      
    </div>
  );
}

export default KanbanBoard;
