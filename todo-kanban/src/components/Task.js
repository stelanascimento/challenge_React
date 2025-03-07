function Task({ task, onMove, onDelete, onEdit, status }) {
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
      onClick={() => onEdit(task)}
    >
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <span
          className="priority-badge"
          style={{
            backgroundColor:
              task.priority === "high"
                ? "none"
                : task.priority === "medium"
                ? "none"
                : "none",
            border: "1px solid",
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

      {/* <div>
        <button onClick={(e) => { e.stopPropagation(); onMove(task, "prev"); }}>←</button>
        <button onClick={(e) => { e.stopPropagation(); onMove(task, "next"); }}>→</button>
      </div> */}
    </div>
  );
}

export default Task;