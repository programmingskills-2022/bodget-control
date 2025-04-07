import { useFaslsStore } from "../../../store/faslsStore"
import { useResourcesStore } from "../../../store/resourcesStore"
import Button from "../../UI/Button"
import LookupDropdown from "../../UI/LookupDropdown"
import Textbox from "../../UI/TextBox"

type Props = {
    clear:boolean
    etebarFasl:ETEBARFASL
    setEtebarFasl: React.Dispatch<React.SetStateAction<ETEBARFASL>>
    handleClick: (e: React.FormEvent) => Promise<void>
    handleCancelClick:()=>void
}

const EtebarFaslForm = ({clear , etebarFasl, setEtebarFasl, handleClick, handleCancelClick}: Props) => {

    const {fasls} = useFaslsStore()
    const {resources} = useResourcesStore()

    const handlePropertySet = (property: keyof ETEBARFASLWithoutId, value:unknown,
    ) => 
    {  
        setEtebarFasl(prev  => ({  
            ...prev, 
            [property]: value
        }));  
        
    }; 
  console.log(resources)  
    return (
        <div className='w-full flex flex-col p-2 justify-items-center items-center'>
            <div className='w-1/2 flex flex-col p-2 justify-items-center'>
                <LookupDropdown  
                    items={fasls?.length>0 ? fasls : []}  
                    idKey="id"  
                    nameKey="name" 
                    codeKey="code"
                    onItemSelect={(value)=>handlePropertySet('faslId',value) }
                    searchLabel={'فصل'}
                    hasLabel={true}
                    clear={clear}
                    required={true}
                    selected={etebarFasl.id!==null ? etebarFasl.fasl : null}
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
                    selected={etebarFasl.id!==null ? etebarFasl.resource : null}
                />                      
                <Textbox  
                    label="اعتبار"  
                    value={etebarFasl.validity===null ? 0 : etebarFasl.validity}  
                    type="text"  
                    onChange={(e) => handlePropertySet('validity', +e.target.value)}
                    placeholder="اعتبار را وارد کنید"  
                    required={true}  
                />    
                <div className='flex items-end gap-4 py-4 justify-end'>  
                    <Button  
                        label={etebarFasl.id!==null ? 'ویرایش' : 'ثبت'}  
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

export default EtebarFaslForm