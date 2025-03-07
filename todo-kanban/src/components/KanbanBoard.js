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

  const [editingTask, setEditingTask] = useState(null);

  // Estado para armazenar o texto de busca
  const [searchText, setSearchText] = useState("");

  // Função para filtrar as tarefas com base no título
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // Função para abrir o modal para edição de uma tarefa
  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Função para adicionar uma nova tarefa
  const addTask = () => {
    if (!newTask.title.trim()) return;
    const newTaskObj = { id: Date.now(), ...newTask };
    setTasks([...tasks, newTaskObj]);
    setNewTask({ title: "", description: "", status: "todo", priority: "medium" });
    setIsModalOpen(false);
  };

  // Função para atualizar uma tarefa existente
  const updateTask = () => {
    if (!editingTask.title.trim()) return;
    setTasks(tasks.map((t) => (t.id === editingTask.id ? editingTask : t)));
    setEditingTask(null);
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
    setIsModalOpen(false); // Fecha o modal após excluir a tarefa
  };

  return (
    <div className="kanban-board">
      <div className="sisters" >

      </div>
      {/* Campo de busca */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="Buscar por título"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
            {/* Botão para abrir o modal */}
            <button className="nova-at" onClick={() => { setEditingTask(null); setIsModalOpen(true); }} style={{
            backgroundColor: "#2C2C2C",
            border: "none",
            borderRadius: "3px",
            color: "#fff",
            width: "10%",
            height: "40px",
          }}>Nova Atividade</button>

      {/* Modal para criar/editar tarefa */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingTask ? "Editar Tarefa" : "Nova Tarefa"}</h2>
            <input
              type="text"
              placeholder="Título"
              value={editingTask ? editingTask.title : newTask.title}
              onChange={(e) =>
                editingTask
                  ? setEditingTask({ ...editingTask, title: e.target.value })
                  : setNewTask({ ...newTask, title: e.target.value })
              }
            />
            <textarea
              placeholder="Descrição"
              value={editingTask ? editingTask.description : newTask.description}
              onChange={(e) =>
                editingTask
                  ? setEditingTask({ ...editingTask, description: e.target.value })
                  : setNewTask({ ...newTask, description: e.target.value })
              }
            />
            <select
              value={editingTask ? editingTask.status : newTask.status}
              onChange={(e) =>
                editingTask
                  ? setEditingTask({ ...editingTask, status: e.target.value })
                  : setNewTask({ ...newTask, status: e.target.value })
              }
            >
              <option value="todo">A Fazer</option>
              <option value="inProgress">Em Progresso</option>
              <option value="done">Concluído</option>
            </select>
            <div className="modal-buttons">
              <button onClick={editingTask ? updateTask : addTask}>
                {editingTask ? "Atualizar" : "Adicionar"}
              </button>
              {editingTask && (
                <button
                  onClick={() => deleteTask(editingTask.id)}
                  style={{ backgroundColor: "#f44336", color: "white" }}
                >
                  Excluir
                </button>
              )}
              <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Colunas do Kanban */}
      <div className="colunas">
        <Column
          title="A Fazer"
          tasks={filteredTasks.filter((task) => task.status === "todo")}
          onMove={moveTask}
          onDelete={deleteTask}
          onEdit={openEditModal}
        />
        <Column
          title="Em Progresso"
          tasks={filteredTasks.filter((task) => task.status === "inProgress")}
          onMove={moveTask}
          onDelete={deleteTask}
          onEdit={openEditModal}
        />
        <Column
          title="Concluído"
          tasks={filteredTasks.filter((task) => task.status === "done")}
          onMove={moveTask}
          onDelete={deleteTask}
          onEdit={openEditModal}
        />
      </div>
    </div>
  );
}

export default KanbanBoard;