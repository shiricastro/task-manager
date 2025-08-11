import { createContext, useContext, useEffect, useMemo, useReducer, useRef } from "react";
import taskReducer from "../reducers/taskReducer";
import { loadTasksFromStorage, saveTasksToStorage } from "../utils/localStorageUtils";

const initialTasks = [
  {
    id: "1",
    title: "Buy dog food",
    categoryId: "pet",
    completed: false,
    subTasks: [
      { id: "1-1", title: "Check stock", completed: true },
      { id: "1-2", title: "Go to store", completed: false }
    ]
  },
  {
    id: "2",
    title: "Meditation session",
    categoryId: "self-care",
    completed: true,
    subTasks: []
  },
];

const TaskStateContext = createContext(undefined);
const TaskDispatchContext = createContext(undefined);

const initTasks = () => {
  const tasksFromStorage = loadTasksFromStorage();
  return tasksFromStorage.length > 0 ? tasksFromStorage : initialTasks;
};

const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, undefined, initTasks);

  const timerRef = useRef(null);
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      saveTasksToStorage(state);
      timerRef.current = null;
    }, 300);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [state]);

  return (
    <TaskStateContext.Provider value={state}>
      <TaskDispatchContext.Provider value={dispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskStateContext.Provider>
  );
};

const useTasksState = () => {
  const ctx = useContext(TaskStateContext);
  if (ctx === undefined) throw new Error("useTasksState must be used within <TaskProvider>");
  return Array.isArray(ctx) ? ctx : [];
};

const useTasksDispatch = () => {
  const ctx = useContext(TaskDispatchContext);
  if (ctx === undefined) throw new Error("useTasksDispatch must be used within <TaskProvider>");
  return ctx;
};

export { TaskProvider, useTasksState, useTasksDispatch }
