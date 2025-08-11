
import {
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  TOGGLE_TASK_COMPLETED,
  ADD_SUBTASK,
  DELETE_SUBTASK,
  TOGGLE_SUBTASK_COMPLETED,
} from "./taskActionTypes.js"; 

const taskReducer = (state, action) => {
  switch (action.type) {
    case ADD_TASK: {
      const { task } = action.payload;
      return [...state, task];
    }

    case DELETE_TASK: {
      const { id } = action.payload;
      return state.filter((t) => t.id !== id);
    }

    case EDIT_TASK: {
      const { task } = action.payload;
      return state.map((t) => (t.id === task.id ? task : t));
    }

    case TOGGLE_TASK_COMPLETED: {
      const { id } = action.payload;
      return state.map((t) => {
        if (t.id !== id) return t;
        const newCompleted = !t.completed;
        return {
          ...t,
          completed: newCompleted,
          subTasks: (t.subTasks || []).map((s) => ({ ...s, completed: newCompleted })),
        };
      });
    }

    case ADD_SUBTASK: {
      const { taskId, subTask } = action.payload;
      return state.map((t) =>
        t.id === taskId ? { ...t, subTasks: [...(t.subTasks || []), subTask] } : t
      );
    }

    case DELETE_SUBTASK: {
      const { taskId, subTaskId } = action.payload;
      return state.map((t) =>
        t.id === taskId
          ? { ...t, subTasks: (t.subTasks || []).filter((s) => s.id !== subTaskId) }
          : t
      );
    }

    case TOGGLE_SUBTASK_COMPLETED: {
      const { taskId, subTaskId } = action.payload;
      return state.map((t) => {
        if (t.id !== taskId) return t;

        const updated = (t.subTasks || []).map((s) =>
          s.id === subTaskId ? { ...s, completed: !s.completed } : s
        );
        const allDone = updated.length > 0 && updated.every((s) => s.completed);

        return { ...t, subTasks: updated, completed: allDone };
      });
    }

    default:
      return state;
  }
};

export default taskReducer;

