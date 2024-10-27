import { useContext } from "react";

import Sidebar from "./components/Sidebar";
import { ProjectDataContext } from "./store/projectDataContext";

function App() {
  const { projectData, content, handleAddProject, handleSelectedProject} = useContext(ProjectDataContext);
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
