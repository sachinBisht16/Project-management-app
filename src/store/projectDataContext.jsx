import { useState, createContext, useRef} from "react";
import Home from "../components/Home";
import Project from "../components/Project";
import NewProject from "../components/NewProject";

export const ProjectDataContext = createContext({
    projectData: {},
    content: <></>, 
    handleAddProject: () =>{},
    handleSelectedProject: () => {},
    tasks: [],
    onAddTask: () => {},
    onDeleteTask: () => {},
});


export default function ProjectDataContextProvider({ children }) {
    const inputRef = useRef();
    const [projectData, setProjectData] = useState({
        selectedProjectId: undefined,
        selectedProject: undefined,
        projects: []
    });

    function handleAddTask (text) {
        setProjectData(prevProjectData => {
            const taskId = Math.random();
                const tasks = [...prevProjectData.selectedProject.tasks, 
                {
                    taskId,
                    projectId: prevProjectData.selectedProjectId,
                    text: text
                }
            ];

            const projects = prevProjectData.projects.filter(project => project.projectId != prevProjectData.selectedProjectId) 

            return {
                ...prevProjectData,
                selectedProject: {...prevProjectData.selectedProject, tasks},
                projects: [...projects, {...prevProjectData.selectedProject, tasks}]
            }
        })
    }

    function handleDeleteTask (id) {
        setProjectData(prevProjectData => {
            const projects = prevProjectData.projects.filter(project => project.projectId != prevProjectData.selectedProjectId) 
            return {
                ...prevProjectData,
                selectedProject: {...prevProjectData.selectedProject, tasks: prevProjectData.selectedProject.tasks.filter(task => id != task.taskId)},
                projects: [...projects, {...prevProjectData.selectedProject, tasks: prevProjectData.selectedProject.tasks.filter(task => id != task.taskId)}]
            }
        })
    }

    function handleAddProject () {
        setProjectData(prevProjectData => {
            return {
            ...prevProjectData,
            selectedProject: null
            }
        })
    }

    function handleSave() {
        const inputValues = inputRef.current.open();
        if (inputValues.title.trim() == '' || inputValues.description.trim() == '' || inputValues.date.trim() == '' ) {
            setProjectData(prevProjectData => {
                return {
                    ...prevProjectData,
                    selectedProject: undefined
                }
            })
            return;
        }

        setProjectData(prevProjectData => {
            return {
                ...prevProjectData,
                selectedProject: undefined,
                selectedProjectId: undefined,
                projects: [...prevProjectData.projects, inputValues]
            }
        })
    }

    function handleCancel () {
        setProjectData(prevProjectData => {
            return {
            ...prevProjectData,
            selectedProject: undefined
            }
        })   
    }

    function handleSelectedProject (currentProject) {
        setProjectData(prevProjectData => {
            return {
                ...prevProjectData,
                selectedProject: currentProject,
                selectedProjectId: currentProject.projectId
            }
        })
    }

    function handleDeleteProject () {
        setProjectData(prevProjectData => {
            return {
                ...prevProjectData,
                selectedProject: undefined,
                selectedProjectId: undefined,
                projects: prevProjectData.projects.filter(project => prevProjectData.selectedProjectId != project.projectId)
            }
        })
    }

    let content = <Home />;

    if (projectData.selectedProject === null) 
        content = <NewProject ref={inputRef} onCancel={handleCancel} onSave={handleSave}/>
    else if (projectData.selectedProject === undefined)
        content = <Home onCreate={handleAddProject}/>;
    else 
        content = <Project onDelete={handleDeleteProject} selectedProject={projectData.selectedProject}/>
    

    const ctxValue = {
        projectData,
        content, 
        handleAddProject,
        handleSelectedProject,
        tasks: projectData.selectedProject ? projectData.selectedProject.tasks : [],
        onAddTask: handleAddTask,
        onDeleteTask: handleDeleteTask
    }


    return (
        <ProjectDataContext.Provider value={ctxValue}>
            {children}
        </ProjectDataContext.Provider>
    )
}