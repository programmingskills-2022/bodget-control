
import { useProjectsEtebarStore } from "../../store/projectsEtebar";
import { useEffect } from "react";
import { useProjectStore } from "../../store/projectsStore";
import ProjectEtebarDtlTable from "./ProjectEtebarDtlTable";
import { useParams } from "react-router-dom";
import ProjectEtebarTable from "./ProjectEtebarTable";
import { useProjectsEtebarDtlStore } from "../../store/projectsEtebarDtl";


type Props = {
  projectId: string;
  more: boolean;
  mode: boolean;
};

const ProjectsEtebarListTable = ({ projectId, more, mode }: Props) => {
  const {
    projectsEtebar, 
    getByProjectId,
    //getSumCity,
    getSum,
    getByProjectIdAndResourceValueId,
}= useProjectsEtebarStore()

const {
  projectEtebarDtls
}=useProjectsEtebarDtlStore()

  const {selectedProject} = useProjectStore();

  const { resourceValueId } = useParams();


  useEffect(()=>{
    //console.log(projectsEtebar)
    if(!more)
    {
      getByProjectId(projectId)
    }
    if (more && selectedProject!==null && selectedProject.city?.id!==null && selectedProject.city?.id!==undefined)
    {
      getByProjectIdAndResourceValueId(projectId,resourceValueId)
    }
    getSum()
  },[projectsEtebar]) 


  return (
    <>
      {!more 
        ? <ProjectEtebarTable  projectsEtebar={projectsEtebar}/> //show just etebar
        : <ProjectEtebarDtlTable projectEtebarDtls={projectEtebarDtls} mode={mode} /> //show etebar + details in a resource
      }
    </>
)}

export default ProjectsEtebarListTable
