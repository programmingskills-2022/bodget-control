
import React, { useEffect, useState } from "react";
import Card from "../components/UI/Card";
import { useContext } from "../contexts/context";
import { useSettingsStore } from "../store/settingsStore";
import { handleMessage } from "../general/Functions";
import Modal from "../components/UI/Modal";
import { useEtebarCitiesStore } from "../store/etebarCitiesStore";
import EtebarCityForm from "../components/Definations/EtebarCity/EtebarCityForm";
import EtebarCityTable from "../components/Definations/EtebarCity/EtebarCityTable";
import { useCitiesStore } from "../store/citiesStore";
import { useResourcesStore } from "../store/resourcesStore";
import EtebarDefinationForm from "../components/Definations/EtebarDefination/EtebarDefinationForm";

const EtebarBarnamehs =  () => {

  const {menuDefinationItems}=useContext()
  const [clear,setClear] = useState(false)
  const {settings} = useSettingsStore()
  const {getCities} = useCitiesStore()
  const {getResources} = useResourcesStore()  
  const {getEtebarCities,add,update,etebarCitiesByFinancialId, remove} = useEtebarCitiesStore()

  const [isModalOpen, setModalOpen] = useState(false);  
  const [successMessage, setSuccessMessage] = useState('');  

  const [etebarCity,setEtebarCity] = useState<ETEBARCITY>(
    {  
      id:null,
      financialYear:null,
      financialYearId : null,
      city:null,
      cityId: null, 
      resource:null,
      resourceId:null,
      validity: 0, 
    }
  ); 

useEffect(()=>{
  getCities()
  getResources()
},[])
  
useEffect(()=>{
  setClear(false)
},[etebarCity])  
//----------------------------------------------------------------
//check financialYearId was set certainly
  useEffect(()=>{
    if (settings.financialYear?.id!==undefined) 
      getEtebarCities(settings.financialYear?.id)
    else 
      handleMessage(setSuccessMessage,setModalOpen,'سال مالی ست نشده است.')
  },[])
//---------------------------------------------------------------------------------------------
//this function refresh object that want to be insert or update
  
  const refresh=()=>{
    setEtebarCity( {  
      id:null,
      financialYear:null,
      financialYearId : null,
      city:null,
      cityId: null, 
      resource:null,
      resourceId:null,
      validity: 0, 
    })
    setClear(true)
  }
//------------------------------------------------------------------------  
// remove a record
const removeEtebarCity= async(etebarCity:ETEBARCITY)=>{
  if (etebarCity.id!==null && etebarCity.financialYear!== null) 
    {
      remove(etebarCity.id, etebarCity.financialYear.id)
      handleMessage(setSuccessMessage,setModalOpen,'اعتبار مورد مورد نظر برای شهرستان انتخاب شده با موفقیت حذف شد.')
    }
}  
//---------------------------------------------------------------------------
  //add or modify a record

  const handleClick = async(e:React.FormEvent) =>{
    e.preventDefault()

    if (etebarCity.cityId===null)
    {
      handleMessage(setSuccessMessage,setModalOpen,'شهرستان مورد نظر انتخاب نشده است.')
      return 
    }

    let existingCity=undefined
    if (etebarCitiesByFinancialId.length>0)
      existingCity= etebarCitiesByFinancialId.find(ef=>ef.city?.id===etebarCity.cityId && ef.resource?.id===etebarCity.resourceId)

    if (existingCity!==undefined && etebarCity.id !== existingCity.id)
    {
      handleMessage(setSuccessMessage,setModalOpen,'قبلا برای این شهرستان در سال مالی جاری اعتبار ثبت شده است.')
      return 
    }

    if (etebarCity.validity===0)
    {
      handleMessage(setSuccessMessage,setModalOpen,'اعتبار نمی تواند صفر باشد.')
      return 
    }
    if (etebarCity.validity===null || etebarCity.validity.toString()==='')
    {
      handleMessage(setSuccessMessage,setModalOpen,'اعتبار وارد نشده است.')
      return 
    }

    if (settings.financialYear!==null)
      if (etebarCity.id === null) {
          add({cityId:etebarCity.cityId, financialYearId: settings.financialYear?.id,resourceId:etebarCity.resourceId, validity:etebarCity.validity}, settings.financialYear?.id);
      } 
      //update existing etebar
      else {
        update(etebarCity.id, {...etebarCity,
          resourceId:etebarCity.resource?.id ?? null,
          //,cityId:etebarCity.city?.id ?? null 
          financialYearId: settings.financialYear?.id}, 
          settings.financialYear?.id);
      }
    refresh()
  }

  return (
    <div className='flex flex-col p-4'>        
        <header className="flex justify-between items-center border-indigo-300 p-4">  
          <h1 className="text-2xl font-bold text-gray-700">{menuDefinationItems.menuItems[menuDefinationItems.selectedIndex].parentLabel }</h1>  
        </header>         
        <Card fontStyles="flex-1 container mx-auto p-4"> 
          {/* <EtebarCityForm clear={clear} etebarCity={etebarCity} setEtebarCity={setEtebarCity} 
          handleClick={handleClick} handleCancelClick={refresh}/> */}
          <EtebarDefinationForm  definitionType="city" clear={clear} etebarDefinition={etebarCity} setEtebarDefinition={setEtebarCity} 
          handleClick={handleClick} handleCancelClick={refresh}/> 
          <EtebarCityTable  setClear={setClear} setEtebarCity={setEtebarCity} removeEtebarCity={removeEtebarCity}/>
        </Card>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} message={successMessage} />  
    </div> 
  )
}

export default EtebarBarnamehs