import { useState } from "react"
import { convertToFarsiDigits, formatNumberWithCommas } from "../../../general/Functions"
import { useEtebarFaslsStore } from "../../../store/etebarFaslsStore"
import Button from "../../UI/Button"
import ConfirmationDialog from "../../UI/ConfirmationDialog"

type Props={
  setClear:React.Dispatch<React.SetStateAction<boolean>>
  setEtebarFasl: React.Dispatch<React.SetStateAction<ETEBARFASL>>
  removeEtebarFasl : (etebarFasl: ETEBARFASL) => Promise<void>
}
const EtebarFaslTable = ( { setEtebarFasl , setClear,removeEtebarFasl} : Props) => {
     
  const {etebarFaslsByFinancialId} = useEtebarFaslsStore()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);  
  const [etebarFaslToDelete, setEtebarFaslToDelete] = useState<ETEBARFASL | null>(null);  

  const handleEditClick = (etebarFasl:ETEBARFASL)  =>{
    setClear(false)

    if (etebarFasl.fasl!==null && etebarFasl.financialYear!==null)
      setEtebarFasl({
      id:etebarFasl.id,
      fasl:etebarFasl.fasl,
      faslId:etebarFasl.fasl.id,
      financialYear:etebarFasl.financialYear,
      financialYearId: etebarFasl.financialYear.id,
      resourceId:etebarFasl.resourceId,
      resource:etebarFasl.resource,
      validity: etebarFasl.validity
    })


  }

  const openDeleteConfirmation = (etebarFasl: ETEBARFASL) => {  
    setEtebarFaslToDelete(etebarFasl);  
    setIsDeleteDialogOpen(true);  
  };  

  const closeDeleteConfirmation = () => {  
    setIsDeleteDialogOpen(false);  
    setEtebarFaslToDelete(null);  
  };  


  const handleDelete = async () => {  
    if (etebarFaslToDelete) {  
      await removeEtebarFasl(etebarFaslToDelete);  
      closeDeleteConfirmation();  
    }  
  };  

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-purple-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="p-2">کد فصل</th>
            <th className="p-2">نام فصل</th>
            <th className="p-2">نام منبع</th>
            <th className="p-2">اعتبار</th>
            <th className="p-2">عملیات</th>
          </tr>
        </thead>
        <tbody>
        {
              etebarFaslsByFinancialId?.map((etebarFasl) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-custom-hover"
                key={etebarFasl.id} 
                //onClick={()=>handleProjectEtebarClick(projectEtebar)}
              >
                <td className="p-2 cursor-pointer text-gray-400 font-bold"> {convertToFarsiDigits(etebarFasl.fasl?.code)}</td>
                <td className="p-2 cursor-pointer text-gray-500 font-bold"> {etebarFasl.fasl?.name}</td>
                <td className="p-2 cursor-pointer text-gray-500 font-bold"> {etebarFasl.resource?.viewName}</td>
                <td className="p-2 cursor-pointer text-gray-700 font-bold">{convertToFarsiDigits(formatNumberWithCommas(etebarFasl.validity))}</td>
                <Button 
                  label="ویرایش"
                  variant="mx-2 px-2 py-1 my-2 w-20 text-sm bg-green-100 text-green-600 rounded hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-600"
                  onClick={()=>handleEditClick(etebarFasl)}
                />
                <Button 
                  label="حذف"
                  variant="mx-2 px-2 py-1 my-2 w-20 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-600"
                  onClick={() => openDeleteConfirmation(etebarFasl)}  
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
      message={`آیا مطمئن هستید که می خواهید اعتبار ${etebarFaslToDelete?.fasl?.name} را حذف کنید؟`} // Customized message  
      />  
    </>   
  )
}

export default EtebarFaslTable