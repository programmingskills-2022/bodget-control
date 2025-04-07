import { useResourcesStore } from "../../../store/resourcesStore"
import Button from "../../UI/Button"
import LookupDropdown from "../../UI/LookupDropdown"
import Textbox from "../../UI/TextBox"

type Props = {
    clear:boolean
    resourceValue:RESOURCEVALUE
    setResourceValue: React.Dispatch<React.SetStateAction<RESOURCEVALUE>>
    handleClick: (e: React.FormEvent) => Promise<void>
    handleCancelClick:()=>void
}

const EtebarResourceForm = ({clear , resourceValue, setResourceValue, handleClick, handleCancelClick}: Props) => {

    const {resources} = useResourcesStore()

    const handlePropertySet = (property: keyof RESOURCEVALUEWithoutId, value:unknown,
    ) => 
    {  
        setResourceValue(prev  => ({  
            ...prev, 
            [property]: value
        }));  
        
    }; 
  
    return (
        <div className='w-full flex flex-col p-2 justify-items-center items-center'>
            <div className='w-1/2 flex flex-col p-2 justify-items-center'>
                <LookupDropdown  
                    items={resources?.length>0 ? resources : []}  
                    idKey="id"  
                    nameKey="viewName" 
                    codeKey="code"
                    onItemSelect={(value)=>handlePropertySet('resourceId',value) }
                    searchLabel={'منبع'}
                    hasLabel={true}
                    clear={clear}
                    required={true}
                    selected={resourceValue.id!==null ? resourceValue.resource : null}
                />                      
                <Textbox  
                    label="اعتبار"  
                    value={resourceValue.value===null ? 0 : resourceValue.value}  
                    type="text"  
                    onChange={(e) => handlePropertySet('value', +e.target.value)}
                    placeholder="اعتبار را وارد کنید"  
                    required={true}  
                />    
                <div className='flex items-end gap-4 py-4 justify-end'>  
                    <Button  
                        label={resourceValue.id!==null ? 'ویرایش' : 'ثبت'}  
                        onClick={handleClick}
                        variant={'bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 w-32'}   
                    />   
                    <Button  
                        label="انصراف"  
                        onClick={handleCancelClick}
                        variant={'bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:text-blue-700 w-32'} 
                    />   
                    <Button  
                        label="بازگشت"  
                        exit={true}  
                        variant={'bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:text-blue-700 w-32'} 
                    />   
                </div>               
            </div>            
        </div>
    )
}

export default EtebarResourceForm