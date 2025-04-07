import { Suspense, useEffect} from "react";
import ProjectSearch from "./ProjectSearch"
import RpProjectsEtebarExport2Excel from "./RpProjectsEtebarExport2Excel";
import { useProjectStore } from "../../store/projectsStore";
import { useAuthStore } from "../../store/authStore";
import { useContext } from "../../contexts/context";
import RpProjectsEtebarTable from "./RpProjectsEtebarTable";

const ProjectsList = () => {
const {  
    getAllProjectsEtebarList
    } = useProjectStore();  
    const { loginInfo } = useAuthStore();  
    const { citySearch, organOstanSearch, faslSearch, barnamehSearch, employeeSearch, projectCode} = useContext();

    useEffect(()=>{
        console.log('fetch AllProjectsEtebarList')
        getAllProjectsEtebarList(1, citySearch , organOstanSearch, faslSearch, barnamehSearch, !loginInfo?.user?.unlimited ? loginInfo?.user?.employee.id : employeeSearch!==null ? employeeSearch : '', projectCode)    
    },[citySearch, organOstanSearch, faslSearch, barnamehSearch, employeeSearch, projectCode])   

  return (
    <>
        {/* search projects */}
        <ProjectSearch justCitySearch={false} />
        <RpProjectsEtebarExport2Excel />
        <div className="mt-4 w-full flex flex-col justify-between relative overflow-x-auto shadow-md sm:rounded-lg"> 
            <Suspense fallback={<div className='w-full flex' >بارگزاری پروژه ها...</div>}>  
              <RpProjectsEtebarTable />
            </Suspense>
        </div>
    </>
  )
}

export default ProjectsList;