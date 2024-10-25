export default function Sidebar({openSelectedProject, data, onAdd}) {
    return (
        <aside className="flex flex-col pt-14 bg-black text-white w-1/5 ">
            <h1 className="text-4xl mx-auto mb-10 text-center">Your Projects</h1>
            <button className= "bg-white text-black w-1/2 mx-auto rounded-md text-xl font-medium py-1.5 hover:bg-slate-200 " onClick={onAdd}>+ Add Project</button>
            <menu className="flex flex-col mx-auto mt-10">
                {data.projects.map(project => <li key={project.projectId}><button className="py-2 text-black bg-white mt-2 w-full rounded-sm px-10" onClick={() => openSelectedProject(project)}>{project.title}</button></li>)}
            </menu>
        </aside>
    )
}
