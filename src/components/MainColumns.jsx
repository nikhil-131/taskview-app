import React, { useState, useEffect, Children } from 'react'
import { useDrag, useDrop } from 'react-dnd'

const MainColumns = ({ taskData, setTaskData, sendTaskDataToApp, saveToLocalS }) => {

    const isWhichColumn = (item) => {
        let a = parseInt(item.category);
        return a;
    }

    const handleEdit = (event, id) => {
        let t = taskData.filter(item => item.id === id);
        // console.log(t);
        sendTaskDataToApp(t);
        // console.log(`The id is ${id}`);
        let newTask = taskData.filter((item) => { return item.id !== id })
        setTaskData(newTask);
    }

    const handleDelete = (event, id) => {
        // console.log(`The id is ${id}`);
        let newTask = taskData.filter((item) => { return item.id !== id })
        setTaskData(newTask);
    }

    const ItemTypes = {
        CARD: 'Card'
    }

    const DraggableItems = ({ title, desc, id, category }) => {
        const [{ isDragging }, drag] = useDrag(
            () => ({
                type: ItemTypes.CARD,
                item: { title, desc, category, id },
                collect: (monitor) => ({
                    isDragging: monitor.isDragging(),
                }),
            }));

        return (
            <div ref={drag} className={`taskContainer flex gap-4 bg-white mb-2 rounded-md p-2 ${isDragging ? "opacity-50" : "opacity-100"}`}>
                <div className="task w-[75%] ">
                    <p>{title}</p>
                    <p className='descSmall text-sm'>{desc}</p>
                </div>
                <div className="editTools w-[25%] flex justify-evenly items-center">
                    <div className="editButton">
                        <svg onClick={(event) => handleEdit(event, id)} className='w-7 hover:text-blue-600 hover:fill-blue-600 cursor-pointer hover:bg-blue-200 rounded-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                            <path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11 20H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className="deleteButton">
                        <svg onClick={(event) => handleDelete(event, id)} className='w-5 cursor-pointer hover:text-red-600 hover:fill-red-600 hover:bg-red-200 rounded-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                            <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                </div>
            </div>
        )
    }

    const DropTarget = ({ value, children }) => {
        const [{ canDrop, isOver }, drop] = useDrop(
            () => ({
                accept: ItemTypes.CARD,
                drop: (item) => handleDrop(item, value, children),
                collect: (monitor) => ({
                    isOver: monitor.isOver(),
                    canDrop: monitor.canDrop(),
                }),
            }));

        return (
            <div ref={drop} className={`w-full min-h-[70vh] border-black ${children.length > 0 ? 'border-none' : 'border-dashed'} border-2`}>
                {children}
            </div>
        )
    }

    const handleDrop = (item, value, children) => {
        // console.log(`Item Dropped: ${item}`);
        // console.log(item, children);
        // console.log(`column no. ${value}`);
        
        const droppedItemIndex = taskData.findIndex((task) => task.id === item.id);
        const droppedItem = taskData.filter(task => task.id !== item.id);
        // console.log("Drop Item: ", droppedItem);
        // console.log('Drop Index: ', droppedItemIndex);
        if (droppedItemIndex !== -1) {
            const updatedTaskData = [...taskData];
            updatedTaskData[droppedItemIndex] = {
                ...updatedTaskData[droppedItemIndex],
                category: value
            };
            if(updatedTaskData[droppedItemIndex].category !== item.category) {
                let temp = updatedTaskData[droppedItemIndex];
                updatedTaskData.splice(droppedItemIndex, 1);
                updatedTaskData.push(temp);
            }
            setTaskData(updatedTaskData);
        }
    }

    return (
        <>
            <div className='mainColumns grid md:grid-cols-3 grid-cols-1 gap-4 mt-2 mx-4'>

                <div className="column1 text-center text-xl">
                    <h2 className='bg-white mb-2'>Todo</h2>
                    <div className="column1Data w-full min-h-[50vh]">
                        <DropTarget value={1}>
                            {taskData.map((item) => {
                                return (isWhichColumn(item) === 1 &&
                                    <DraggableItems key={item.id} title={item.title} desc={item.desc} category={item.category} id={item.id} />
                                )
                            })}
                        </DropTarget>
                    </div>
                </div>
                <div className="column2 text-center text-xl">
                    <h2 className='bg-white mb-2'>Next</h2>
                    <div className="column2Data w-full min-h-[50vh]">
                        <DropTarget value={2}>
                            {taskData.map((item) => {
                                return (isWhichColumn(item) === 2 &&
                                    <DraggableItems key={item.id} title={item.title} desc={item.desc} category={item.category} id={item.id} />
                                )
                            })}
                        </DropTarget>
                    </div>
                </div>
                <div className="column3 text-center text-xl">
                    <h2 className='bg-white mb-2'>Later</h2>
                    <div className="column3Data w-full min-h-[50vh]">
                        <DropTarget value={3}>
                            {taskData.map((item) => {
                                return (isWhichColumn(item) === 3 &&
                                    <DraggableItems key={item.id} title={item.title} desc={item.desc} category={item.category} id={item.id} />
                                )
                            })}
                        </DropTarget>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainColumns
