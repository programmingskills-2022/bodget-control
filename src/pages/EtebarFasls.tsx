
import React, { useEffect, useState } from "react";
import Card from "../components/UI/Card";
import { useContext } from "../contexts/context";
import { useSettingsStore } from "../store/settingsStore";
import { handleMessage } from "../general/Functions";
import Modal from "../components/UI/Modal";
import { useEtebarFaslsStore } from "../store/etebarFaslsStore";
//import EtebarFaslForm from "../components/Definations/EtebarFasl/EtebarFaslForm";
import EtebarFaslTable from "../components/Definations/EtebarFasl/EtebarFaslTable";
import { useFaslsStore } from "../store/faslsStore";
import { useResourcesStore } from "../store/resourcesStore";
import EtebarDefinationForm from "../components/Definations/EtebarDefination/EtebarDefinationForm";

const EtebarFasls =  () => {

  const {menuDefinationItems}=useContext()
  const [clear,setClear] = useState(false)
  const {settings} = useSettingsStore()
  const {getEtebarFasls,add,update,remove,etebarFaslsByFinancialId} = useEtebarFaslsStore()
  const {getFasls} = useFaslsStore()
  const {getResources} = useResourcesStore()

  const [isModalOpen, setModalOpen] = useState(false);  
  const [successMessage, setSuccessMessage] = useState('');  

  const [etebarFasl,setEtebarFasl] = useState<ETEBARFASL>(
    {  
      id:null,
      financialYear:null,
      financialYearId : null,
      fasl:null,
      faslId: null, 
      resource:null,
      resourceId:null,
      validity: 0, 
    }
  ); 

useEffect(()=>{
  getFasls()
  getResources()
},[])

useEffect(()=>{
  setClear(false)
},[etebarFasl])  
//----------------------------------------------------------------
//check financialYearId was set certainly
  useEffect(()=>{
    if (settings.financialYear?.id!==undefined) 
      getEtebarFasls(settings.financialYear?.id)
    else 
      handleMessage(setSuccessMessage,setModalOpen,'سال مالی ست نشده است.')
  },[])
//---------------------------------------------------------------------------------------------
//this function refresh object that want to be insert or update
  
  const refresh=()=>{
    setEtebarFasl( {  
      id:null,
      financialYear:null,
      financialYearId : null,
      fasl:null,
      faslId: null,
      resource:null,
      resourceId:null,
      validity: 0, 
    })
    setClear(true)
  }
//------------------------------------------------------------------------  
// remove a record
const removeEtebarFasl= async(etebarFasl:ETEBARFASL)=>{
  if (etebarFasl.id!==null && etebarFasl.financialYear!== null) 
    {
      remove(etebarFasl.id, etebarFasl.financialYear.id)
      handleMessage(setSuccessMessage,setModalOpen,'اعتبار مورد مورد نظر برای فصل انتخاب شده با موفقیت حذف شد.')
    }
}    
//---------------------------------------------------------------------------
  //add or modify a record

  const handleClick = async(e:React.FormEvent) =>{
    e.preventDefault()
    if (etebarFasl.faslId===null)
    {
      handleMessage(setSuccessMessage,setModalOpen,'فصل مورد نظر انتخاب نشده است.')
      return 
    }

    let existingFasl=undefined
    if (etebarFaslsByFinancialId.length>0)
      existingFasl= etebarFaslsByFinancialId.find(ef=>ef.fasl?.id===etebarFasl.faslId && ef.resource?.id===etebarFasl.resourceId)

    if (existingFasl!==undefined && etebarFasl.id !== existingFasl.id)
    {
      handleMessage(setSuccessMessage,setModalOpen,'قبلا برای این برنامه در سال مالی جاری اعتبار ثبت شده است.')
      return 
    }

    if (etebarFasl.validity===0)
    {
      handleMessage(setSuccessMessage,setModalOpen,'اعتبار نمی تواند صفر باشد.')
      return 
    }
    if (etebarFasl.validity===null || etebarFasl.validity.toString()==='')
    {
      handleMessage(setSuccessMessage,setModalOpen,'اعتبار وارد نشده است.')
      return 
    }

    if (settings.financialYear!==null)
      if (etebarFasl.id === null) {
          add({
            faslId:etebarFasl.faslId, 
            resourceId:etebarFasl.resourceId, 
            financialYearId: settings.financialYear?.id,
            validity:etebarFasl.validity}, 
            settings.financialYear?.id);
      } 
      //update existing etebar
      else {
        update(etebarFasl.id, {...etebarFasl,
          //,faslId:etebarFasl.fasl?.id ?? null 
          resourceId:etebarFasl.resource?.id ?? null,
          financialYearId: settings.financialYear?.id}
          , settings.financialYear?.id);
      }
    refresh()
  }

  return (
    <div className='flex flex-col p-4'>        
        <header className="flex justify-between items-center border-indigo-300 p-4">  
          <h1 className="text-2xl font-bold text-gray-700">{menuDefinationItems.menuItems[menuDefinationItems.selectedIndex].parentLabel }</h1>  
        </header>         
        <Card fontStyles="flex-1 container mx-auto p-4"> 
          {/* <EtebarFaslForm clear={clear} etebarFasl={etebarFasl} setEtebarFasl={setEtebarFasl} 
          handleClick={handleClick} handleCancelClick={refresh}/> */}
          <EtebarDefinationForm  definitionType="fasl" clear={clear} etebarDefinition={etebarFasl} setEtebarDefinition={setEtebarFasl as React.Dispatch<React.SetStateAction<ETEBARFASL | ETEBARBARNAMEH | ETEBARCITY | ETEBARORGANOSTAN>>} 
          handleClick={handleClick} handleCancelClick={refresh}/> 
          <EtebarFaslTable  setClear={setClear} setEtebarFasl={setEtebarFasl} removeEtebarFasl={removeEtebarFasl}/>
        </Card>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} message={successMessage} />  
    </div> 
  )
}

export default EtebarFasls