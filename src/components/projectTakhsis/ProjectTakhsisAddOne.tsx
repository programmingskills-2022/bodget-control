
import ResourceValues from '../ResourceValues'
import { useContext } from '../../contexts/context';
import ProjectSearch from '../project/ProjectSearch';
import  { Suspense, useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import Modal from '../UI/Modal';
import ProjectTakhsisAddFormItems from './ProjectTakhsisAddFormItems';
import { useProjectsTakhsisStore } from '../../store/projectsTakhsis';
import { handleMessage } from '../../general/Functions';
import { useResourceValuesStore } from '../../store/resourceValuesStore';
import { usePeriodsStore } from '../../store/periodsStore';
import ProjectsEtebarTable from '../projectEtebar/ProjectsEtebarTable';

const ProjectTakhsisAddOne = (
) => {
  const {menuItems
  } = useContext();

  const [clear,setClear] = useState(false)
  const {loginInfo} = useAuthStore();

  const {
    add,update,projectsTakhsis,getAll
   }=useProjectsTakhsisStore()

  const {periodSearch,resourceValueSearch,setResourceValueSearch}=useContext()

  const [newProjectTakhsis, setNewProjectTakhsis] = useState<ProjectEtebarWithoutId>(
    {  
      projectId: null,
      resourceValueId: resourceValueSearch as GUID, 
      validity: 0, 
  }); 

  const [isModalOpen, setModalOpen] = useState(false);  
  const [successMessage, setSuccessMessage] = useState('');  
  const {getPeriods}=usePeriodsStore()
  const {getResourcesJust
    ,getResourceValues
    ,resourceValues,emptyResourcesJust}=useResourceValuesStore()
  const [validityMap, setValidityMap] = useState<{ [key: string]: {validity:number,expertComment:string} }>({}); 
  const [resourceValueId,setResourceValueId]=useState<string|null>('')

  useEffect(()=>{
    getPeriods(false)    
    getResourceValues()
    getAll()
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
//----------------------------------------------------------------------------------------------------
  const refreshPage=()=>{
    //setClear(true)
    setNewProjectTakhsis(prev=>({...prev,
          projectId: null,
          validity: 0, 
        })
    )
  }

//------------------------------------ add new takhsis-------------------------------------------
  const handleAdd = async (project:Project|ProjectWithResource|null) => {  
    const projectId=project?.id
    if (project!==null && projectId!==undefined)
    try {  
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
        if (validityMap[projectId].validity===0) 
        {
          handleMessage(setSuccessMessage,setModalOpen,'تخصیص صفر می باشد')
          return
        }      
        if ('resourceVal' in project && project.resourceVal!==null && validityMap[projectId].validity>project.resourceVal) 
          {
            handleMessage(setSuccessMessage,setModalOpen,'تخصیص نمی تواند بیش از اعتبار باشد')
            return
          }  
         const existingProjectTakhsis=projectsTakhsis.find(pe=>pe.projectId===projectId && pe.resourceValueId===newProjectTakhsis.resourceValueId )

         if (existingProjectTakhsis===undefined)//no etebar record found so add new takhsis record
         {    
          add({  
            ...newProjectTakhsis,        
              projectId,
              validity: validityMap[projectId].validity, 
          } )
         }
         else   //update existing takhsis  
         {       
          update(existingProjectTakhsis.id as string,{  
            ...newProjectTakhsis,
            projectId,
            validity: validityMap[projectId].validity, 
          })
         }
         setValidityMap(prev => ({  
          ...prev,  
          [project.id]: {  
            ...prev[project.id], // Preserve existing properties  
            validity: 0 // Fallback to 0 on invalid number  
          },  
        })); 
        handleMessage(setSuccessMessage,setModalOpen,`تخصیص مورد نظر پروژه با موفقیت ثبت شد`)
      } catch (error) {  
        console.log(error)
    }  
    refreshPage() 
  }
//------------------------------------end add new tasis-------------------------------------------
  return (
      <div className='flex '>        
          <div className="flex-1 container mx-auto p-4">  
            <header className="flex justify-between items-center mb-6 border-indigo-300 pb-4">  
              <h1 className="text-2xl font-bold text-gray-700">{`${menuItems[3].parentLabel}/${menuItems[3].childrenItems[1].label}`}</h1>  
            </header>  
            {/* show resource values */}
            <ResourceValues isaProject={false} isEtebar={false}/>
            {/* show project lists */}    
            <ProjectSearch justCitySearch={false}/>
          
            <div className="mt-4 w-full flex flex-col justify-between relative overflow-x-auto shadow-md sm:rounded-lg">    
              <ProjectTakhsisAddFormItems newProjectTakhsis={newProjectTakhsis}
                                            setNewProjectTakhsis={setNewProjectTakhsis}
                                            clear={clear}
                                            //setPeriodId={setPeriodId}
                                            isGroup={false}
                                            />
              {/* <ProjectEtebarCount /> */}

              <Suspense fallback={<div className='w-full flex' >بارگزاری پروژه ها...</div>}>  
              {newProjectTakhsis.resourceValueId!==null &&
              <ProjectsEtebarTable
                  resourceValueId={resourceValueId ?? ''}
                  //TakhsisResourceValueId={newProjectTakhsis.resourceValueId}
                  etebar={false}
                  isGroup={false}
                  //isEdit={false} 
                  validityMap={validityMap}
                  setValidityMap={setValidityMap}
                  handleAdd={handleAdd}
                />   }
              </Suspense>
            </div> 
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} message={successMessage} /> 
          </div>
      </div>



  )
}

export default ProjectTakhsisAddOne