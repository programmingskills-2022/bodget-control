
import ResourceValues from '../ResourceValues'
import { useContext } from '../../contexts/context';
import ProjectSearch from '../project/ProjectSearch';
import React, { Suspense, useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import Button from '../UI/Button';
import { convertToFarsiDigits, handleMessage } from '../../general/Functions';
import Modal from '../UI/Modal';
import ProjectTakhsisAddFormItems from './ProjectTakhsisAddFormItems';
import { useProjectsTakhsisStore } from '../../store/projectsTakhsis';
import { usePeriodsStore } from '../../store/periodsStore';
import { useResourceValuesStore } from '../../store/resourceValuesStore';
import { useProjectsEtebarStore } from '../../store/projectsEtebar';
import ProjectsEtebarTable from '../projectEtebar/ProjectsEtebarTable';

const ProjectTakhsisAddGroup = (
) => {
  const {menuItems
  } = useContext();

  const [clear,setClear] = useState(false)
  const {loginInfo} = useAuthStore();

  const {
    add,update,projectsTakhsis,getAll
   }=useProjectsTakhsisStore()

  const {getAllProjectsWithAnEtebarResource,allProjectsWithAnEtebarResource}=useProjectsEtebarStore()

  const [isModalOpen, setModalOpen] = useState(false);  
  const [successMessage, setSuccessMessage] = useState('');  

  const {getPeriods}=usePeriodsStore()
  const {getResourcesJust
    ,getResourceValues
    ,resourceValues,emptyResourcesJust}=useResourceValuesStore()
  const { citySearch, organOstanSearch, faslSearch, barnamehSearch, employeeSearch, projectCode,resourceValueSearch,setResourceValueSearch,periodSearch} = useContext();
  const [resourceValueId,setResourceValueId]=useState<string|null>('')

  const [newProjectTakhsis, setNewProjectTakhsis] = useState<ProjectEtebarWithoutId>(
    {  
      projectId: null,
      resourceValueId: resourceValueSearch as GUID, 
      validity: 0, 
  }); 

  useEffect(()=>{
    getPeriods(false)
  },[] )

  useEffect(()=>{
    console.log('peroidId',periodSearch,!clear)

    if(periodSearch===null)
    {
      setResourceValueSearch(null)
      setNewProjectTakhsis(prev=>({...prev,
        resourceValueId:null
      }))
      emptyResourcesJust()
    }

    if (periodSearch!==null && periodSearch!==undefined ) 
      getResourcesJust(false,periodSearch as string)
    
    setClear(true)

  },[periodSearch])


  useEffect(()=>{
    setClear(false)
  },[resourceValueSearch])

  useEffect(()=>{
    const resourceValue =resourceValues.find(rv=>rv.id==resourceValueSearch);
    const rv=resourceValues.filter(rv=>rv.resource?.id==resourceValue?.resource?.id && rv.period==null) 
    if (rv.length>0) setResourceValueId(rv[0].id )

  },[resourceValueSearch])

  useEffect(()=>{
    getResourceValues()
    getAll()
  },[])

  useEffect(()=>{
    console.log(resourceValues)
    const resourceValue =resourceValues.find(rv=>rv.id==resourceValueSearch);
    const rv=resourceValues.filter(rv=>rv.resource?.id==resourceValue?.resource?.id && rv.period==null) 
    if (rv.length>0) setResourceValueId(rv[0].id )
  },[resourceValueSearch])

  const refreshPage=()=>{

    setNewProjectTakhsis(prev=>({...prev,
      projectId: null,
      validity: 0, 
    })
    )
  }

  useEffect(()=>{
    if (resourceValueSearch && resourceValueId!==null)
      getAllProjectsWithAnEtebarResource(1, resourceValueId,resourceValueSearch as string,citySearch , organOstanSearch, faslSearch, barnamehSearch, employeeSearch, projectCode)
  },[citySearch, organOstanSearch, faslSearch, barnamehSearch, employeeSearch, projectCode,resourceValueId,resourceValueSearch])

//------------------------------------ add new takhsis-------------------------------------------
  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {  
    let count=0
    try {  
        e.preventDefault(); 
        if ( newProjectTakhsis.resourceValueId===null )
        {
          handleMessage(setSuccessMessage,setModalOpen,'منبع  انتخاب نشده است.')
          return 
        }
        if (loginInfo?.user?.id===undefined || loginInfo.user.id===null)
        {
          handleMessage(setSuccessMessage,setModalOpen,'خطایی رخ داده است لطفا مجددا به نرم افزار وارد شوید.')
          return
        } 
console.log('allProjectsWithAnEtebarResource',allProjectsWithAnEtebarResource)
       //aquire all project etebar from a special resource
       allProjectsWithAnEtebarResource.map(async (project:Project)=>
        {
          const existingProjectTakhsis=projectsTakhsis.find(pe=>pe.projectId===project.id && pe.resourceValueId===newProjectTakhsis.resourceValueId )

          if (  
            'resourceVal' in project &&  
            project.resourceVal !== null &&  
            project.resourceVal!==undefined &&
            newProjectTakhsis.validity > parseInt(project.resourceVal.toString(), 10)  
          ) {  
            handleMessage(setSuccessMessage, setModalOpen, 'تخصیص نمی تواند بیش از اعتبار باشد'); // Consider using an error message  
            return; // Use return instead of continue in a map  
          }  

          if (existingProjectTakhsis===undefined && newProjectTakhsis.resourceValueId!==null)//no takhsis record found
          {
            //add takhsis
            add({  
            ...newProjectTakhsis,  
            projectId: project.id, 
            })           
            count++
          }
          else if (existingProjectTakhsis!==undefined && newProjectTakhsis.resourceValueId!==null){
            //update existing etebar
            update(existingProjectTakhsis.id as string,{  
              ...newProjectTakhsis,
              projectId:project.id,
            })
            count++
          }
        })

        handleMessage(setSuccessMessage,setModalOpen,`تخصیص مورد نظر برای ${convertToFarsiDigits(count)}  پروژه با موفقیت ثبت شد`)
      } catch (error) {  
        console.log(error)
    }  
    refreshPage() 
  }

  return (
      <div className='flex'>        
          <div className="flex-1 container mx-auto p-4">  
            <header className="flex justify-between items-center mb-6 border-indigo-300 pb-4">  
              <h1 className="text-2xl font-bold text-gray-700">{`${menuItems[3].parentLabel}/${menuItems[3].childrenItems[0].label}`}</h1>  
            </header>  
            {/* show resource values */}
            <ResourceValues isaProject={false} isEtebar={false}/>
            {/* show project lists */}    
            <ProjectSearch justCitySearch={false}/>
          
            <div className="mt-4 w-full flex flex-col justify-between relative overflow-x-auto shadow-md sm:rounded-lg">    
              <form onSubmit={handleAdd} className="p-2 flex-row justify-items-center">  
              <ProjectTakhsisAddFormItems newProjectTakhsis={newProjectTakhsis}
                                            setNewProjectTakhsis={setNewProjectTakhsis}
                                            clear={clear}
                                            //setPeriodId={setPeriodId}
                                            isGroup={true}
                                            />
                <div className='w-full flex justify-end'>  
                <Button  
                label="ثبت"  
                type={'submit'}
                variant={'m-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 w-32'}   
                />   
                <Button  
                label="بازگشت"  
                exit={true}  
                variant={'m-2 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:text-blue-700 w-32'} 
                />   
                </div>           
              </form>  


              <Suspense fallback={<div className='w-full flex' >بارگزاری پروژه ها...</div>}>  
              {newProjectTakhsis.resourceValueId!==null &&
                <ProjectsEtebarTable
                    resourceValueId={resourceValueId ?? ''}
                    //TakhsisResourceValueId={newProjectTakhsis.resourceValueId}
                    etebar={false}
                    isGroup={true}
                  />   }
              </Suspense>
            </div> 
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} message={successMessage} /> 
          </div>
      </div>


  )
}

export default ProjectTakhsisAddGroup

