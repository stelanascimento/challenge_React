// src/components/Task.js
function Task({ task, onMove, onDelete, status }) {
  // Define a cor do background com base na coluna (status)
  const getBackgroundColor = () => {
    switch (status) {
      case "todo":
        return "#EC221F"; // Rosa para "A Fazer"
      case "inProgress":
        return "#7678D1"; // Roxo para "Em Progresso"
      case "done":
        return "#00A88B"; // Verde para "Concluído"
      default:
        return "#fff";
    }
  };

  return (
    <div
      className="task"
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <div>
        <h3>{task.title}</h3>
        <span
          className="priority-badge"
          style={{
            backgroundColor:
              task.priority === "high"
                ? "#ff4d4d"
                : task.priority === "medium"
                ? "#ffd700"
                : "#32cd32",
            color: "#fff",
            padding: "4px 8px",
            borderRadius: "1px",
            fontSize: "0.9rem",
            
          }}
        >
          {task.priority === "high"
            ? "Alta"
            : task.priority === "medium"
            ? "Média"
            : "Baixa"}
        </span>
      </div>

      <div>
        <button onClick={() => onDelete(task.id)}>Excluir</button>
        <button onClick={() => onMove(task, "prev")}>←</button>
        <button onClick={() => onMove(task, "next")}>→</button>
      </div>
    </div>
  );
}

export default Task;
