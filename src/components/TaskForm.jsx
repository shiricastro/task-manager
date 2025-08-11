import { useEffect, useMemo, useState } from "react";
import { useTasksDispatch } from "../context/TaskContext";
import FilterBar from "./FilterBar";
import PlusIcon from "./icons/PlusIcon";
import BinIcon from "./icons/BinIcon";
import CheckIcon from "./icons/CheckIcon";
import TextInput from "./TextInput";
import { useNavigate } from "react-router-dom";
import CloseIcon from "./icons/CloseIcon";
import SubtaskRow from "./SubtaskRow";
import { addTask, editTask, deleteTask as deleteTaskAction } from "../reducers/taskActions.js";


const empty = { id: "", title: "", categoryId: null, completed: false, subTasks: [] };
const emptyErrors = { title: "", categoryId: "", subTasks: [] };

const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

const TaskForm = ({ mode = "create", initialTask }) => {
  const navigate = useNavigate();
  const dispatch = useTasksDispatch();
  const [form, setForm] = useState(() => (initialTask ? { ...initialTask } : { ...empty }));
  const [errors, setErrors] = useState(emptyErrors);
  const isEdit = mode === "edit";

  useEffect(() => {
    if (initialTask) {
      setForm({ ...initialTask });
      setErrors({ ...emptyErrors, subTasks: Array(initialTask.subTasks?.length || 0).fill("") });
    }
  }, [initialTask]);

  const done = useMemo(() => form.subTasks.filter((s) => s.completed).length, [form.subTasks]);
  const total = form.subTasks.length;

  useEffect(() => {
    if (total > 0) {
      const shouldBeCompleted = done === total;
      setForm((prev) => (prev.completed === shouldBeCompleted ? prev : { ...prev, completed: shouldBeCompleted }));
    }
  }, [done, total]);

  const handleChange = (name, value, index = null) => {
    setErrors((prev) => {
      const next = { ...prev };
      if (index !== null) {
        const arr = [...(next.subTasks || [])];
        arr[index] = "";
        next.subTasks = arr;
      } else {
        next[name] = "";
      }
      return next;
    });

    if (name === "subTasks" && index !== null) {
      setForm((prev) => ({
        ...prev,
        subTasks: prev.subTasks.map((s, i) => (i === index ? { ...s, title: value } : s)),
      }));
    } else if (name === "subTasks" && Array.isArray(value)) {
      setForm((prev) => ({ ...prev, subTasks: value }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addSub = () => {
    const id = genId();
    setForm((prev) => ({
      ...prev,
      subTasks: [...prev.subTasks, { id, title: "", completed: false }],
    }));
    setErrors((prev) => ({ ...prev, subTasks: [...(prev.subTasks || []), ""] }));
  };

  const delSub = (id) => {
    setForm((prev) => {
      const idx = prev.subTasks.findIndex((s) => s.id === id);
      const nextSubs = prev.subTasks.filter((s) => s.id !== id);
      setErrors((prevErr) => {
        const nextErrs = [...(prevErr.subTasks || [])];
        if (idx > -1) nextErrs.splice(idx, 1);
        return { ...prevErr, subTasks: nextErrs };
      });
      return { ...prev, subTasks: nextSubs };
    });
  };

  const toggleSubCompleted = (id, completed) => {
    setForm((prev) => ({
      ...prev,
      subTasks: prev.subTasks.map((s) => (s.id === id ? { ...s, completed } : s)),
    }));
  };

  const toggleCompleted = (val) => {
    setForm((prev) => ({
      ...prev,
      completed: val,
      subTasks: prev.subTasks.map((s) => ({ ...s, completed: val })),
    }));
  };

  const validate = () => {
    const next = { ...emptyErrors, subTasks: Array(form.subTasks.length).fill("") };
    let ok = true;
    if (!form.categoryId) { next.categoryId = "Please select a category."; ok = false; }
    if (!form.title.trim()) { next.title = "Task name is required."; ok = false; }
    form.subTasks.forEach((s, i) => {
      if (!s.title.trim()) { next.subTasks[i] = "Subtask name is required."; ok = false; }
    });
    setErrors(next);
    return ok;
  };

  const onSave = () => {
    if (!validate()) return;
    const updatedTask = {
      ...form,
      completed: form.subTasks.length > 0 ? form.subTasks.every((s) => s.completed) : form.completed,
    };
    if (isEdit) {
      dispatch(editTask(updatedTask));
    } else {
      const id = form.id || Date.now().toString();
      dispatch(addTask({ ...updatedTask, id }));
    }
    navigate("/");
  };

  const deleteTask = () => {
    if (!form.id) return;
    dispatch(deleteTaskAction(form.id));
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2 className="text-heading desktop:text-heading-desktop mb-mb-small">
        {isEdit ? "Edit Task" : "Create New Task"}
      </h2>

      <div className="mb-mb-smaller">
        <FilterBar
          id="task-form-category"
          selectedCategoryId={form.categoryId}
          onSelectCategory={(id) => handleChange("categoryId", id)}
        />
        {errors.categoryId && <p className="error-text text-small">{errors.categoryId}</p>}
      </div>

      <div className={`mb-mb-${form.subTasks.length > 0 ? "smaller" : "small"}`}>
        <TextInput
          label="Name your task"
          value={form.title}
          name="title"
          onChange={(title) => handleChange("title", title)}
          error={errors.title}
        />
      </div>

      <div className="mb-mb-base">
        {form.subTasks.length > 0 && (
          <div className="subTask-container">
            {form.subTasks.map((s, index) => (
              <SubtaskRow
                key={s.id}
                sub={s}
                index={index}
                error={errors.subTasks[index]}
                onToggle={toggleSubCompleted}
                onTitleChange={handleChange}
                onDelete={delSub}
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <button type="button" onClick={addSub} className="secondary-button w-auto">
            <PlusIcon className="icon-size" /> Add sub tasks
          </button>
          {isEdit && (
            <button type="button" onClick={deleteTask} className="secondary-button w-auto">
              <BinIcon className="icon-size" />
            </button>
          )}
        </div>
      </div>

      <button type="button" className="main-button mb-mb-smaller" onClick={onSave}>
        {isEdit ? "Save changes" : "Save new task"}
      </button>

      {isEdit && (
        <button
          type="button"
          className="secondary-button mb-mb-base"
          onClick={() => toggleCompleted(!form.completed)}
        >
          {form.completed ? (
            <>
              <CloseIcon className="icon-size" /> Mark as uncompleted
            </>
          ) : (
            <>
              <CheckIcon className="icon-size" /> Mark as completed
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default TaskForm;
