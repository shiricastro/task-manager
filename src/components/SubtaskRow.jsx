import TextInput from "./TextInput";
import TaskCardActions from "./TaskCardActions";
import useSwipeActions from "../hooks/useSwipeActions";

const SubtaskRow = ({ sub, index, error, onToggle, onTitleChange, onDelete }) => {
  const { isSwiped, onTouchStart, onTouchMove, onTouchEnd } = useSwipeActions({ threshold: 50 });

  return (
    <div className="subTask-wrapper">
      <input
        name="completed"
        type="checkbox"
        className="main-checkbox"
        checked={!!sub.completed}
        onChange={(e) => onToggle(sub.id, e.target.checked)}
      />
      <div
        className="subtask-input-wrapper"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className={`subtask-input ${isSwiped ? "swiped" : ""}`}>
          <TextInput
            name={sub.id}
            label="Sub task"
            value={sub.title}
            onChange={(title) => onTitleChange("subTasks", title, index)}
            error={error}
          />
        </div>
        <TaskCardActions id={sub.id} edit={false} deleteTask={onDelete} />
      </div>
    </div>
  );
};

export default SubtaskRow;
