import { useState } from "react";
import Column from "./Column";


function KanbanBoard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Tarefa 1", description: "Detalhes da tarefa 1", status: "todo", priority: "medium" },
    { id: 2, title: "Tarefa 2", description: "Detalhes da tarefa 2", status: "inProgress", priority: "low" },
    { id: 3, title: "Tarefa 3", description: "Detalhes da tarefa 3", status: "done", priority: "high" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
  });

  // Função para adicionar uma nova tarefa
  const addTask = () => {
    if (!newTask.title.trim()) return;
    const newTaskObj = { id: Date.now(), ...newTask };
    setTasks([...tasks, newTaskObj]);
    setNewTask({ title: "", description: "", status: "todo", priority: "medium" });
    setIsModalOpen(false);
  };

  // Função para mover uma tarefa entre colunas
  const moveTask = (task, direction) => {
    const statusOrder = ["todo", "inProgress", "done"];
    const currentIndex = statusOrder.indexOf(task.status);
    const newIndex =
      direction === "next"
        ? Math.min(currentIndex + 1, statusOrder.length - 1)
        : Math.max(currentIndex - 1, 0);

    setTasks(
      tasks.map((t) =>
        t.id === task.id ? { ...t, status: statusOrder[newIndex] } : t
      )
    );
  };

  // Função para excluir uma tarefa
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="kanban-board">
      {/* Botão para abrir o modal */}
      <button className="nova-at" onClick={() => setIsModalOpen(true)}>Nova Atividade</button>

      {/* Modal para criar nova tarefa */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Nova Tarefa</h2>
            <input
              type="text"
              placeholder="Título"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <textarea
              placeholder="Descrição"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
            <select
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            >
              <option value="todo">A Fazer</option>
              <option value="inProgress">Em Progresso</option>
              <option value="done">Concluído</option>
            </select>
            <button onClick={addTask}>Adicionar</button>
            <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Colunas do Kanban */}
      <div className="colunas">
        <Column
          title="A Fazer"
          tasks={tasks.filter((task) => task.status === "todo")}
          onMove={moveTask}
          onDelete={deleteTask}
        />
        <Column
          title="Em Progresso"
          tasks={tasks.filter((task) => task.status === "inProgress")}
          onMove={moveTask}
          onDelete={deleteTask}
        />
        <Column
          title="Concluído"
          tasks={tasks.filter((task) => task.status === "done")}
          onMove={moveTask}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}

export default KanbanBoard;