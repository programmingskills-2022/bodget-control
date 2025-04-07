import React, { createContext, ReactNode, useContext as useReactContext, useState } from 'react';

type SetterFunction<T> = React.Dispatch<React.SetStateAction<T>>;  

interface ContextType {
  menuItems: MenuItem[];
  menuDefinationItems : MenuItem[];
  projectCode: string;
  organOstanSearch: Action

  citySearch: Action
  partSearch: Action
  villageSearch: Action
  performancePointSearch:Action

  affairSearch:Action
  barnamehSearch: Action
  faslSearch: Action

  employeeSearch: Action
  motevazenPartSearch:Action

  progressMessage:string
  showProgress:boolean
  isModalOpen :boolean
  successMessage:string  

  setProjectCode: SetterFunction<string>;
  setOrganOstanSearch:SetterFunction<Action>;
  
  setCitySearch: SetterFunction<Action>;
  setPartSearch: SetterFunction<Action>;
  setVillageSearch: SetterFunction<Action>;
  setPerformancePointSearch: SetterFunction<Action>;

  setAffairSearch:SetterFunction<Action>; 
  setBarnamehSearch: SetterFunction<Action>;
  setFaslSearch: SetterFunction<Action>;

  setEmployeeSearch: SetterFunction<Action>;
  setMotevazenPartSearch:SetterFunction<Action>;

  setProgressMessage:SetterFunction<string>
  setShowProgress:SetterFunction<boolean>
  setModalOpen :SetterFunction<boolean>
  setSuccessMessage:SetterFunction<string>  

  initSearchItems:()=>void;
  handleSelect:<T>(value: Action, setSearch: SetterFunction<Action>,updateNeed?:T, setUpdateNeed?: SetterFunction<T>)=>void 
  handleSelectText:(value: string, setSearch: SetterFunction<string>)=>void

  periodSearch:Action
  resourceValueSearch:Action
  setPeriodSearch:SetterFunction<Action>;
  setResourceValueSearch:SetterFunction<Action>;

}

export const Context = createContext<ContextType>({
  menuItems: [],
  menuDefinationItems:[],
  projectCode: '',
  organOstanSearch: null,
  
  affairSearch: null,
  faslSearch: null,
  barnamehSearch:null,
  
  citySearch:  null,
  partSearch: null,
  villageSearch: null,
  performancePointSearch:null,

  employeeSearch:  null,
  motevazenPartSearch:  null,

  progressMessage:'',
  showProgress:false,
  isModalOpen :false,
  successMessage:'' , 

  setProjectCode:()=>{},
  setOrganOstanSearch: ()=>{},

  setAffairSearch: ()=>{},
  setFaslSearch: ()=>{},
  setBarnamehSearch: ()=>{},
  
  setCitySearch: ()=>{},
  setPartSearch: ()=>{},
  setVillageSearch: ()=>{},
  setPerformancePointSearch: ()=>{},

  setEmployeeSearch: ()=>{},
  setMotevazenPartSearch:()=>{},

  setProgressMessage:()=>{},
  setShowProgress:()=>{},
  setModalOpen :()=>{},
  setSuccessMessage:()=>{},  

  initSearchItems:()=>{},
  handleSelect:(value, setSearch, setUpdateNeed) => {console.log(value,setSearch,setUpdateNeed)},
  handleSelectText:(value, setSearch) => {console.log(value,setSearch)},

  periodSearch:null,
  resourceValueSearch:null,
  setPeriodSearch:()=>{},
  setResourceValueSearch: ()=>{},

});

export const useContext = (): ContextType => {
  const context = useReactContext(Context);
  if (!context) {
    throw new Error("خطا!");
  }
  return context;
};

interface ProviderProps {
  children: ReactNode;
}

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  const menuDefinationItems : MenuItem[] = 
  [
    {parentLabel:'اعتبار فصل' ,parentNavigate:'EtebarFasls', childrenItems:[]},
    {parentLabel:'اعتبار برنامه' ,parentNavigate:'EtebarBarnamehs', childrenItems:[]},
    {parentLabel:'اعتبار دستگاه' ,parentNavigate:'EtebarOrgansOstan', childrenItems:[]},
    {parentLabel:'  اعتبار شهرستان' ,parentNavigate:'EtebarCities', childrenItems:[]},
    {parentLabel:' اعتبار منابع' ,parentNavigate:'ResourceValues', childrenItems:[]},
  ]
  const menuItems:MenuItem[] = 
  [
    { parentLabel: 'داشبورد', parentNavigate: 'Dashboard', childrenItems: [] },
    {parentLabel:'پروژه' ,parentNavigate:'Projects', 
          childrenItems:[{label:'ثبت پروژه',navigate:'Projects/Add'},]},

    {parentLabel:'اعتبار' ,parentNavigate:'ProjectsEtebar' , 
          childrenItems:[{label:'ثبت گروهی',navigate:'ProjectsEtebar/AddGroup'},
                          {label:'ثبت انفرادی',navigate:'ProjectsEtebar/AddOne'},]},

    {parentLabel:'تخصیص' ,parentNavigate:'ProjectsTakhsis', 
          childrenItems:[{label:'ثبت گروهی',navigate:'ProjectsTakhsis/AddGroup'},
                        {label:'ثبت انفرادی',navigate:'ProjectsTakhsis/AddOne'},]},

    {parentLabel:'گزارشات' ,parentNavigate:'Settings', childrenItems:[{label:'لیست پروژه ها',navigate:'Projects'}]},

    {parentLabel:'تنظیمات' ,parentNavigate:'Settings', childrenItems:[]},
  ]
  const [organOstanSearch, setOrganOstanSearch] = useState<Action>(null);
  const [projectCode, setProjectCode] = useState('');

  const [citySearch, setCitySearch] = useState<Action>(null);
  const [partSearch, setPartSearch] = useState<Action>(null);
  const [villageSearch, setVillageSearch] = useState<Action>(null);
  const [performancePointSearch, setPerformancePointSearch] = useState<Action>(null);

  const [affairSearch, setAffairSearch] = useState<Action>(null);
  const [faslSearch, setFaslSearch] = useState<Action>(null);
  const [barnamehSearch, setBarnamehSearch] = useState<Action>(null);

  const [employeeSearch, setEmployeeSearch] = useState<Action>(null);
  const [motevazenPartSearch, setMotevazenPartSearch] = useState<Action>(null);

  const [progressMessage, setProgressMessage] = useState(''); 
  const [showProgress, setShowProgress]= useState(false)
  const [isModalOpen, setModalOpen] = useState(false);  
  const [successMessage, setSuccessMessage] = useState('');  

  const [periodSearch, setPeriodSearch] = useState<Action>(null);
  const [resourceValueSearch, setResourceValueSearch] = useState<Action>(null);


  const initSearchItems=()=>{
    setOrganOstanSearch(null)
    setProjectCode('')
    setCitySearch(null)
    setBarnamehSearch(null)
    setFaslSearch(null)
    setEmployeeSearch(null)
    setMotevazenPartSearch(null)
    setAffairSearch(null)
  }

  const handleSelect = <T,>(value: Action, setSearch: (value: Action) => void, updateNeed?: T, setUpdateNeed?: (updateNeed: T) => void) => {  
    setSearch(value);  
    if (updateNeed!==undefined && setUpdateNeed!==undefined) setUpdateNeed(updateNeed)
  }

  const handleSelectText = (value: string, setSearch: (value: string) => void) => {  
    setSearch(value);  
  }; 

  const values: ContextType = {
    menuItems,
    menuDefinationItems,
    projectCode,
    organOstanSearch,

    citySearch,
    partSearch,
    villageSearch,
    performancePointSearch,

    employeeSearch,
    motevazenPartSearch,

    affairSearch,
    faslSearch,
    barnamehSearch,

    progressMessage,
    showProgress,
    isModalOpen ,
    successMessage , 
    
    setProjectCode,
    setOrganOstanSearch,
    
    setCitySearch,
    setPartSearch,
    setVillageSearch,
    setPerformancePointSearch,
    
    setEmployeeSearch,
    setMotevazenPartSearch,
    
    setAffairSearch,
    setFaslSearch,
    setBarnamehSearch,

    setProgressMessage,
    setShowProgress,
    setModalOpen,
    setSuccessMessage,  

    initSearchItems,
    handleSelect,
    handleSelectText,

    periodSearch,
    resourceValueSearch,
    setPeriodSearch,
    setResourceValueSearch,


  };

  return (
    <Context.Provider value={values}>
      {children}
    </Context.Provider>
  );
};