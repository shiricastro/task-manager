const calcTaskProgress = (task) => {
  const total = task?.subTasks?.length || 0;
  if (!total) return task?.completed ? 100 : 0;
  const done = task.subTasks.filter(s => s.completed).length;
  return Math.round((done / total) * 100);
};

export {calcTaskProgress}