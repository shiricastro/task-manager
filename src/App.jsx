import Header from './components/Header';
import AppRouter from './router/AppRouter';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <TaskProvider>
      <div>
        <Header/>
        <div className='main-container'>
          <AppRouter />
        </div>
      </div>
    </TaskProvider>    
  );
}

export default App;
