import { useFaslsStore } from "../../../store/faslsStore";  
import { useBarnamehsStore } from "../../../store/barnamehsStore";  
import { useResourcesStore } from "../../../store/resourcesStore";  
import Button from "../../UI/Button";  
import LookupDropdown from "../../UI/LookupDropdown";  
import Textbox from "../../UI/TextBox";  
import { useCitiesStore } from "../../../store/citiesStore";
import { useOrgansOstanStore } from "../../../store/organsOstanStore";


type Props = {  
    clear: boolean;  
    etebarDefinition: ETEBARFASL | ETEBARBARNAMEH | ETEBARCITY | ETEBARORGANOSTAN;  
    setEtebarDefinition: React.Dispatch<React.SetStateAction<ETEBARFASL | ETEBARBARNAMEH | ETEBARCITY | ETEBARORGANOSTAN>>;  
    handleClick: (e: React.FormEvent) => Promise<void>;  
    handleCancelClick: () => void;  
    definitionType: DefinationType; // Type of the definition (fasl, barnameh, etc.)  
};  

const EtebarDefinationForm = ({  
    clear,  
    etebarDefinition,  
    setEtebarDefinition,  
    handleClick,  
    handleCancelClick,  
    definitionType,  
}: Props) => {  


    const { fasls } = useFaslsStore();  
    const { barnamehs } = useBarnamehsStore();  
    const { resources } = useResourcesStore(); 
    const {cities} = useCitiesStore() 
    const {organsJust} = useOrgansOstanStore()

    const handlePropertySet = (property: keyof (ETEBARFASLWithoutId | ETEBARBARNAMEHWithoutId | ETEBARCITYWithoutId | ETEBARORGANOSTANWithoutId), value: unknown) => {  
        setEtebarDefinition(prev => ({  
            ...prev,  
            [property]: value,  
        }));  
    };  

    function isEtebarFasl(def: ETEBARFASL | ETEBARBARNAMEH | ETEBARCITY | ETEBARORGANOSTAN): def is ETEBARFASL {  
        return (def as ETEBARFASL).faslId !== undefined;  
    }  
    
    function isEtebarBarnameh(def: ETEBARFASL | ETEBARBARNAMEH | ETEBARCITY | ETEBARORGANOSTAN): def is ETEBARBARNAMEH {  
        return (def as ETEBARBARNAMEH).barnameh !== undefined;  
    }  
    
    function isEtebarCity(def: ETEBARFASL | ETEBARBARNAMEH | ETEBARCITY | ETEBARORGANOSTAN): def is ETEBARCITY {  
        return (def as ETEBARCITY).cityId !== undefined;  
    }  
    
    function isEtebarOrganostan(def: ETEBARFASL | ETEBARBARNAMEH | ETEBARCITY | ETEBARORGANOSTAN): def is ETEBARORGANOSTAN {  
        return (def as ETEBARORGANOSTAN).organOstanId !== undefined;  
    }  
    
    const config = {  
        fasl: {  
            dropdownItems: fasls ,  
            propertyId: 'faslId',  
            searchLabel: 'فصل',  
            selected: isEtebarFasl(etebarDefinition) ? etebarDefinition.fasl : null,  
        },  
        barnameh: {  
            dropdownItems: barnamehs,  
            propertyId: 'barnamehId',  
            searchLabel: 'برنامه',  
            selected: isEtebarBarnameh(etebarDefinition) ? etebarDefinition.barnameh : null,  
        },  
        city: {  
            dropdownItems: cities,  // Replace with actual definitions  
            propertyId: 'cityId',  
            searchLabel: 'شهر',  
            selected: isEtebarCity(etebarDefinition) ? etebarDefinition.city : null,  
        },  
        organOstan: {  
            dropdownItems: organsJust,  // Replace with actual definitions  
            propertyId: 'organOstanId',  
            searchLabel: 'سازمان',  
            selected: isEtebarOrganostan(etebarDefinition) ? etebarDefinition.organOstan?.organ : null,  
        },  
    }[definitionType];  

    return (  
        <div className='w-full flex flex-col p-2 justify-items-center items-center'>  
            <div className='w-1/2 flex flex-col p-2 justify-items-center'>  
                <LookupDropdown  
                    items={config.dropdownItems?.length > 0 ? config.dropdownItems : []}  
                    idKey="id"  
                    nameKey="name"  
                    codeKey="code"  
                    onItemSelect={(value) => handlePropertySet(config.propertyId, value)}  
                    searchLabel={config.searchLabel}  
                    hasLabel={true}  
                    clear={clear}  
                    required={true}  
                    selected={config.selected}  
                />  
                <LookupDropdown  
                    items={resources?.length > 0 ? resources : []}  
                    idKey="id"  
                    nameKey="viewName"  
                    codeKey="code"  
                    onItemSelect={(value) => handlePropertySet('resourceId', value)}  
                    searchLabel={'منبع'}  
                    hasLabel={true}  
                    clear={clear}  
                    required={true}  
                    selected={etebarDefinition.id!==null ? etebarDefinition.resource : null}
                />  
                <Textbox  
                    label="اعتبار"  
                    value={etebarDefinition.validity === null ? 0 : etebarDefinition.validity}  
                    type="text"  
                    onChange={(e) => handlePropertySet('validity', +e.target.value)}  
                    placeholder="اعتبار را وارد کنید"  
                    required={true}  
                />  
                <div className='flex items-end gap-4 py-4 justify-end'>  
                    <Button  
                        label={etebarDefinition.id !== null ? 'ویرایش' : 'ثبت'}  
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
    );  
};  

export default EtebarDefinationForm;  