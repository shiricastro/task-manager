const TASKS_STORAGE_KEY = "taskManager.tasks";

const hasLocalStorage = () => {
  if (typeof window === "undefined" || !window.localStorage) {
    return false;
  }
  try {
    const testKey = "__ls_test__";
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

const safeParse = (str) => {
  try {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const normalizeSubTask = (s) => {
  if (!s || typeof s !== "object") return null;
  return {
    id: String(s.id ?? ""),
    title: typeof s.title === "string" ? s.title : "",
    completed: Boolean(s.completed),
  };
};

const normalizeTask = (t) => {
  if (!t || typeof t !== "object") return null;
  const subTasks = Array.isArray(t.subTasks) ? t.subTasks : [];
  const normalizedSubs = subTasks.map(normalizeSubTask).filter(Boolean);

  return {
    id: String(t.id ?? ""),
    title: typeof t.title === "string" ? t.title : "",
    categoryId: typeof t.categoryId === "string" ? t.categoryId : null,
    completed: Boolean(t.completed),
    subTasks: normalizedSubs,
  };
};

const normalizeTasksArray = (arr) => (Array.isArray(arr) ? arr : []).map(normalizeTask).filter(Boolean);

const loadTasksFromStorage = () => {
  if (!hasLocalStorage()) return [];
  const rawData = window.localStorage.getItem(TASKS_STORAGE_KEY);
  if (!rawData) return [];
  const tasksArray = safeParse(rawData);
  return normalizeTasksArray(tasksArray);
};

const saveTasksToStorage = (tasks) => {
  if (!hasLocalStorage()) return;
  try {
    const normalized = normalizeTasksArray(tasks);
    window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(normalized));
  } catch (error) {
    console.error("Failed to save tasks to storage:", error);
  }
};

const clearTasksStorage = () => {
  if (!hasLocalStorage()) return;
  try {
    window.localStorage.removeItem(TASKS_STORAGE_KEY);
  } catch (err) {
    console.error("Failed to clear tasks storage:", err);
  }
};

export { loadTasksFromStorage, saveTasksToStorage, clearTasksStorage };
