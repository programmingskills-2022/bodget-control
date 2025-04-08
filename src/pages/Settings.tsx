import { useContext } from "../contexts/context";
import {  useEffect, useState } from "react";
import Textbox from "../components/UI/TextBox";
import { useSettingsStore } from "../store/settingsStore";
import LookupDropdown from "../components/UI/LookupDropdown";
import { useFinancialYearsStore } from "../store/financialYearsStore";
import { handleMessage } from "../general/Functions";
import Button from "../components/UI/Button";
import Modal from "../components/UI/Modal";
import Card from "../components/UI/Card";

const Settings = () => {
  const {menuItems,isModalOpen,setModalOpen,successMessage,setSuccessMessage}=useContext()
  const {settings,update} = useSettingsStore()
  const {financialYears,getFinancialYears}= useFinancialYearsStore()
  const [updateSettingRequest,setUpdateSettingRequest] = useState<UpdateSettingRequest>({
   financialYearId:settings.financialYear?.id as GUID,organOstanId:settings.organOstan?.id as GUID
  });

  useEffect(()=>{
    getFinancialYears()
  },[])

  const handlePropertySet = (property :keyof UpdateSettingRequest,value:string)=>{
    setUpdateSettingRequest(us=>
    (
      {...us,[property]:value}
    )
    )
  }

  const handleClick=()=>{
    setUpdateSettingRequest(us=>
    (
      {...us,organOstanId:settings.organOstan?.id as GUID}
    )
    )
    try {
      update(settings.id,updateSettingRequest)
      handleMessage(setSuccessMessage,setModalOpen,'تغییرات مورد نظر با موفقیت اعمال شد')
    } 
    catch (error) {
      console.log(error)
      handleMessage(setSuccessMessage,setModalOpen,'تغییرات مورد نظر ثبت نشد. لطفا مجدد امتحان کنید')
    }

  }

  return (
    <div className='flex flex-col p-4'>        
      <header className="flex justify-between items-center border-indigo-300 p-4">  
        <h1 className="text-2xl font-bold text-gray-700">{menuItems.menuItems[menuItems.selectedIndex].parentLabel }</h1>  
      </header>         
      <Card fontStyles="flex-1 container mx-auto p-4">  
        <div className='w-1/3 flex flex-col p-2 justify-items-center'>
          <Textbox 
            label="نام استان"  
            value={settings?.organOstan?.ostan?.name!==undefined ? settings.organOstan.ostan.name as string : ''}
            disabled={true}
          />
          <Textbox 
            label="نام دستگاه"
            value={settings?.organOstan?.organ?.name!==undefined ? settings.organOstan.organ.name as string : ''}
            disabled={true}
          /> 
          <LookupDropdown  
            hasLabel={true}
            items={financialYears?.length>0 ? financialYears:[]}  
            idKey="id"  
            nameKey="year" 
            codeKey="code"
            onItemSelect={(value)=>handlePropertySet('financialYearId',value as string)}
            searchLabel="سال مالی"
            clear={false}
            required={false}
          />
          <Button
            label="ثبت تغییرات"
            onClick={handleClick}
            variant="my-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
          />
        </div>        
      </Card>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} message={successMessage} /> 
    </div>
  )
}

export default Settings