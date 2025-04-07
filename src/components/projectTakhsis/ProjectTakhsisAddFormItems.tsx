import React, {  useState } from 'react'
import LookupDropdown from '../UI/LookupDropdown'
import Textbox from '../UI/TextBox'
import { usePeriodsStore } from '../../store/periodsStore'
import { useResourceValuesStore } from '../../store/resourceValuesStore'
import { useContext } from '../../contexts/context'

type Props = {
    newProjectTakhsis:ProjectEtebarWithoutId
    setNewProjectTakhsis: React.Dispatch<React.SetStateAction<ProjectEtebarWithoutId>>
    clear:boolean
    isGroup:boolean
}

const ProjectTakhsisAddFormItems = ({newProjectTakhsis, setNewProjectTakhsis,clear,isGroup}: Props) => {
    const {periods,}=usePeriodsStore()
    const {resourcesJust,}=useResourceValuesStore()
    const [isHovered, setIsHovered] = useState(false);  
    const {periodSearch,setPeriodSearch,resourceValueSearch,setResourceValueSearch,handleSelect}=useContext()

//----------------------------------handlePropertySet-----------------------------------------------    
    const handlePropertySet = (property: keyof ProjectEtebarWithoutId, value:unknown,
    ) => 
    {  
        setNewProjectTakhsis(prev  => ({  
            ...prev, 
            [property]: value, 
        }));  
        //console.log('handlePropertySet',value)
    };  
           
  return (
    <div className={`w-full flex flex-col gap-2`}>
        <div className={`flex justify-between gap-4 ${isHovered ? 'overflow-y-auto h-72' : ''}`}
        onMouseEnter={() => setIsHovered(true)}  
        onMouseLeave={() => setIsHovered(false)}  >
            <LookupDropdown  
                  items={periods?.length>0 ? periods : []}  
                  idKey="id"  
                  nameKey="name" 
                  codeKey="code"
                  onItemSelect={(value)=>{setPeriodSearch(value as string)
                    ;handlePropertySet('resourceValueId',null)
                    }
                  }
                  searchLabel={'دوره'}
                  hasLabel={true}
                  clear={false}
                  required={true}
                  selected={periodSearch ? periods.find(p=>p.id===periodSearch) : null}
              />     
            <LookupDropdown  
                items={resourcesJust?.length>0 ? resourcesJust : []}  
                idKey="id"  
                nameKey="name" 
                codeKey="code"
                onItemSelect={(value)=>{handlePropertySet('resourceValueId',value);handleSelect(value,setResourceValueSearch) }}
                searchLabel={'منبع'}
                hasLabel={true}
                clear={clear}
                required={true}
                selected={resourceValueSearch ? resourcesJust.find(r=>r.id===resourceValueSearch) : null}
            />      
        </div>
             
        { isGroup && <div className='w-1/5 flex justify-between gap-4'>
            <Textbox  
                    label="تخصیص"  
                    value={newProjectTakhsis.validity===null ? 0 : newProjectTakhsis.validity}  
                    type="text"  
                    onChange={(e) => handlePropertySet('validity', e.target.value)}
                    placeholder="تخصیص را وارد کنید"  
                    required={true}  
            />            
        </div>}
    </div>
  )
}

export default ProjectTakhsisAddFormItems