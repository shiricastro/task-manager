import { useNavigate } from "react-router-dom";
import EditIcon from "./icons/EditIcon";
import BinIcon from "./icons/BinIcon";

const TaskCardActions = ({ id, deleteTask, edit = true }) => {
  const navigate = useNavigate();

  return (
    <div className={`task-card-buttons ${!edit ? "justify-center" : ""}`}>
      {edit && (
        <button
          type="button"
          aria-label="Edit"
          onClick={() => navigate(`/task/${id}`)}
          className="task-card-edit-button"
          title="Edit task"
        >
          <EditIcon className="text-primary" />
        </button>
      )}

      <button
        type="button"
        aria-label="Delete"
        onClick={() => deleteTask(id)}
        className="task-card-delete-button"
        title="Delete task"
      >
        <BinIcon className="text-primary" />
      </button>
    </div>
  );
};

export default TaskCardActions;
