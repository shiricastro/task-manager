import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnalyticsLogger from "./AnalyticsLogger";
import HomePage from "../pages/HomePage";
import TaskPage from "../pages/TaskPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AnalyticsLogger />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/task" element={<TaskPage />} />
        <Route path="/task/:id" element={<TaskPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter> 
  )
}

export default AppRouter
