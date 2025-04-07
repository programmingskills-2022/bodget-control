import React, { useState } from 'react';  
import { convertToFarsiDigits, formatNumberWithCommas } from "../../../general/Functions"  
import { useEtebarBarnamehsStore } from "../../../store/etebarBarnamehsStore"  
import Button from "../../UI/Button"  
import ConfirmationDialog from '../../UI/ConfirmationDialog'; // Assuming you put ConfirmationDialog in UI folder  

type Props={  
  setClear:React.Dispatch<React.SetStateAction<boolean>>  
  setEtebarBarnameh: React.Dispatch<React.SetStateAction<ETEBARBARNAMEH>>  
  removeEtebarBarnameh : (etebarBarnameh: ETEBARBARNAMEH) => Promise<void>  
}  

const EtebarBarnamehTable = ( { setEtebarBarnameh , setClear, removeEtebarBarnameh} : Props) => {  
  const {etebarBarnamehsByFinancialId} = useEtebarBarnamehsStore()  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);  
  const [etebarBarnamehToDelete, setEtebarBarnamehToDelete] = useState<ETEBARBARNAMEH | null>(null);  


  const handleEditClick = (etebarBarnameh:ETEBARBARNAMEH)  =>{  
    setClear(false)  

    if (etebarBarnameh.barnameh!==null && etebarBarnameh.financialYear!==null)  
    setEtebarBarnameh({  
      id:etebarBarnameh.id,  
      barnameh:etebarBarnameh.barnameh,  
      barnamehId:etebarBarnameh.barnameh.id,  
      financialYear:etebarBarnameh.financialYear,  
      financialYearId: etebarBarnameh.financialYear.id,  
      resourceId:etebarBarnameh.resourceId,
      resource:etebarBarnameh.resource,
      validity: etebarBarnameh.validity  
    })  
  }  


  const openDeleteConfirmation = (etebarBarnameh: ETEBARBARNAMEH) => {  
    setEtebarBarnamehToDelete(etebarBarnameh);  
    setIsDeleteDialogOpen(true);  
  };  

  const closeDeleteConfirmation = () => {  
    setIsDeleteDialogOpen(false);  
    setEtebarBarnamehToDelete(null);  
  };  


  const handleDelete = async () => {  
    if (etebarBarnamehToDelete) {  
      await removeEtebarBarnameh(etebarBarnamehToDelete);  
      closeDeleteConfirmation();  
    }  
  };  


  return (  
      <>  
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">  
        <thead className="text-xs text-gray-700 uppercase bg-purple-100 dark:bg-gray-700 dark:text-gray-400">  
          <tr>  
            <th className="p-2">کد برنامه</th>  
            <th className="p-2">نام برنامه</th>  
            <th className="p-2">نام منبع</th>
            <th className="p-2">اعتبار</th>  
            <th className="p-2">عملیات</th>  
          </tr>  
        </thead>  
        <tbody>  
        {  
              etebarBarnamehsByFinancialId?.map((etebarBarnameh) => (  
              <tr  
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-custom-hover"  
                key={etebarBarnameh.id}  
              >  
                <td className="p-2 cursor-pointer text-gray-400 font-bold"> {convertToFarsiDigits(etebarBarnameh.barnameh?.code)}</td>  
                <td className="p-2 cursor-pointer text-gray-500 font-bold"> {etebarBarnameh.barnameh?.name}</td>  
                <td className="p-2 cursor-pointer text-gray-500 font-bold"> {etebarBarnameh.resource?.viewName}</td>
                <td className="p-2 cursor-pointer text-gray-700 font-bold">{convertToFarsiDigits(formatNumberWithCommas(etebarBarnameh.validity))}</td>  
                   <td className="p-2">  {/*  Added a container for buttons */}  
                <Button  
                  label="ویرایش"  
                  variant="mx-2 px-2 py-1 my-2 w-20 text-sm bg-green-100 text-green-600 rounded hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-600"  
                  onClick={() => handleEditClick(etebarBarnameh)}  
                />  
                <Button  
                  label="حذف"  
                  variant="mx-2 px-2 py-1 my-2 w-20 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-600"  
                  onClick={() => openDeleteConfirmation(etebarBarnameh)}  
                />  
                 </td>  
              </tr>  
            ))  
        }  
        </tbody>  
      </table>  

      <ConfirmationDialog  
        isOpen={isDeleteDialogOpen}  
        onConfirm={handleDelete}  
        onCancel={closeDeleteConfirmation}  
        message={`آیا مطمئن هستید که می خواهید اعتبار ${etebarBarnamehToDelete?.barnameh?.name} را حذف کنید؟`} // Customized message  
      />  
      </>  
  )  
}  

export default EtebarBarnamehTable 