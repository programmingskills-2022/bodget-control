import ResourceValue from './ResourceValue'
import { useProjectStore } from '../store/projectsStore'
import { useContext } from '../contexts/context'

type Props = {
  validitySum: ProjectEtebarSum[]
  validitySumCity: ProjectEtebarSumCity[]
  isaProject:boolean
}

const ResourceValuesTable = ({validitySum,validitySumCity,isaProject}: Props) => {
  const {selectedProject}= useProjectStore();
  const {citySearch}=useContext();

  return (
    <div className='flex flex-col justify-center items-center gap-2' >
    <div className='flex flex-row'>
        {validitySum?.length && validitySum.map((sum,index) => ( 
          <ResourceValue key={index} resourceValue={sum.resourceName} warning={false} hasLabel={true}/>
          
        ))}            
    </div>
    <div className='flex flex-row'>
      {validitySum?.length && validitySum.map((sum,index) => ( 
          <ResourceValue key={index} resourceValue={sum.initialValue} warning={false} hasLabel={false}/>
        ))}
    </div>  
    <div className='flex flex-row'>
      {validitySum?.length && validitySum.map((sum,index) => ( 
          sum.validitySum === sum.initialValue 
            ?
            <ResourceValue key={index} resourceValue={sum.validitySum} warning={false} hasLabel={false}/>
            :
            <ResourceValue key={index} resourceValue={sum.validitySum} warning={true} hasLabel={false}/>       
      ))}  
    </div>
    <div className='flex flex-row'>
      {validitySum?.length && validitySum.map((sum,index) => ( 
            <ResourceValue key={index} resourceValue={sum.difference} warning={false} hasLabel={false}/>          
        ))}
    </div> 
    {isaProject && selectedProject!==null && selectedProject.city!==null && validitySumCity!==undefined && validitySumCity.length>0 && 
    <div className='flex flex-row'>
      {validitySumCity?.map((sumCity,index) => ( 
            <ResourceValue key={index} resourceValue={sumCity.validitySum} warning={false} hasLabel={false}/>
      ))}  
    </div>}

    {citySearch!==null && !isaProject && validitySumCity!==undefined && validitySumCity.length>0 && 
    <div className='flex flex-row'>
      {validitySumCity?.map((sumCity,index) => ( 
            <ResourceValue key={index} resourceValue={sumCity.validitySum} warning={false} hasLabel={false}/>
      ))}  
    </div>}

  </div>

  )
}

export default ResourceValuesTable