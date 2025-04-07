import { useCitiesStore } from "../../../store/citiesStore"
import { useResourcesStore } from "../../../store/resourcesStore"
import Button from "../../UI/Button"
import LookupDropdown from "../../UI/LookupDropdown"
import Textbox from "../../UI/TextBox"

type Props = {
    clear:boolean
    etebarCity:ETEBARCITY
    setEtebarCity: React.Dispatch<React.SetStateAction<ETEBARCITY>>
    handleClick: (e: React.FormEvent) => Promise<void>
    handleCancelClick:()=>void
}

const EtebarCityForm = ({clear ,//etebarBarnamehId ,
    etebarCity, setEtebarCity, handleClick, handleCancelClick}: Props) => {

    const {cities} = useCitiesStore()
    const {resources} = useResourcesStore()

    const handlePropertySet = (property: keyof ETEBARCITYWithoutId, value:unknown,
    ) => 
    {  
        setEtebarCity(prev  => ({  
            ...prev, 
            [property]: value, 
        }));  
        
    }; 
    
    return (
        <div className='w-full flex flex-col p-2 justify-items-center items-center'>
            <div className='w-1/2 flex flex-col p-2 justify-items-center'>
                <LookupDropdown  
                    items={cities?.length>0 ? cities : []}  
                    idKey="id"  
                    nameKey="name" 
                    codeKey="code"
                    onItemSelect={(value)=>handlePropertySet('cityId',value) }
                    searchLabel={'شهرستان'}
                    hasLabel={true}
                    clear={clear}
                    required={true}
                    selected={etebarCity.id!==null ? etebarCity.city : null}
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
                    selected={etebarCity.id!==null ? etebarCity.resource : null}
                />                 
                <Textbox  
                    label="اعتبار"  
                    value={etebarCity.validity===null ? 0 : etebarCity.validity}  
                    type="text"  
                    onChange={(e) => handlePropertySet('validity', +e.target.value)}
                    placeholder="اعتبار را وارد کنید"  
                    required={true}  
                />    
                <div className='flex items-end gap-4 py-4 justify-end'>  
                    <Button  
                        label={etebarCity.id!==null ? 'ویرایش' : 'ثبت'}  
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

export default EtebarCityForm