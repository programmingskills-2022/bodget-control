import React, { useEffect } from 'react'
import LookupDropdown from '../UI/LookupDropdown'
import Textbox from '../UI/TextBox'
import { usePeriodsStore } from '../../store/periodsStore'
import { useResourceValuesStore } from '../../store/resourceValuesStore'
import { useProjectsEtebarStore } from '../../store/projectsEtebar'

type Props = {
    newProjectEtebar:ProjectEtebarWithoutId
    setNewProjectEtebar: React.Dispatch<React.SetStateAction<ProjectEtebarWithoutId>>
    newProjectEtebarDtl:ProjectEtebarDtlWithoutId
    setNewProjectEtebarDtl: React.Dispatch<React.SetStateAction<ProjectEtebarDtlWithoutId>>
    clear:boolean
    includeComments:boolean
}

const ProjectEtebarAddFormItems = ({newProjectEtebar, setNewProjectEtebar,newProjectEtebarDtl, setNewProjectEtebarDtl,clear,includeComments}: Props) => {
        const {periods,getPeriods}=usePeriodsStore()
        const {projectsEtebar}=useProjectsEtebarStore()
        const {resourcesJust,getResourcesJust}=useResourceValuesStore()
        const handleEtebarPropertySet = (property: keyof ProjectEtebarWithoutId, value:unknown,
        ) => 
        {  
            setNewProjectEtebar(prev  => ({  
                ...prev, 
                [property]: value, 
            }));  
            
        };    
        const handleEtebarDtlPropertySet = (property: keyof ProjectEtebarDtlWithoutId, value:unknown,
        ) => 
        {  
            setNewProjectEtebarDtl(prev  => ({  
                ...prev, 
                [property]: value, 
            }));  
            
        };    
        useEffect(()=>{
            getResourcesJust(true)
            getPeriods(true)
        },[] )

        useEffect(() => {       
            const projectEtebar = projectsEtebar?.find(pd => pd.resourceValueId === newProjectEtebar.resourceValueId);  // پیدا کردن اعتبار قبلی ثبت شده از آن منبع برای پیش فرض      
            if (projectEtebar)
                handleEtebarPropertySet('validity',projectEtebar.validity)
            else
                handleEtebarPropertySet('validity',0)
    
         }, [newProjectEtebar.resourceValueId]); 
              
  return (
    <div className='w-full flex flex-col gap-2'>
        <div className='flex justify-between gap-4'>
            <LookupDropdown  
                items={periods?.length>0 ? periods : []}  
                idKey="id"  
                nameKey="name" 
                codeKey="code"
                onItemSelect={(value)=>handleEtebarDtlPropertySet('periodId',value) }
                searchLabel={'دوره'}
                hasLabel={true}
                clear={clear}
                required={true}
            />      
            <LookupDropdown  
                items={resourcesJust?.length>0 ? resourcesJust : []}  
                idKey="id"  
                nameKey="name" 
                codeKey="code"
                onItemSelect={(value)=>handleEtebarPropertySet('resourceValueId',value) }
                searchLabel={'منبع'}
                hasLabel={true}
                clear={clear}
                required={true}
            />      
        </div>
             
        { includeComments && <div className=' flex justify-between gap-4'>
            <Textbox  
                    label="اعتبار"  
                    value={newProjectEtebar.validity===null ? 0 : newProjectEtebar.validity}  
                    type="text"  
                    onChange={(e) => handleEtebarPropertySet('validity', e.target.value)}
                    placeholder="اعتبار را وارد کنید"  
                    required={true}  
            />            
            <Textbox  
                    label="توضیحات"  
                    value={newProjectEtebarDtl.description===null ? 0 : newProjectEtebarDtl.description}  
                    type="text"  
                    onChange={(e) => handleEtebarDtlPropertySet('description', e.target.value)}
                    placeholder="توضیحات را وارد کنید"  
                    required={true}  
            />  
            <Textbox  
                    label="نظر کارشناسی"  
                    value={newProjectEtebarDtl.expertComment===null ? 0 : newProjectEtebarDtl.expertComment}  
                    type="text"  
                    onChange={(e) => handleEtebarDtlPropertySet('expertComment', e.target.value)}
                    placeholder="نظر کارشناسی را وارد کنید"   
                    required={true}  
            />  
            <Textbox  
                    label="توضیحات 2"  
                    value={newProjectEtebarDtl.notification===null ? 0 : newProjectEtebarDtl.notification}  
                    type="text"  
                    onChange={(e) => handleEtebarDtlPropertySet('notification', e.target.value)}
                    placeholder="توضیحات 2 را وارد کنید"  
                    required={true}  
            /> 
        </div>}
    </div>
  )
}

export default ProjectEtebarAddFormItems