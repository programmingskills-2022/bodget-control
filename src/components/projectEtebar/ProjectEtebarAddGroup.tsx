
import ResourceValues from '../ResourceValues'
import { useContext } from '../../contexts/context';
import ProjectSearch from '../project/ProjectSearch';
import ProjectsListTable from '../project/ProjectsListTable';
import React, { Suspense, useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import Button from '../UI/Button';
import { useProjectsEtebarStore } from '../../store/projectsEtebar';
import { useProjectStore } from '../../store/projectsStore';
import { convertToFarsiDigits, handleMessage } from '../../general/Functions';
import Modal from '../UI/Modal';
import ProjectEtebarAddFormItems from './ProjectEtebarAddFormItems';
import { useProjectsEtebarDtlStore } from '../../store/projectsEtebarDtl';

const ProjectEtebarAddGroup = (
) => {
  const {menuItems
  } = useContext();

  const [clear,setClear] = useState(false)
  const {loginInfo} = useAuthStore();

  const {
    add,update,getByResourceValueId,projectsEtebarInAResource
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

   const { getAllProjects,totalCount ,allProjects} = useProjectStore();
    const { citySearch, organOstanSearch, faslSearch, barnamehSearch, employeeSearch, projectCode } = useContext();

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

  useEffect(()=>{
    if (newProjectEtebar.resourceValueId!==null) getByResourceValueId(newProjectEtebar.resourceValueId)
  },[newProjectEtebar.resourceValueId])
  
  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {  
    try {  
        e.preventDefault(); 
        if (newProjectEtebarDtl.periodId===null || 
          newProjectEtebar.resourceValueId===null
        )
        {
          handleMessage(setSuccessMessage,setModalOpen,'منبع یا دوره انتخاب نشده است.')
          return 
        }
        if (loginInfo?.user?.id===undefined || loginInfo.user.id===null)
        {
          handleMessage(setSuccessMessage,setModalOpen,'خطایی رخ داده است لطفا مجددا به نرم افزار وارد شوید.')
          return
        } 
        if (totalCount===0) 
        {
          handleMessage(setSuccessMessage,setModalOpen,'پروژه ای انتخاب نشده است.')
          return
        }      
        //aquire all project etebar from a special resource
        allProjects.map(async (project:Project)=>
        {
          const existingProjectsEtebar = projectsEtebarInAResource.find(per=>per.projectId==project.id)
          if (existingProjectsEtebar===undefined)//no etebar record found
          {
            //add etebar
            const newPE = await add({  
            ...newProjectEtebar,  
            projectId: project.id,  
            })          
            //add etebar detail
            addDetail({
              ...newProjectEtebarDtl,
              validity:newProjectEtebar.validity,
              projectEtebarId:newPE.id,
            })              
          }
          else{
            //update existing etebar
            const updatePE= await update(existingProjectsEtebar.id as string,{  
              ...newProjectEtebar,
              projectId:project.id,
            })
            //add etebar detail
            addDetail({
              ...newProjectEtebarDtl,
              projectEtebarId:updatePE.id,
              validity:newProjectEtebar.validity,
            })
          }
        })
           
        setClear(false)
        handleMessage(setSuccessMessage,setModalOpen,`اعتبار مورد نظر برای ${convertToFarsiDigits(totalCount)}  پروژه با موفقیت ثبت شد`)
      } catch (error) {  
        console.log(error)
    }  
    refreshPage() 
  }

  return (
      <div className='flex'>        
          <div className="flex-1 container mx-auto p-4">  
            <header className="flex justify-between items-center mb-6 border-indigo-300 pb-4">  
              <h1 className="text-2xl font-bold text-gray-700">{`${menuItems.menuItems[menuItems.selectedIndex].parentLabel}/${menuItems.menuItems[menuItems.selectedIndex].childrenItems[0].label}`}</h1>  
            </header>  
            {/* show resource values */}
            <ResourceValues isaProject={false} isEtebar={true} />
            {/* show project lists */}    
            <ProjectSearch justCitySearch={false}/>
          
            <div className="mt-4 w-full flex flex-col justify-between relative overflow-x-auto shadow-md sm:rounded-lg">    
              <form onSubmit={handleAdd} className="p-2 flex-row justify-items-center">  
                <ProjectEtebarAddFormItems newProjectEtebar={newProjectEtebar}
                                          setNewProjectEtebar={setNewProjectEtebar}
                                          newProjectEtebarDtl={newProjectEtebarDtl}
                                          setNewProjectEtebarDtl={setNewProjectEtebarDtl}
                                          clear={clear}
                                          includeComments={true}
                />
                <div className='w-full flex justify-end'>  
                <Button  
                label="ثبت"  
                type={'submit'}
                variant={'m-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 w-32'}   
                />   
                <Button  
                label="بازگشت"  
                exit={true}  
                variant={'m-4 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:text-blue-700 w-32'} 
                />   
                </div>           
              </form>  
              
              <Suspense fallback={<div className='w-full flex' >بارگزاری پروژه ها...</div>}>  
                <ProjectsListTable 
                  etebar={true}
                  isGroup={true}
                  //isEdit={false} 
                />   
              </Suspense>
            </div> 
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} message={successMessage} /> 
          </div>
      </div>



  )
}

export default ProjectEtebarAddGroup