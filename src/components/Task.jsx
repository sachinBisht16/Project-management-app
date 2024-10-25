export default function Task ({ tasks, deleteTask }) {
    return (
        <ul className="mt-5">
            {tasks.map(task => <li className="bg-yellow-200 flex" key={task.taskId}>
                <span className="text-2xl my-2 ml-2 bg-yellow-500 border-2 rounded w-full p-1">{task.text}</span>
                <button className='bg-black m-2 text-white rounded p-1'onClick={() => deleteTask(task.taskId)}>Clear</button>
            </li>)}
        </ul>
    )
}