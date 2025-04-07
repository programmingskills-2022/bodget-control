import { useOrgansOstanStore } from "../../../store/organsOstanStore"
import { useResourcesStore } from "../../../store/resourcesStore"
import Button from "../../UI/Button"
import LookupDropdown from "../../UI/LookupDropdown"
import Textbox from "../../UI/TextBox"

type Props = {
    clear:boolean
    etebarOrganOstan:ETEBARORGANOSTAN
    setEtebarOrganOstan: React.Dispatch<React.SetStateAction<ETEBARORGANOSTAN>>
    handleClick: (e: React.FormEvent) => Promise<void>
    handleCancelClick:()=>void
}

const EtebarOrganOstanForm = ({clear ,//etebarBarnamehId ,
    etebarOrganOstan, setEtebarOrganOstan, handleClick, handleCancelClick}: Props) => {

    const {organsJust} = useOrgansOstanStore()
    const {resources} = useResourcesStore()

    const handlePropertySet = (property: keyof ETEBARORGANOSTAN, value:unknown,
    ) => 
    {  
        setEtebarOrganOstan(prev  => ({  
            ...prev, 
            [property]: value, 
        }));  
        
    }; 
    
    return (
        <div className='w-full flex flex-col p-2 justify-items-center items-center'>
            <div className='w-1/2 flex flex-col p-2 justify-items-center'>
                <LookupDropdown  
                    items={organsJust?.length>0 ? organsJust : []}  
                    idKey="id"  
                    nameKey="name" 
                    codeKey="code"
                    onItemSelect={(value)=>handlePropertySet('organOstanId',value) }
                    searchLabel={'دستگاه'}
                    hasLabel={true}
                    clear={clear}
                    required={true}
                    selected={etebarOrganOstan.id!==null ? etebarOrganOstan.organOstan?.organ : null}
                />   
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
                    selected={etebarOrganOstan.id!==null ? etebarOrganOstan.resource : null}
                />                   
                <Textbox  
                    label="اعتبار"  
                    value={etebarOrganOstan.validity===null ? 0 : etebarOrganOstan.validity}  
                    type="text"  
                    onChange={(e) => handlePropertySet('validity', +e.target.value)}
                    placeholder="اعتبار را وارد کنید"  
                    required={true}  
                />    
                <div className='flex items-end gap-4 py-4 justify-end'>  
                    <Button  
                        label={etebarOrganOstan.id!==null ? 'ویرایش' : 'ثبت'}  
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

export default EtebarOrganOstanForm