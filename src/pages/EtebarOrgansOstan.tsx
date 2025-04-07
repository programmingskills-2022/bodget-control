
import React, { useEffect, useState } from "react";
import Card from "../components/UI/Card";
import { useContext } from "../contexts/context";
import { useSettingsStore } from "../store/settingsStore";
import { handleMessage } from "../general/Functions";
import Modal from "../components/UI/Modal";
import { useEtebarOrgansOstanStore } from "../store/etebarOrgansOstanStore";
//import EtebarOrganOstanForm from "../components/Definations/EtebarOrganOstan/EtebarOrganOstanForm";
import EtebarOrganOstanTable from "../components/Definations/EtebarOrganOstan/EtebarOrganOstanTable";
import { useOrgansOstanStore } from "../store/organsOstanStore";
import { useResourcesStore } from "../store/resourcesStore";
import EtebarDefinationForm from "../components/Definations/EtebarDefination/EtebarDefinationForm";

const EtebarBarnamehs =  () => {

  const {menuDefinationItems}=useContext()
  const [clear,setClear] = useState(false)
  const {settings} = useSettingsStore()
  const {getOrgansOstan} = useOrgansOstanStore()
  const {getResources} = useResourcesStore()  
  const {getEtebarOrgansOstan,add,update,remove,etebarOrgansOstanByFinancialId} = useEtebarOrgansOstanStore()

  const [isModalOpen, setModalOpen] = useState(false);  
  const [successMessage, setSuccessMessage] = useState('');  

  const [etebarOrganOstan,setEtebarOrganOstan] = useState<ETEBARORGANOSTAN>(
    {  
      id:null,
      financialYear:null,
      financialYearId : null,
      organOstan:null,
      organOstanId: null, 
      resource:null,
      resourceId:null,      
      validity: 0, 
    }
  ); 


useEffect(()=>{
  getOrgansOstan()
  getResources()
},[])

useEffect(()=>{
  setClear(false)
},[etebarOrganOstan])  
//----------------------------------------------------------------
//check financialYearId was set certainly
  useEffect(()=>{
    if (settings.financialYear?.id!==undefined) 
      getEtebarOrgansOstan(settings.financialYear?.id)
    else 
      handleMessage(setSuccessMessage,setModalOpen,'سال مالی ست نشده است.')
  },[])
//---------------------------------------------------------------------------------------------
//this function refresh object that want to be insert or update
  
  const refresh=()=>{
    setEtebarOrganOstan( {  
      id:null,
      financialYear:null,
      financialYearId : null,
      organOstan:null,
      organOstanId: null, 
      resource:null,
      resourceId:null,      
      validity: 0, 
    })
    setClear(true)
  }
//------------------------------------------------------------------------  
// remove a record
const removeEtebarOrganOstan= async(etebarOrganOstan:ETEBARORGANOSTAN)=>{
  if (etebarOrganOstan.id!==null && etebarOrganOstan.financialYear!== null) 
    {
      remove(etebarOrganOstan.id, etebarOrganOstan.financialYear.id)
      handleMessage(setSuccessMessage,setModalOpen,'اعتبار مورد مورد نظر برای دستگاه انتخاب شده با موفقیت حذف شد.')
    }
}      
//---------------------------------------------------------------------------
  //add or modify a record

  const handleClick = async(e:React.FormEvent) =>{
    e.preventDefault()

    if (etebarOrganOstan.organOstanId===null)
    {
      handleMessage(setSuccessMessage,setModalOpen,'دستگاه مورد نظر انتخاب نشده است.')
      return 
    }

    let existingOrganOstan=undefined
    if (etebarOrgansOstanByFinancialId.length>0)
      existingOrganOstan= etebarOrgansOstanByFinancialId.find(ef=>ef.organOstan?.id===etebarOrganOstan.organOstanId && ef.resource?.id===etebarOrganOstan.resourceId)

    if (existingOrganOstan!==undefined && etebarOrganOstan.id !== existingOrganOstan.id)
    {
      handleMessage(setSuccessMessage,setModalOpen,'قبلا برای این دستگاه در سال مالی جاری اعتبار ثبت شده است.')
      return 
    }

    if (etebarOrganOstan.validity===0)
    {
      handleMessage(setSuccessMessage,setModalOpen,'اعتبار نمی تواند صفر باشد.')
      return 
    }
    if (etebarOrganOstan.validity===null || etebarOrganOstan.validity.toString()==='')
    {
      handleMessage(setSuccessMessage,setModalOpen,'اعتبار وارد نشده است.')
      return 
    }

    if (settings.financialYear!==null)
      if (etebarOrganOstan.id === null) {
          add({organOstanId:etebarOrganOstan.organOstanId,resourceId:etebarOrganOstan.resourceId, financialYearId: settings.financialYear?.id, validity:etebarOrganOstan.validity}, settings.financialYear?.id);
      } 
      //update existing etebar
      else {
        update(etebarOrganOstan.id, {...etebarOrganOstan,
          //organOstanId:etebarOrganOstan.organOstan?.id ?? null ,
          resourceId:etebarOrganOstan.resource?.id ?? null,
          financialYearId: settings.financialYear?.id}, 
          settings.financialYear?.id);
      }
    refresh()
  }

  return (
    <div className='flex flex-col p-4'>        
        <header className="flex justify-between items-center border-indigo-300 p-4">  
          <h1 className="text-2xl font-bold text-gray-700">{menuDefinationItems[2].parentLabel }</h1>  
        </header>         
        <Card fontStyles="flex-1 container mx-auto p-4"> 
          {/* <EtebarOrganOstanForm clear={clear} etebarOrganOstan={etebarOrganOstan} setEtebarOrganOstan={setEtebarOrganOstan} 
          handleClick={handleClick} handleCancelClick={refresh}/> */}
          <EtebarDefinationForm  definitionType="organOstan" clear={clear} etebarDefinition={etebarOrganOstan} setEtebarDefinition={setEtebarOrganOstan} 
          handleClick={handleClick} handleCancelClick={refresh}/> 
          <EtebarOrganOstanTable setClear={setClear} setEtebarOrganOstan={setEtebarOrganOstan} removeEtebarOrganOstan={removeEtebarOrganOstan}/>
        </Card>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} message={successMessage} />  
    </div> 
  )
}

export default EtebarBarnamehs