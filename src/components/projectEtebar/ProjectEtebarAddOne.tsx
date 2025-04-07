
import ResourceValues from '../ResourceValues'
import { useContext } from '../../contexts/context';
import ProjectSearch from '../project/ProjectSearch';
import ProjectsListTable from '../project/ProjectsListTable';
import  { Suspense, useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useProjectsEtebarStore } from '../../store/projectsEtebar';
import { useProjectStore } from '../../store/projectsStore';
import { handleMessage } from '../../general/Functions';
import Modal from '../UI/Modal';
import ProjectEtebarAddFormItems from './ProjectEtebarAddFormItems';
import { useProjectsEtebarDtlStore } from '../../store/projectsEtebarDtl';

const ProjectEtebarAddOne = () => {
  
  
  const {menuItems
  } = useContext();

  const [clear,setClear] = useState(false)
  const {loginInfo} = useAuthStore();

  const {
    add,update,projectsEtebar,getByProjectId
   }=useProjectsEtebarStore()

   const {addDetail}=useProjectsEtebarDtlStore()

  const [newProjectEtebar, setNewProjectEtebar] = useState<ProjectEtebarWithoutId>(
    {  
      projectId: null,
      resourceValueId: null, 
      validity: 0, 
  }); 
  const [newProjectEtebarDtl, setNewProjectEtebarDtl] = useState<ProjectEtebarDtlWithoutId>(
    { 
      projectEtebarId:null, 
      periodId: null,
      userId:loginInfo?.user?.id===undefined ? null : loginInfo.user.id,
      validity: 0, 
      description: '', 
      expertComment: '',  
      shoraNeed:false,
      notification: '' 
  }); 

  const [isModalOpen, setModalOpen] = useState(false);  
  const [successMessage, setSuccessMessage] = useState('');  

   const { getAllProjects } = useProjectStore();
    const { citySearch, organOstanSearch, faslSearch, barnamehSearch, employeeSearch, projectCode } = useContext();
    const [validityMap, setValidityMap] = useState<{ [key: string]: {validity:number,expertComment:string} }>({}); 

  const refreshPage=()=>{
    setClear(true)
    setNewProjectEtebar(prev=>({...prev,
          projectId:null,
          validity: 0, 
        })
    )
    setNewProjectEtebarDtl(prev=>({...prev,
      projectEtebarId:null, 
      validity: 0, 
      description: '', 
      expertComment: '',  
      shoraNeed:false,
      notification: ''         
    }))
  }

  useEffect(()=>{ 
    getAllProjects(1, citySearch , organOstanSearch, faslSearch, barnamehSearch, !loginInfo?.user?.unlimited ? loginInfo?.user?.employee.id : employeeSearch!==null ? employeeSearch : '', projectCode)
  },[citySearch, organOstanSearch, faslSearch, barnamehSearch, employeeSearch, projectCode])

//add a new etebar
  const handleAdd = async (project: Project|ProjectWithResource|null) => {
    const projectId=project?.id
    if (project!==null && projectId!==undefined)   
    if (projectId!==null)
    try {  
        if (newProjectEtebarDtl.periodId===null || 
            newProjectEtebar.resourceValueId===null
        )
        {
          handleMessage(setSuccessMessage,setModalOpen,'منبع یا دوره انتخاب  نشده است.')
          return 
        }
        if (loginInfo?.user?.id===undefined || loginInfo.user.id===null)
        {
          handleMessage(setSuccessMessage,setModalOpen,'خطایی رخ داده است لطفا مجددا به نرم افزار وارد شوید.')
          return
        } 
        if (validityMap[projectId].validity===0) 
        {
          handleMessage(setSuccessMessage,setModalOpen,'اعتبار صفر می باشد')
          return
        }      
        const existingProjectsEtebar=projectsEtebar.find(pe=>pe.resourceValueId===newProjectEtebar.resourceValueId)
        if (existingProjectsEtebar===undefined)//no etebar record found
        {
          //add etebar
          const newPE = await add({  
            ...newProjectEtebar,        
            projectId,
            validity: validityMap[projectId].validity, 
          } )          
          //add etebar detail
          addDetail({
            ...newProjectEtebarDtl,
            projectEtebarId:newPE.id,
            expertComment:validityMap[projectId].expertComment,
            validity:validityMap[projectId].validity, 
          })
        }
        else{
          //update existing etebar
          const updatePE= await update(existingProjectsEtebar.id as string,{  
            ...newProjectEtebar,
            projectId,
            validity: validityMap[projectId].validity, 
          })
          //add etebar detail
          addDetail({
            ...newProjectEtebarDtl,
            projectEtebarId:updatePE.id,
            expertComment:validityMap[projectId].expertComment,
            validity:validityMap[projectId].validity, 
          })
        }
        getByProjectId(projectId)
        setClear(false)
        handleMessage(setSuccessMessage,setModalOpen,`اعتبار مورد نظر پروژه با موفقیت ثبت شد`)
      } catch (error) {  
        console.log(error)
    }  
    refreshPage() 
  }

  return (
      <div className='flex'>        
          <div className="flex-1 container mx-auto p-4">  
            <header className="flex justify-between items-center mb-6 border-indigo-300 pb-4">  
              <h1 className="text-2xl font-bold text-gray-700">{`${menuItems[2].parentLabel}/${menuItems[2].childrenItems[1].label}`}</h1>  
            </header>  
            {/* show resource values */}
            <ResourceValues isaProject={false} isEtebar={true}/>
            {/* show project lists */}    
            <ProjectSearch justCitySearch={false}/>
          
            <div className="mt-4 w-full flex flex-col justify-between relative overflow-x-auto shadow-md sm:rounded-lg">    
              <ProjectEtebarAddFormItems newProjectEtebar={newProjectEtebar}
                                            setNewProjectEtebar={setNewProjectEtebar}
                                            newProjectEtebarDtl={newProjectEtebarDtl}
                                            setNewProjectEtebarDtl={setNewProjectEtebarDtl}
                                            clear={clear}
                                            includeComments={false}
                                            />
              
              <Suspense fallback={<div className='w-full flex' >بارگزاری پروژه ها...</div>}>  
                <ProjectsListTable 
                  etebar={true}
                  isGroup={false}
                  //isEdit={false} 
                  validityMap={validityMap}
                  setValidityMap={setValidityMap}
                  handleAdd={handleAdd}
                />   
              </Suspense>
            </div> 
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} message={successMessage} /> 
          </div>
      </div>



  )
}

export default ProjectEtebarAddOne