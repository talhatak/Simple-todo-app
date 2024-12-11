import 'boxicons'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Todos(){
    
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(()=>{
        fetchTasks();
    },[]);

    const fetchTasks = async ()=> {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/todos/');
            setTasks(response.data)
        } catch (error) {
            console.log("error: ",error)
        }
    }
    // function to add task
    const addTask = async () =>{
        try {
            if(inputValue.trim() !== ''){
                const response = await axios.post('http://localhost:8000/api/add_todo/',
                    {
                        title : inputValue,
                        completed : false
                    });
                setTasks([...tasks, response.data])
                setInputValue('');
            }
        }catch(error){
            console.log('error', error)
        }
    }

    // function to update task
    const toggleCompleted = async (taskId) =>{
        try {
            const taskToUpdate = tasks.find(task=>task.id === taskId);

            if(taskToUpdate){
                const response = await axios.put(`http://localhost:8000/api/update_todo/${taskId}/`,
                    {
                        completed : !taskToUpdate.completed
                    });
                const updatedTasks = tasks.map(task=>
                    task.id === taskId ? {
                        ...task, completed : response.data.completed
                    } : task
                );
                setTasks(updatedTasks);
            }
        }catch(error){
            console.log('error', error)
        }}
        
    // function to delete task
    const deleteTask = async (taskId) =>{
        try {
            await axios.delete(`http://localhost:8000/api/delete_todo/${taskId}/`);
            const updatedTask = tasks.filter(task => task.id !== taskId)
            setTasks(updatedTask)
        }catch(error){
            console.log('error', error)
        }}

    return (
        <div className='container'>
            <div className='todo'>
                <div className='app-title'>
                    <h2>Todo App</h2>
                    <box-icon type='solid' size='md' name='book-bookmark'></box-icon>
                </div>
                <div className='row'>
                    <input type='text' id='input-box' placeholder='Enter your task' 
                    value={inputValue} onChange={ e => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter'){addTask()}}}/>
                    <button onClick={addTask}>Add</button>
                </div>
                <ul id="list-container">
                    { tasks.map(task => (
                        <li key={task.id} 
                        className={task.completed ? 'checked' : ''}>
                            <p onClick={()=> toggleCompleted(task.id)}>{ task.completed? <del> {task.title} </del> : task.title }</p>
                            <span onClick={()=> deleteTask(task.id)}> ❌ </span>
                            </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}