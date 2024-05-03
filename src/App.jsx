import { useState, useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import MainColumns from './components/MainColumns'
import { v4 as uuidv4 } from 'uuid';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {

  const [taskData, setTaskData] = useState([]);
  const [dataFromMainColumns, setDataFromMainColumns] = useState();

  const saveToLocalS = () => {
    localStorage.setItem("taskData", JSON.stringify(taskData));
  }

  const handleSubmitTask = async (TData) => {
    // console.log('Form Data Successfully received...');
    // console.log(TData);
    setTaskData([
      ...taskData,
      TData
    ]);
    // console.log('Successfully setTaskData...');
    // console.log(taskData);
    saveToLocalS();
  }

  const receiveDataFromMainColumns = (data) => {
    setDataFromMainColumns(data[0]);
    // console.log("Data from MainColumns...\n", dataFromMainColumns);
  }

  useEffect(() => {
    // localStorage.clear();
    let taskHouse = localStorage.getItem("taskData");
    if (taskHouse) {
      let tasksOn = JSON.parse(localStorage.getItem("taskData"));
      setTaskData(tasksOn);
      // console.log(JSON.parse(localStorage.getItem("taskData")));
    }
    if (taskData) {
      localStorage.clear();
    }
  }, []);

  return (
    <>
      <header>
        <NavBar onClick={handleSubmitTask} dataFromMainColumns={dataFromMainColumns} />
      </header>
      <DndProvider backend={HTML5Backend}>
        <main>
          <MainColumns taskData={taskData} setTaskData={setTaskData} sendTaskDataToApp={receiveDataFromMainColumns} saveToLocalS={saveToLocalS} />
        </main>
      </DndProvider>
    </>
  )
}

export default App
