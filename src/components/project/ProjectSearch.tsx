
import { useContext } from '../../contexts/context';
import LookupDropdown from '../UI/LookupDropdown';
import { useCitiesStore } from '../../store/citiesStore';
import { useFaslsStore } from '../../store/faslsStore';
import { useBarnamehsStore } from '../../store/barnamehsStore';
import { useEmployeesStore } from '../../store/employeesStore';
import { useOrgansOstanStore } from '../../store/organsOstanStore';
import { useAuthStore } from '../../store/authStore';
import { useEffect, useRef } from 'react';
import { config } from '../../config';

type Props={
    justCitySearch:boolean
}
const ProjectSearch = ({justCitySearch}:Props) => {
    const {cities, getCities} = useCitiesStore()
    const {organsJust,getOrgansOstan} = useOrgansOstanStore()
    const {fasls,getFasls} = useFaslsStore()
    const {barnamehs,getBarnamehs} = useBarnamehsStore()
    const {sazmanEmployees,getEmployees} = useEmployeesStore()
    const { loginInfo } = useAuthStore.getState();  

    const {projectCode,
        setProjectCode,
        setOrganOstanSearch,
        organOstanSearch,
        setCitySearch,
        citySearch,
        setBarnamehSearch,
        barnamehSearch,
        setFaslSearch,
        faslSearch,
        setEmployeeSearch,
        employeeSearch,
        handleSelect,
        //initSearchItems,
      } = useContext();  

  useEffect(()=>
    {
      getCities();
      getOrgansOstan();
      getFasls();
      getBarnamehs();
      getEmployees(config.employeeType_Sazman);      

  },[])
    const inputRef = useRef<HTMLInputElement>(null);  
    useEffect(() => {  
    // Focus the input whenever the text changes  
    if (inputRef.current) {  
        inputRef.current.focus();  
    }  
    }, [projectCode]);

  return (
            <div className='flex w-full items-center gap-2 mb-2'>
                <LookupDropdown  
                    hasLabel={false}
                    items={cities}  
                    idKey="id"  
                    nameKey="code" 
                    codeKey="name"
                    onItemSelect={(value)=>handleSelect(value, setCitySearch)}  
                    searchLabel={'نام شهر'}
                    clear={false}
                    required={false}
                    selected={citySearch ? cities.find(c=>c.id===citySearch) : null}
                /> 
                {!justCitySearch && 
                <>
                    <LookupDropdown  
                        hasLabel={false}
                        items={organsJust}  
                        idKey="id"  
                        nameKey="name" 
                        codeKey="code"
                        onItemSelect={(value)=>handleSelect(value, setOrganOstanSearch)}
                        searchLabel={'کد دستگاه'}
                        clear={false}
                        required={false}
                        selected={organOstanSearch ? organsJust.find(o=>o.id===organOstanSearch) : null}
                    /> 
                    <LookupDropdown  
                        hasLabel={false}
                        items={fasls}  
                        idKey="id"  
                        nameKey="name" 
                        codeKey="code"
                        onItemSelect={(value)=>handleSelect(value, setFaslSearch)}
                        searchLabel={'کد فصل'}
                        clear={false}
                        required={false}
                        selected={faslSearch ? fasls.find(f=>f.id===faslSearch) : null}
                    /> 
                    <LookupDropdown  
                        hasLabel={false}
                        items={barnamehs}  
                        idKey="id"  
                        nameKey="name" 
                        codeKey="code"
                        onItemSelect={(value)=>handleSelect(value, setBarnamehSearch)}
                        searchLabel={'کد برنامه'}
                        clear={false}
                        required={false}
                        selected={barnamehSearch ? barnamehs.find(b=>b.id===barnamehSearch) : null}
                    /> 
                    {loginInfo?.user?.unlimited && <LookupDropdown  
                        hasLabel={false}
                        items={sazmanEmployees}  
                        idKey="id"  
                        nameKey="code" 
                        codeKey="lName"
                        onItemSelect={(value)=>handleSelect(value, setEmployeeSearch)}
                        searchLabel={'نام کارشناس'}
                        clear={false}
                        required={false}
                        selected={employeeSearch ? sazmanEmployees.find(se=>se.id===employeeSearch) : null}
                    /> }
                    <input
                        className='shadow border px-2 h-16 w-full text-sm rounded-lg bg-slate-100 text-gray-700  focus:outline-none focus:shadow-outline' 
                        type='text' 
                        value={projectCode} 
                        placeholder='جستجو با کد پروژه...'
                        onChange={e=>setProjectCode(e.target.value)}
                        ref={inputRef}
                    /> 
                </>
          }         
            </div>  
  )
}

export default ProjectSearch