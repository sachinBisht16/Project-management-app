import { useState } from "react";
import Task from "./Task";

export default function Tasks ({addTask, tasks, deleteTask}) {
    const [enteredTask, setEnteredTask] = useState('');

    function handleEnteredTask (e) {
        setEnteredTask(e.target.value);
    }

    function handleClick () {
        addTask(enteredTask);
        setEnteredTask('');
    }

    return (
        <section>
            <h1 className="text-5xl font-bold my-5">TASKS</h1>
            <div className="flex w-2/3 justify-between">
                <span className="w-10/12 bg-green-400"><input className='h-full p-1 bg-yellow-100 border-b-2 border-slate-500 rounded-sm w-full' type="text" onChange={handleEnteredTask} value={enteredTask}/></span>
                <button className='bg-black text-white rounded-sm p-1 font-medium hover:bg-white hover:text-black' onClick={handleClick}>Add Tasks</button>
            </div>
            {tasks.length == 0 && <p className="text-xl mt-5">Currently no task has been added</p>}
            {tasks.length > 0 && <Task deleteTask={deleteTask} tasks={tasks} />}
        </section>
    )
}