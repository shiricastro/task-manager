import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasksState } from "../context/TaskContext";
import back from "../assets/back.svg"
import TaskForm from "../components/TaskForm";

const TaskPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const tasks = useTasksState();

  const existingTask = tasks.find(t => t.id === id);
    
  useEffect(() => {
    if (id && !existingTask) navigate("/");
  }, [id, existingTask, navigate]);

  const onFormAction = () => navigate("/");

  return (
    <div >
      <button onClick={() => navigate(-1)} className="back-button">
        <img src={back} alt="back icon"/> Back
      </button>
      {
        (id && existingTask) || !id ? (
          <TaskForm 
            mode={id ? "edit" : "create"} 
            initialTask={existingTask} 
            onSaved={onFormAction} 
          />
        ) : null
      }
    </div>
  );
};

export default TaskPage;
