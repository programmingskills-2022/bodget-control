import { ReactNode } from "react";
import { useContext } from "../contexts/context";


  
type Props ={
  children: ReactNode;
}

const ProjectsEtebar = ({children}:Props) => {

  const {menuItems} = useContext()
  return (
    <div className='flex'>        
        <div className="flex-1 container mx-auto p-4">   
            <header className="flex justify-between items-center mb-6 border-indigo-300 pb-4">  
              <h1 className="text-2xl font-bold text-gray-700">{menuItems.menuItems[menuItems.selectedIndex].parentLabel} </h1>  
            </header> 
            {children}
        </div>
    </div>
  )
}

export default ProjectsEtebar