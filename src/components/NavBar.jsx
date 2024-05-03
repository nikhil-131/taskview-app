import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import add from "../assets/add.svg"


const NavBar = ({ onClick, dataFromMainColumns }) => {
    const [tasks, setTasks] = useState({
        id: "",
        title: "",
        desc: "",
        category: ""
    });
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [taskOpen, setTaskOpen] = useState(false);

    const saveToLocalS = () => {
        localStorage.setItem("taskData", JSON.stringify(tasks));
      }
    
      useEffect(() => {
        let taskHouse = localStorage.getItem("tasks");
        if (taskHouse) {
          let tasks = JSON.parse(taskHouse);
          setTasks(tasks);
        }
      }, []);

    useEffect(() => {
        if (dataFromMainColumns) {
            setTitle(dataFromMainColumns.title);
            setDescription(dataFromMainColumns.desc);
            setCategory(dataFromMainColumns.category);
            // console.log(title, description, category);
            setTaskOpen(true);
            saveToLocalS();
        }
        // console.log("Data from MainColuns to NavBar success\n", dataFromMainColumns);
    }, [dataFromMainColumns])


    const handleChange = (event) => {
        // console.log(event.target.name, event.target.value);
        setTasks({
            ...tasks,
            [event.target.name]: event.target.value
        });
        if (event.target.name === "title") {
            setTitle(event.target.value);
        }
        else if (event.target.name === "desc") {
            setDescription(event.target.value);
        }
        else if (event.target.name === "category") {
            setCategory(event.target.value);
        }
        // console.log(tasks);
    }

    const openTask = async (event) => {
        setTaskOpen(true);
    }


    const addDetails = (event) => {
        if ((tasks.title.length > 0 && tasks.desc.length > 0 && parseInt(tasks.category) > 0)) {
            setTaskOpen(false);
            event.preventDefault();
            tasks.id = uuidv4();
            // tasks.title = title
            onClick(tasks);
            setTitle("");
            setDescription("");
            setCategory("");
        }
    }

    return (
        <nav className='navBar bg-white px-4 py-1.5 flex justify-between items-center'>
            <div className="logo">
                <p className='text-3xl font-semibold'>KanView</p>
            </div>
            <div className="addButton">
                <button onClick={openTask} className='bg-blue-500 text-white px-3 py-1.5 rounded-full border-2 border-blue-500 hover:bg-white hover:text-blue-500 transition-all'><p className='sm:block hidden'>Add New Task</p><img className='sm:hidden' src={add} alt="Add New Task" title='Add New Task' /></button>
                {(taskOpen) &&
                    <form method='post'>
                        <div className="addTaskContainer absolute top-0 bottom-0 left-0 right-0 m-auto bg-gray-200 bg-opacity-30 w-full h-[100vh]">
                            <div className="addTask absolute top-0 bottom-0 left-0 right-0 m-auto lg:w-[28vw] md:w-[50vw] w-[85vw] h-fit bg-white p-6 rounded-lg">
                                <div className="taskHeading">
                                    <h2 className='text-2xl text-center py-2 font-semibold'>Add New Task</h2>
                                </div>
                                <div className="inputTitle mb-4">
                                    <h4 className='text-lg'>Title</h4>
                                    <label htmlFor="title">
                                        <input onChange={handleChange} value={title} className='border-2 focus:border-blue-400 outline-none w-full rounded-lg px-2 py-0.5' type="text" name="title" id="title" pattern='[a-zA-Z]{1,}' required />
                                    </label>
                                </div>
                                <div className="inputDesc mb-4">
                                    <h4 className='text-lg'>Description</h4>
                                    <label htmlFor="desc">
                                        <input onChange={handleChange} value={description} className='border-2 focus:border-blue-400 outline-none w-full rounded-lg px-2 py-0.5' type="text" name="desc" id="desc" pattern='[a-zA-Z0-9]{25,}' required />
                                    </label>
                                </div>
                                <div className="inputCategory mb-4">
                                    <h4 className='text-lg'>Category</h4>
                                    <select onChange={handleChange} value={category} className='w-full border-2 rounded-lg py-0.5 px-2 focus:border-blue-400 outline-none' name="category" id="category" required>
                                        <option value="">Select</option>
                                        <option value="1">Todo</option>
                                        <option value="2">Next</option>
                                        <option value="3">Later</option>
                                    </select>
                                </div>
                                <div className="operationButtons flex justify-between gap-6 pt-4">
                                    <button onClick={addDetails} type='submit' className='bg-blue-400 hover:bg-blue-500 text-white py-1 px-4 rounded-full text-lg'>Add</button>
                                    <button onClick={() => setTaskOpen(false)} className='bg-black text-white py-1 px-4 rounded-full text-lg'>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </form>}
            </div>
        </nav>
    )
}

export default NavBar
