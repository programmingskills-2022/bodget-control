import { useEffect } from "react";
import { useProjectStore } from "../../store/projectsStore";
import ExcelExport from "../ExcelExport";


const RpProjectsEtebarExport2Excel = () => {
const {  
    allProjectsEtebarList
    } = useProjectStore();  

useEffect(()=>{
    console.log('allProjectsEtebarList',allProjectsEtebarList)
},[])

  return (
    <div className='flex items-end gap-4 py-4 justify-end'>  
        <ExcelExport data={allProjectsEtebarList}/>
    </div>
  )
}

export default RpProjectsEtebarExport2Excel