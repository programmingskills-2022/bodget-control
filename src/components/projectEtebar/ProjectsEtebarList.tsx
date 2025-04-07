import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProjectsEtebarStore } from '../../store/projectsEtebar';
import ProjectsEtebarListTable from "./ProjectsEtebarListTable";
import Button from "../UI/Button";
import ProjectsEtebarSum from "./ProjectsEtebarSum";
import ResourceValues from "../ResourceValues";
import ProjectInfo from "../project/ProjectInfo";
import { useProjectsEtebarDtlStore } from "../../store/projectsEtebarDtl";

type Props ={
    more:boolean
}
const ProjectsEtebarList = ({more}:Props) => {  
    const {
        projectsEtebar, 
        //projectEtebarInAResource ,
        getByProjectId,
    }= useProjectsEtebarStore()

    const {projectEtebarDtls}=useProjectsEtebarDtlStore()

    const navigate= useNavigate()
    const { projectId } = useParams();

    const handleDetailChangeClick = ()=>{
            navigate(`add`)
    }  

    useEffect(()=>{
      if(!more)
        getByProjectId(projectId as string) 
    },[]) 
  


    return (  
        <div className="relative overflow-x-auto  sm:rounded-lg">  
            <ResourceValues isaProject={true} isEtebar={true}/> {/*use fetchProjectEtebarsSum*/}
            <ProjectInfo />   
            {/* use fetchProjectById*/}  
            {
                more 
                ? 
                <>
                    {projectEtebarDtls?.length>0 && projectId!==undefined && <ProjectsEtebarListTable projectId={projectId} more={more} mode={true}/>} {/*  use fetchProjectsEtebarByProjectIdAndResourceId*/ } 
                    <div className='w-full flex justify-end'>  
                        <Button  
                            label="بازگشت"  
                            exit={true}  
                            variant={'bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:text-blue-700 w-32'} 
                        />   
                    </div>   
                </>
                :
                <>
                    <ProjectsEtebarSum/>  {/* use fetchProjectsEtebarSumByProjectId*/}
                    
                    <div className='w-full flex justify-end'>  
                        <Button  
                            label="تغییر اعتبار"  
                            onClick={handleDetailChangeClick}  
                            variant={'bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 w-32'}
                        />   
                        <Button  
                            label="بازگشت"  
                            exit={true} 
                            variant={'bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:text-blue-700 w-32'} 
                        />   
                    </div>  

                        {projectsEtebar?.length>0 && projectId!==undefined && <ProjectsEtebarListTable projectId={projectId as string} more = {more} mode={true}/> }
                </>
            }
        </div>

    );  
};  

export default ProjectsEtebarList;  