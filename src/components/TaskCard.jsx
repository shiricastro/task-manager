import { useMemo, memo } from "react";
import { useTasksDispatch } from "../context/TaskContext";
import { CATEGORIES_BY_ID } from "../constants/categories";
import CategoryIcon from "./CategoryIcon";
import ProgressRing from "./ProgressRing";
import TaskCardActions from "./TaskCardActions";
import useSwipeActions from "../hooks/useSwipeActions.js";
import { calcTaskProgress } from "../utils/tasksUtils";
import { toggleTaskCompleted, deleteTask as deleteTaskAction } from "../reducers/taskActions.js";

const TaskCard = ({ task }) => {
  const dispatch = useTasksDispatch();
  const { isSwiped, onTouchStart, onTouchMove, onTouchEnd } = useSwipeActions({ threshold: 50 });

  const category = CATEGORIES_BY_ID[task.categoryId];
  const progress = useMemo(() => calcTaskProgress(task), [task]);

  return (
    <div
      className={`task-card-container group ${isSwiped ? "swiped" : ""}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="task-card">
        <input
          type="checkbox"
          checked={!!task.completed}
          onChange={() => dispatch(toggleTaskCompleted(task.id))}
          className="main-checkbox"
          aria-label={`Mark "${task.title}" as ${task.completed ? "uncompleted" : "completed"}`}
        />

        <div className="task-card-text-container">
          {category && <CategoryIcon category={category} />}
          <div className="task-card-text">
            <span className="text-regular desktop:text-regular-desktop">{category?.name ?? "—"}</span>
            <span className="text-small desktop:text-small-desktop">{task.title}</span>
          </div>
        </div>

        <div className="task-card-data">
          <ProgressRing percent={progress} color={category?.color} trackColor={category?.bgColor} />
        </div>
      </div>

      <TaskCardActions id={task.id} deleteTask={(id) => dispatch(deleteTaskAction(id))} />
    </div>
  );
};

export default memo(TaskCard);
