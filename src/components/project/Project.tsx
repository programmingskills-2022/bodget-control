import React from 'react'
import { useProjectStore } from '../../store/projectsStore';
import useProjectTableColumns from '../../hooks/useProjectTableColumns';

type Props = {
    columns:Column[]
    project:Project | ProjectWithResource
    projectsShowEtebar?:ProjectsShowEtebar[]
    setProjectsShowEtebar?:React.Dispatch<React.SetStateAction<ProjectsShowEtebar[]>>
}

const Project = React.forwardRef<HTMLTableRowElement, Props>(({ columns, project,projectsShowEtebar,setProjectsShowEtebar }: Props, ref)=> {


const {
    selectedProject
    } = useProjectStore();

const {toggleEtebarVisibility} = useProjectTableColumns()
  
const projectClick=(projectId:string)=>{
  if(projectsShowEtebar!==undefined && setProjectsShowEtebar!==undefined)
    setProjectsShowEtebar(toggleEtebarVisibility(projectId,projectsShowEtebar)
  )
}

const projectBody= (
      columns.map(  
        (column, index) =>  
          column.visible && (  
            <td key={index} className="p-2 cursor-pointer">  
              {typeof column.accessor === 'function' ? column.accessor(project) : column.accessor}  
            </td>  
          )  
      )
  )  


  const classname=`border-b dark:bg-gray-800 dark:border-gray-700   
      ${selectedProject?.id === project.id ? 'bg-blue-50 text-slate-800'  : 'bg-white text-slate-500' }   
      hover:bg-custom-hover`


  const content =ref
    ? <tr ref={ref || null} className={classname} onClick={() =>projectClick(project.id)}  >
        {projectBody}
      </tr>
    : <tr className={classname} onClick={() =>projectClick(project.id)}>{projectBody}</tr>

  return content
})


export default Project