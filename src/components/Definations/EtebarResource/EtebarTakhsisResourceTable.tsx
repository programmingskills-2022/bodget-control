import { useEffect, useState } from "react"
import { convertToFarsiDigits, formatNumberWithCommas } from "../../../general/Functions"
import Button from "../../UI/Button"
import ConfirmationDialog from "../../UI/ConfirmationDialog"
import { useResourceValuesStore } from "../../../store/resourceValuesStore"
import { useContext } from "../../../contexts/context"

type Props={
  setClear:React.Dispatch<React.SetStateAction<boolean>>
  resourceVal:RESOURCEVALUE
  setResourceValue: React.Dispatch<React.SetStateAction<RESOURCEVALUE>>
  removeResourceValue : (resourceValue: RESOURCEVALUE) => Promise<void>
}
const EtebarTakhsisResourceTable = ( { setClear, resourceVal, setResourceValue , removeResourceValue} : Props) => {
     
  const {menuDefinationItems}=useContext()  
  const {resourceValues} = useResourceValuesStore()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);  
  const [resourceValueToDelete, setResourceValueToDelete] = useState<RESOURCEVALUE | null>(null);  
  const [resourceValueEtebar,setResourceValueEtebar]= useState<RESOURCEVALUE[]>([])


  useEffect(()=>{
    console.log('sdhghdgfhdg',resourceValueEtebar,resourceValues,resourceVal)
    if (menuDefinationItems.selectedIndex===4) setResourceValueEtebar(resourceValues.filter((rv)=>rv.period===null))
    else if(menuDefinationItems.selectedIndex===5)
      if (resourceVal.period?.id!==null) 
      {
        setResourceValueEtebar(resourceValues.filter((rv)=>rv.period!==null && rv.period.id === resourceVal.periodId))
        console.log(resourceValues.filter((rv)=>rv.period!==null && rv.period.id === resourceVal.periodId))
      }
      else setResourceValueEtebar([])
  },[menuDefinationItems.selectedIndex,resourceVal.periodId,resourceValues])

  const handleEditClick = (resourceValue:RESOURCEVALUE)  =>{
    setClear(false)

    if (resourceValue.financialYear!==null)
    setResourceValue({
      id:resourceValue.id,
      period:resourceValue.period,
      periodId:resourceValue.period?.id,
      financialYear:resourceValue.financialYear,
      financialYearId: resourceValue.financialYear.id,
      resourceId:resourceValue.resource?.id,
      resource:resourceValue.resource,
      value: resourceValue.value
    })
  }

  const openDeleteConfirmation = (resourceValue:RESOURCEVALUE) => {  
    setResourceValueToDelete(resourceValue);  
    setIsDeleteDialogOpen(true);  
  };  

  const closeDeleteConfirmation = () => {  
    setIsDeleteDialogOpen(false);  
    setResourceValueToDelete(null);  
  };  


  const handleDelete = async () => {  
    if (resourceValueToDelete) {  
      await removeResourceValue(resourceValueToDelete);  
      closeDeleteConfirmation();  
    }  
  };  

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-purple-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="p-2">کد منبع</th>
            <th className="p-2">نام منبع</th>
            <th className="p-2">اعتبار</th>
            <th className="p-2">عملیات</th>
          </tr>
        </thead>
        <tbody>
        {
              resourceValueEtebar?.map((resourceValue) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-custom-hover"
                key={resourceValue.id} 
                //onClick={()=>handleProjectEtebarClick(projectEtebar)}
              >
                <td className="p-2 cursor-pointer text-gray-400 font-bold"> {convertToFarsiDigits(resourceValue.resource?.code)}</td>
                <td className="p-2 cursor-pointer text-gray-500 font-bold"> {resourceValue.resource?.viewName}</td>
                <td className="p-2 cursor-pointer text-gray-700 font-bold">{convertToFarsiDigits(formatNumberWithCommas(resourceValue.value))}</td>
                <Button 
                  label="ویرایش"
                  variant="mx-2 px-2 py-1 my-2 w-20 text-sm bg-green-100 text-green-600 rounded hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-600"
                  onClick={()=>handleEditClick(resourceValue)}
                />
                <Button 
                  label="حذف"
                  variant="mx-2 px-2 py-1 my-2 w-20 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-600"
                  onClick={() => openDeleteConfirmation(resourceValue)}  
                />
              </tr>
            ))
        } 
        </tbody>
      </table>
      <ConfirmationDialog  
      isOpen={isDeleteDialogOpen}  
      onConfirm={handleDelete}  
      onCancel={closeDeleteConfirmation}  
      message={`آیا مطمئن هستید که می خواهید اعتبار منبع ${resourceValueToDelete?.resource?.viewName} را حذف کنید؟`} // Customized message  
      />  
    </>   
  )
}

export default EtebarTakhsisResourceTable