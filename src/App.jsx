import { useRef, useState } from "react";

import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import NewProject from "./components/NewProject";
import Project from "./components/Project";

function App() {
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
    let inputValues = inputRef.current.open();
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

  if (projectData.selectedProject === null) {
    content = <NewProject ref={inputRef} onCancel={handleCancel} onSave={handleSave}/>
  } else if (projectData.selectedProject === undefined) {
    content = <Home onCreate={handleAddProject}/>;
  } else {
    content = <Project projectTask={projectData.selectedProject.tasks} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} onDelete={handleDeleteProject} selectedProject={projectData.selectedProject}/>
  }

  return (
    <>
      <div className='flex h-screen w-screen bg-yellow-400'>
        <Sidebar openSelectedProject={handleSelectedProject} data={projectData} onAdd={handleAddProject}/>
        {content}
      </div>
    </>
  );
}

export default App;
