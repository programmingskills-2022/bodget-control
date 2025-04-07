

import { useEffect } from 'react';
import { useProjectsEtebarStore } from '../store/projectsEtebar';
import Card from './UI/Card';
import { useParams } from 'react-router-dom';
import { useProjectStore } from '../store/projectsStore';
import { useContext } from '../contexts/context';
import { useProjectsTakhsisStore } from '../store/projectsTakhsis';
import ResourceValuesTable from './ResourceValuesTable';
import { useCitiesStore } from '../store/citiesStore';


type Props = {
  isaProject:boolean,
  isEtebar:boolean,
  periodId?:string // that's just for takhsis
}
const ResourceValues = ({isaProject, isEtebar,periodId
  }:Props) => {
    const { projectId } = useParams();
    const { projectsEtebar,projectsEtebarSum, getSum , getSumCity, projectsEtebarSumCity} = useProjectsEtebarStore(); 
    const { projectsTakhsis,projectsTakhsisSum,getSumTakhsis,getSumTakhsisCity,projectsTakhsisSumCity}=useProjectsTakhsisStore();
    const {selectedProject,getById}= useProjectStore();
    const {citySearch}=useContext();
    const {cities} =useCitiesStore();

    useEffect(()=>{
      if (projectId!==undefined) 
        getById(projectId)
    },[projectId])
    
//--------------------------------------------------------------------
    useEffect(()=>{
      if (isEtebar) // if it must show etebar sum table
      {
        getSum()
        if (selectedProject!==null && selectedProject.city?.id!==undefined ) 
          getSumCity(selectedProject.city.id)      
      }
      else{
        getSumTakhsis(periodId)
        if (selectedProject!==null && selectedProject.city?.id!==undefined ) 
          getSumTakhsisCity(selectedProject.city.id)    
      }

    },[selectedProject,periodId,projectsEtebar,projectsTakhsis]) 
//-------------------------------------------------------------------
    useEffect(()=>{
      if (isEtebar && citySearch!=null && !isaProject)
        getSumCity(citySearch as GUID) 
      else if (!isEtebar && citySearch!=null && !isaProject)
        getSumTakhsisCity(citySearch as GUID) 
    },[citySearch]) 

  return (

    ((isEtebar && projectsEtebarSum?.length!==0) || (!isEtebar && projectsTakhsisSum?.length!==0))
     &&
    <Card fontStyles='justify-center flex-row w-full'>
        <div className='flex flex-col  justify-evenly place-items-end w-25'>
          <p className='font-bold text-center text-purple-800 h-16'></p>
          <p className='font-bold text-center px-2 text-sm text-purple-800'>
            {
              isEtebar ?' اعتبار' : ' تخصیص'
            } ابلاغی            
          </p>
          <p className='font-bold text-center px-2 text-xs text-purple-800'>
            {
              isEtebar ?' اعتبار' : ' تخصیص'
            } توزیع شده            
          </p>
          <p className='font-bold text-center px-2 text-sm text-purple-800'>
            {
              isEtebar ?' مانده اعتبار' : ' مانده'
            } 
          </p>
          {(isaProject && selectedProject!==null && selectedProject.city!==null &&  projectsEtebarSumCity?.length!==0) //for just one project
          && 
          <p className='font-bold text-center px-2 text-sm text-purple-800'>
            {
              isEtebar ?' اعتبار' : ' تخصیص'
            } شهرستان {selectedProject.city.name}  
          </p>}
          
          {(citySearch!==null && !isaProject) // for all projects in a special financial year
          && 
          <p className='font-bold text-center  text-xs text-purple-800 w-20 h-4'>
                        {
              isEtebar ?'اعتبار شهرستان' : 'تخصیص شهرستان'
            } {cities.find(c=>c.id===citySearch)?.name}  
          </p>
          }
        </div>

        <ResourceValuesTable 
          validitySum={isEtebar ? projectsEtebarSum : projectsTakhsisSum}
          validitySumCity = {isEtebar ? projectsEtebarSumCity : projectsTakhsisSumCity}
          isaProject={isaProject}
        />

      </Card> 
          
  )
}

export default ResourceValues
