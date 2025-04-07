import { useState } from "react"
import { convertToFarsiDigits, formatNumberWithCommas } from "../../../general/Functions"
import { useEtebarCitiesStore } from "../../../store/etebarCitiesStore"
import Button from "../../UI/Button"
import ConfirmationDialog from "../../UI/ConfirmationDialog"

type Props={
  setClear:React.Dispatch<React.SetStateAction<boolean>>
  setEtebarCity: React.Dispatch<React.SetStateAction<ETEBARCITY>>
  removeEtebarCity : (etebarCity: ETEBARCITY) => Promise<void>
}
const EtebarCityTable = ( { setEtebarCity , setClear,removeEtebarCity} : Props) => {
     
  const {etebarCitiesByFinancialId} = useEtebarCitiesStore()

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);  
  const [etebarCityToDelete, setEtebarCityToDelete] = useState<ETEBARCITY | null>(null); 

  const handleEditClick = (etebarCity:ETEBARCITY)  =>{
    setClear(false)

    if (etebarCity.city!==null && etebarCity.financialYear!==null)
      setEtebarCity({
      id:etebarCity.id,
      city:etebarCity.city,
      cityId:etebarCity.city.id,
      financialYear:etebarCity.financialYear,
      financialYearId: etebarCity.financialYear.id,
      resourceId:etebarCity.resourceId,
      resource:etebarCity.resource,
      validity: etebarCity.validity
    })
  }

  const openDeleteConfirmation = (etebarCity: ETEBARCITY) => {  
    setEtebarCityToDelete(etebarCity);  
    setIsDeleteDialogOpen(true);  
  };  

  const closeDeleteConfirmation = () => {  
    setIsDeleteDialogOpen(false);  
    setEtebarCityToDelete(null);  
  };  


  const handleDelete = async () => {  
    if (etebarCityToDelete) {  
      await removeEtebarCity(etebarCityToDelete);  
      closeDeleteConfirmation();  
    }  
  };  

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-purple-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="p-2">کد شهرستان</th>
            <th className="p-2">نام شهرستان</th>
            <th className="p-2">نام منبع</th>
            <th className="p-2">اعتبار</th>
            <th className="p-2">عملیات</th>
          </tr>
        </thead>
        <tbody>
        {
              etebarCitiesByFinancialId?.map((etebarCity) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-custom-hover"
                key={etebarCity.id} 
                //onClick={()=>handleProjectEtebarClick(projectEtebar)}
              >
                <td className="p-2 cursor-pointer text-gray-400 font-bold"> {convertToFarsiDigits(etebarCity.city?.code)}</td>
                <td className="p-2 cursor-pointer text-gray-500 font-bold"> {etebarCity.city?.name}</td>
                <td className="p-2 cursor-pointer text-gray-500 font-bold"> {etebarCity.resource?.viewName}</td>
                <td className="p-2 cursor-pointer text-gray-700 font-bold">{convertToFarsiDigits(formatNumberWithCommas(etebarCity.validity))}</td>
                <Button 
                  label="ویرایش"
                  variant="mx-2 px-2 py-1 my-2 w-20 text-sm bg-green-100 text-green-600 rounded hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-600"
                  onClick={()=>handleEditClick(etebarCity)}
                />
                <Button 
                  label="حذف"
                  variant="mx-2 px-2 py-1 my-2 w-20 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-600"
                  onClick={() => openDeleteConfirmation(etebarCity)}  
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
        message={`آیا مطمئن هستید که می خواهید اعتبار شهرستان ${etebarCityToDelete?.city?.name} را حذف کنید؟`} // Customized message  
      />
    </>
  )
}

export default EtebarCityTable