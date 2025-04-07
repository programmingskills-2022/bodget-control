
import React, { useEffect, useState } from "react";
import Card from "../components/UI/Card";
import { useContext } from "../contexts/context";
import { useSettingsStore } from "../store/settingsStore";
import { handleMessage } from "../general/Functions";
import Modal from "../components/UI/Modal";
import { useEtebarBarnamehsStore } from "../store/etebarBarnamehsStore";
import EtebarBarnamehForm from "../components/Definations/EtebarBarnameh/EtebarBarnamehForm";
import EtebarBarnamehTable from "../components/Definations/EtebarBarnameh/EtebarBarnamehTable";
import { useResourcesStore } from "../store/resourcesStore";
import { useBarnamehsStore } from "../store/barnamehsStore";
import EtebarDefinationForm from "../components/Definations/EtebarDefination/EtebarDefinationForm";
import EtebarDefinationTable from "../components/Definations/EtebarDefination/EtebarDefinationTable";
//import EtebarDefinationForm from "../components/Definations/EtebarDefination/EtebarDefinationForm";

const EtebarBarnamehs =  () => {

  const {menuDefinationItems}=useContext()
  const [clear,setClear] = useState(false)
  const {settings} = useSettingsStore()
  const {getBarnamehs} = useBarnamehsStore()
  const {getResources} = useResourcesStore()

  const {getEtebarBarnamehs,add,update,remove,etebarBarnamehsByFinancialId} = useEtebarBarnamehsStore()

  const [isModalOpen, setModalOpen] = useState(false);  
  const [successMessage, setSuccessMessage] = useState('');  
  const [etebarBarnameh,setEtebarBarnameh] = useState< ETEBARBARNAMEH >(
    {  
      id:null,
      financialYear:null,
      financialYearId : null,
      barnameh:null,
      barnamehId: null, 
      resource:null,
      resourceId:null,
      validity: 0, 
    }
  ); 

useEffect(()=>{
  getBarnamehs()
  getResources()
},[])

useEffect(()=>{
  setClear(false)
},[etebarBarnameh])
//----------------------------------------------------------------
//check financialYearId was set certainly
  useEffect(()=>{
    if (settings.financialYear?.id!==undefined) 
      getEtebarBarnamehs(settings.financialYear?.id)
    else 
      handleMessage(setSuccessMessage,setModalOpen,'سال مالی ست نشده است.')
  },[])
//---------------------------------------------------------------------------------------------
//this function refresh object that want to be insert or update
  
  const refresh=()=>{
    setEtebarBarnameh( {  
      id:null,
      financialYear:null,
      financialYearId : null,
      barnameh:null,
      barnamehId: null, 
      resource:null,
      resourceId:null,
      validity: 0, 
    })
    setClear(true)
  }
//------------------------------------------------------------------------
// remove a record
const removeEtebarBarnameh= async(etebarBarnameh:ETEBARBARNAMEH)=>{
  if (etebarBarnameh.id!==null && etebarBarnameh.financialYear!== null) 
    {
      remove(etebarBarnameh.id, etebarBarnameh.financialYear.id)
      handleMessage(setSuccessMessage,setModalOpen,'اعتبار مورد مورد نظر برای برنامه انتخاب شده با موفقیت حذف شد.')
    }
}
//---------------------------------------------------------------------------
  //add or modify a record

  const handleClick = async(e:React.FormEvent) =>{
    e.preventDefault()

    if (//isEtebarBarnameh(etebarBarnameh) && 
    etebarBarnameh.barnamehId===null)
    {
      handleMessage(setSuccessMessage,setModalOpen,'برنامه مورد نظر انتخاب نشده است.')
      return 
    }

    let existingBarnameh=undefined
    if (etebarBarnamehsByFinancialId.length>0)
      existingBarnameh= etebarBarnamehsByFinancialId.find((ef)=>//isEtebarBarnameh(etebarBarnameh) && 
                ef.barnameh?.id===etebarBarnameh.barnamehId && ef.resource?.id===etebarBarnameh.resourceId)

    if (existingBarnameh!==undefined 
      && existingBarnameh.id!==etebarBarnameh.id
    )
    {
      handleMessage(setSuccessMessage,setModalOpen,'قبلا برای این برنامه در سال مالی جاری اعتبار ثبت شده است.')
      return 
    }

    if (etebarBarnameh.validity===0)
    {
      handleMessage(setSuccessMessage,setModalOpen,'اعتبار نمی تواند صفر باشد.')
      return 
    }
    if (etebarBarnameh.validity===null || etebarBarnameh.validity.toString()==='')
    {
      handleMessage(setSuccessMessage,setModalOpen,'اعتبار وارد نشده است.')
      return 
    }

    if (settings.financialYear!==null //&& isEtebarBarnameh(etebarBarnameh)
      )
      if ( etebarBarnameh.id === null) {
          add({barnamehId:etebarBarnameh.barnamehId,resourceId:etebarBarnameh.resourceId, financialYearId: settings.financialYear?.id, validity:etebarBarnameh.validity}, settings.financialYear?.id);
      } 
      //update existing etebar
      else {
        update(etebarBarnameh.id, {...etebarBarnameh,
          resourceId:etebarBarnameh.resource?.id ?? null,
          //barnamehId:etebarBarnameh.barnameh?.id ?? null ,
          financialYearId: settings.financialYear?.id}, settings.financialYear?.id);
      }
    refresh()
  }

  return (
    <div className='flex flex-col p-4'>        
        <header className="flex justify-between items-center border-indigo-300 p-4">  
          <h1 className="text-2xl font-bold text-gray-700">{menuDefinationItems[1].parentLabel }</h1>  
        </header>         
        <Card fontStyles="flex-1 container mx-auto p-4"> 
          <EtebarDefinationForm  definitionType="barnameh" clear={clear} etebarDefinition={etebarBarnameh} setEtebarDefinition={setEtebarBarnameh} 
          handleClick={handleClick} handleCancelClick={refresh}/>   
          {/* <EtebarBarnamehForm clear={clear} etebarBarnameh={etebarBarnameh} setEtebarBarnameh={setEtebarBarnameh} 
          handleClick={handleClick} handleCancelClick={refresh}/> */}
          <EtebarBarnamehTable  setClear={setClear} setEtebarBarnameh={setEtebarBarnameh} removeEtebarBarnameh={removeEtebarBarnameh}/>
        </Card>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} message={successMessage} />  
    </div> 
  )
}

export default EtebarBarnamehs