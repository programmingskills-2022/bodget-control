import React, { useEffect } from 'react'
import { convertToFarsiDigits } from '../../general/Functions'
import { useResourceValuesStore } from '../../store/resourceValuesStore'

type Props = {
    project:ProjectEtebarList
}

const RpProject = React.forwardRef<HTMLTableRowElement, Props>(({ project }: Props, ref)=> {

    const {resourcesJust,getResourcesJust}=useResourceValuesStore();

    useEffect(()=>{
        getResourcesJust(false)
      },[])

    const projectBody= (
    <>
        <td className="p-2 cursor-pointer"> {convertToFarsiDigits(project.projectCode)}</td>  
        <td className="p-2 cursor-pointer"> {project.projectName}</td>  
        <td className="p-2 cursor-pointer"> {project.organName}</td>  
        <td className="p-2 cursor-pointer"> {project.faslName}</td>  
        <td className="p-2 cursor-pointer"> {project.barnamehName}</td>  
        <td className="p-2 cursor-pointer"> {project.tarhName}</td>  
        <td className="p-2 cursor-pointer"> {project.cityName}</td>  
        {
            resourcesJust.map((r)=>
                <th className="p-2 border-b border-r text-purple-700">{convertToFarsiDigits(project.properties[r.name])}</th>
            )
        }     
    </>
                       
  )

  const classname='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-custom-hover' 
  //console.log('ref',ref)
  const content =ref
    ? <tr ref={ref || null} className={classname} key={project.projectId} >
        {projectBody}
      </tr>
    : <tr className={classname} key={project.projectId}>{projectBody}  </tr>

  return content
})

export default RpProject