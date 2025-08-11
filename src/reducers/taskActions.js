import {
  ADD_TASK,
  DELETE_TASK, 
  EDIT_TASK, 
  TOGGLE_TASK_COMPLETED, 
  ADD_SUBTASK, 
  DELETE_SUBTASK, 
  TOGGLE_SUBTASK_COMPLETED 
} from "./taskActionTypes.js";

const addTask = (task) => ({ type: ADD_TASK, payload: { task } });
const deleteTask = (id) => ({ type: DELETE_TASK, payload: { id } });
const editTask = (task) => ({ type: EDIT_TASK, payload: { task } });
const toggleTaskCompleted = (id) => ({ type: TOGGLE_TASK_COMPLETED, payload: { id } });

const addSubtask = (taskId, subTask) => ({
  type: ADD_SUBTASK, payload: { taskId, subTask }
});
const deleteSubtask = (taskId, subTaskId) => ({
  type: DELETE_SUBTASK, payload: { taskId, subTaskId }
});
const toggleSubtaskCompleted = (taskId, subTaskId) => ({
  type: TOGGLE_SUBTASK_COMPLETED, payload: { taskId, subTaskId }
});

export {
    addTask,
    deleteTask,
    editTask,
    toggleTaskCompleted,
    addSubtask,
    deleteSubtask,
    toggleSubtaskCompleted
}
