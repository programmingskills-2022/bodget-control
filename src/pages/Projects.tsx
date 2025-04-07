import { useContext } from "../contexts/context"
//import ResourceValues from "../components/ResourceValues";

import ProjectsList from "../components/project/ProjectsList";

// type Props = {
//     etebar:boolean
// }

const Projects = () => {
  
  const {menuItems
  } = useContext();

  return (
    <div className='flex'>        
        <div className="flex-1 container mx-auto p-4">  
          <header className="flex justify-between items-center mb-6 border-indigo-300 pb-4">  
            <h1 className="text-2xl font-bold text-gray-700">{menuItems[4].childrenItems[0].label}</h1>  
          </header>  
          {/* show resource values */}
          {/* <ResourceValues isaProject={false} isEtebar={true}/> */}
          {/* show project lists */}
          <ProjectsList />
        </div>
    </div>
  )
}

export default Projects