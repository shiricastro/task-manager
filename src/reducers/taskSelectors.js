
const selectAllTasks = (state) => state;

const selectTaskById = (state, id) =>
  state.find(t => t.id === id) || null;

const selectTasksByCategory = (state, categoryId) =>
  categoryId ? state.filter(t => t.categoryId === categoryId) : state;

const selectProgress = (state) => {
  if (!state.length) return { completed: 0, total: 0, percent: 0 };
  const total = state.length;
  const completed = state.filter(t => t.completed).length;
  const percent = Math.round((completed / Math.max(total,1)) * 100);
  return { completed, total, percent };
};

export {
  selectAllTasks,
  selectTaskById,
  selectTasksByCategory,
  selectProgress
}

