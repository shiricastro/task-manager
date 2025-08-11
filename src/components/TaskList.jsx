import { useState, useMemo } from "react";
import { useTasksState } from "../context/TaskContext";
import TaskCard from "./TaskCard";
import TaskListHeader from "./TaskListHeader";
import { DropdownProvider } from "../context/DropdownContext";

const TaskList = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const tasks = useTasksState();

const { filteredTasks, inProgressTasks, completedTasks } = useMemo(() => {
  const filteredTasks =
    selectedCategoryId == null
      ? tasks
      : tasks.filter(t => t.categoryId === selectedCategoryId);

  const { inProgressTasks, completedTasks } = filteredTasks.reduce(
    (acc, task) => {
      acc[task.completed ? 'completedTasks' : 'inProgressTasks'].push(task);
      return acc;
    },
    { inProgressTasks: [], completedTasks: [] }
  );

  return { filteredTasks, inProgressTasks, completedTasks };
}, [tasks, selectedCategoryId]);

  return (
    <DropdownProvider>
      <TaskListHeader
        title="In progress"
        count={inProgressTasks.length}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
        filterId="top"
      />
      {tasks.length === 0 ? (
        <div className="comment">No tasks yet</div>
      ) : filteredTasks.length === 0 ? (
        <div className="comment">No tasks in this category</div>
      ) : (
        <div className="task-card-wrapper">
          {filteredTasks.map(task => <TaskCard key={task.id} task={task} />)}
        </div>
      )}

      <TaskListHeader
        title="Completed"
        count={completedTasks.length}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
        filterId="bottom"
      />
    </DropdownProvider>
  );
};

export default TaskList;
