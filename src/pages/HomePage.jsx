import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import PlusIcon from "../components/icons/PlusIcon";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <TaskList/>
      <div className="">
        <button
          onClick={() => navigate('/task')}
          className="main-button"
        >
          <PlusIcon className="icon-size text-white"/> New Task
        </button>
      </div>
    </div>
  );
};

export default HomePage;
