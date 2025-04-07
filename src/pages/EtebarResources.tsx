
import React, { useEffect, useState } from "react";
import Card from "../components/UI/Card";
import { useContext } from "../contexts/context";
import { useSettingsStore } from "../store/settingsStore";
import { handleMessage } from "../general/Functions";
import Modal from "../components/UI/Modal";
import { useResourcesStore } from "../store/resourcesStore";
import { useResourceValuesStore } from "../store/resourceValuesStore";
import EtebarResourceForm from "../components/Definations/EtebarResource/EtebarResourceForm";
import EtebarResourceTable from "../components/Definations/EtebarResource/EtebarResourceTable";


const EtebarResources =  () => {

  const {menuDefinationItems}=useContext()
  const [clear,setClear] = useState(false)
  const {settings} = useSettingsStore()
  const {getResourcesJust,add,update,remove,resourceValues} = useResourceValuesStore()
  const {getResources} = useResourcesStore()

  const [isModalOpen, setModalOpen] = useState(false);  
  const [successMessage, setSuccessMessage] = useState('');  

  const [resourceValue,setResourceValue] = useState<RESOURCEVALUE>(
    {  
      id:null,
      financialYear:null,
      financialYearId : null,
      period:null,
      periodId: null, 
      resource:null,
      resourceId:null,
      value: 0, 
    }
  ); 

useEffect(()=>{
  getResources()
},[])

useEffect(()=>{
  setClear(false)
},[])  
//----------------------------------------------------------------
//check financialYearId was set certainly
  useEffect(()=>{
    if (settings.financialYear?.id!==undefined) 
      getResourcesJust(true)
    else 
      handleMessage(setSuccessMessage,setModalOpen,'سال مالی ست نشده است.')
  },[])
//---------------------------------------------------------------------------------------------
//this function refresh object that want to be insert or update
  
  const refresh=()=>{
    setResourceValue( {  
        id:null,
        financialYear:null,
        financialYearId : null,
        period:null,
        periodId: null, 
        resource:null,
        resourceId:null,
        value: 0, 
    })
    setClear(true)
  }
//------------------------------------------------------------------------  
// remove a record
const removeResourceValue= async(resourceValue:RESOURCEVALUE)=>{
  if (resourceValue.id!==null && resourceValue.financialYear!== null) 
    {
      remove(resourceValue.id)
      handleMessage(setSuccessMessage,setModalOpen,'اعتبار مورد مورد نظر برای منبع انتخاب شده با موفقیت حذف شد.')
    }
}    
//---------------------------------------------------------------------------
  //add or modify a record

  const handleClick = async(e:React.FormEvent) =>{
    e.preventDefault()

    let existingResourceValue=undefined
    if (resourceValues.length>0)
      existingResourceValue= resourceValues.find(rv=> rv.resource?.id===resourceValue.resourceId)

    if (existingResourceValue!==undefined && resourceValue.id !== existingResourceValue.id)
    {
      handleMessage(setSuccessMessage,setModalOpen,'قبلا برای این منبع در سال مالی جاری اعتبار ثبت شده است.')
      return 
    }

    if (resourceValue.value===0)
    {
      handleMessage(setSuccessMessage,setModalOpen,'اعتبار نمی تواند صفر باشد.')
      return 
    }
    if (resourceValue.value===null || resourceValue.value.toString()==='')
    {
      handleMessage(setSuccessMessage,setModalOpen,'اعتبار وارد نشده است.')
      return 
    }

    if (settings.financialYear!==null)
      if (resourceValue.id === null) {
          add({
            periodId:null, 
            resourceId:resourceValue.resourceId, 
            financialYearId: settings.financialYear?.id,
            value:resourceValue.value
            }, 
          );
      } 
      //update existing etebar
      else {
        update(resourceValue.id, {...resourceValue,
          //,faslId:etebarFasl.fasl?.id ?? null 
          resourceId:resourceValue.resource?.id ?? null,
          financialYearId: settings.financialYear?.id}
          );
      }
    refresh()
  }

  return (
    <div className='flex flex-col p-4'>        
        <header className="flex justify-between items-center border-indigo-300 p-4">  
          <h1 className="text-2xl font-bold text-gray-700">{menuDefinationItems[4].parentLabel }</h1>  
        </header>         
        <Card fontStyles="flex-1 container mx-auto p-4"> 
          <EtebarResourceForm clear={clear} resourceValue={resourceValue} setResourceValue={setResourceValue} 
          handleClick={handleClick} handleCancelClick={refresh}/>
          <EtebarResourceTable  setClear={setClear} setResourceValue={setResourceValue} removeResourceValue={removeResourceValue}/>
        </Card>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} message={successMessage} />  
    </div> 
  )
}

export default EtebarResources