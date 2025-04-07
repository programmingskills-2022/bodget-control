import {  useState } from "react"
import { convertToFarsiDigits, formatNumberWithCommas } from "../../../general/Functions"
import { useEtebarOrgansOstanStore } from "../../../store/etebarOrgansOstanStore"
import Button from "../../UI/Button"
import ConfirmationDialog from "../../UI/ConfirmationDialog"

type Props={
  setClear:React.Dispatch<React.SetStateAction<boolean>>
  setEtebarOrganOstan: React.Dispatch<React.SetStateAction<ETEBARORGANOSTAN>>
  removeEtebarOrganOstan : (etebarOrganOstan: ETEBARORGANOSTAN) => Promise<void>  
}
const EtebarOrganOstanTable = ( { setEtebarOrganOstan , setClear,removeEtebarOrganOstan} : Props) => {
     
  const {etebarOrgansOstanByFinancialId} = useEtebarOrgansOstanStore()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);  
  const [etebarOrganOstanToDelete, setEtebarOrganOstanToDelete] = useState<ETEBARORGANOSTAN | null>(null);  

  const handleEditClick = (etebarOrganOstan:ETEBARORGANOSTAN)  =>{
    setClear(false)

    if (etebarOrganOstan.organOstan!==null && etebarOrganOstan.financialYear!==null)
      setEtebarOrganOstan({
      id:etebarOrganOstan.id,
      organOstan:etebarOrganOstan.organOstan,
      organOstanId:etebarOrganOstan.organOstan.id,
      financialYear:etebarOrganOstan.financialYear,
      financialYearId: etebarOrganOstan.financialYear.id,
      resourceId:etebarOrganOstan.resourceId,
      resource:etebarOrganOstan.resource,
      validity: etebarOrganOstan.validity
    })


  }

  const openDeleteConfirmation = (etebarOrganOstan: ETEBARORGANOSTAN) => {  
    setEtebarOrganOstanToDelete(etebarOrganOstan);  
    setIsDeleteDialogOpen(true);  
  };  

  const closeDeleteConfirmation = () => {  
    setIsDeleteDialogOpen(false);  
    setEtebarOrganOstanToDelete(null);  
  };  


  const handleDelete = async () => {  
    if (etebarOrganOstanToDelete) {  
      await removeEtebarOrganOstan(etebarOrganOstanToDelete);  
      closeDeleteConfirmation();  
    }  
  };  
  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-purple-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="p-2">کد دستگاه</th>
            <th className="p-2">نام دستگاه</th>
            <th className="p-2">نام منبع</th>
            <th className="p-2">اعتبار</th>
            <th className="p-2">عملیات</th>
          </tr>
        </thead>
        <tbody>
        {
              etebarOrgansOstanByFinancialId?.map((etebarOrganOstan) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-custom-hover"
                key={etebarOrganOstan.id} 
                //onClick={()=>handleProjectEtebarClick(projectEtebar)}
              >
                <td className="p-2 cursor-pointer text-gray-400 font-bold"> {convertToFarsiDigits(etebarOrganOstan.organOstan?.organ?.code)}</td>
                <td className="p-2 cursor-pointer text-gray-500 font-bold"> {etebarOrganOstan.organOstan?.organ?.name}</td>
                <td className="p-2 cursor-pointer text-gray-500 font-bold"> {etebarOrganOstan.resource?.viewName}</td>
                <td className="p-2 cursor-pointer text-gray-700 font-bold">{convertToFarsiDigits(formatNumberWithCommas(etebarOrganOstan.validity))}</td>
                <Button 
                  label="ویرایش"
                  variant="mx-2 px-2 py-1 my-2 w-20 text-sm bg-green-100 text-green-600 rounded hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-600"
                  onClick={()=>handleEditClick(etebarOrganOstan)}
                />
                <Button 
                  label="حذف"
                  variant="mx-2 px-2 py-1 my-2 w-20 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-600"
                  onClick={() => openDeleteConfirmation(etebarOrganOstan)}
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
      message={`آیا مطمئن هستید که می خواهید اعتبار ${etebarOrganOstanToDelete?.organOstan?.organ?.name} را حذف کنید؟`} // Customized message  
      />  
    </>   
 
  )
}

export default EtebarOrganOstanTable