import Tasks from "./Tasks";

export default function Project( {onAddTask, onDeleteTask, selectedProject, onDelete, projectTask} ) {
    return (
        <div className="flex flex-col ml-10 mt-10">
            <div className="flex justify-between">
                <h1 className="text-5xl font-bold">{selectedProject.title.toUpperCase()}</h1>
                <button className='bg-black text-white px-3 rounded-md' onClick={onDelete}>Delete</button>
            </div>
            <p className="text-2xl my-3">{selectedProject.date}</p>
            <p className="text-xl bg-yellow-200 h-1/6">{selectedProject.description}</p>
            <Tasks tasks={projectTask} addTask={onAddTask} deleteTask={onDeleteTask}/>
        </div>
    )
}
