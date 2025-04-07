
import { convertToFarsiDigits } from "../../general/Functions";
import {  useEffect } from "react";
import { useProjectsTakhsisStore } from "../../store/projectsTakhsis";
import { useContext } from "../../contexts/context";
import { useResourceValuesStore } from "../../store/resourceValuesStore";


type Props = {
    projectId:string
};

const ProjectTakhsisTable = ({ projectId }: Props) => {

    const {getByProjectIdAndResourceId,projectTakhsisInAResource} = useProjectsTakhsisStore()
    const {resourceValues} = useResourceValuesStore()
    const {resourceValueSearch}= useContext()

    useEffect(()=>{
        const resourceId= resourceValues.find(rv=>rv.id===resourceValueSearch)?.resource?.id
        if (resourceId!==undefined)
            getByProjectIdAndResourceId(projectId,resourceId)
        //console.log(projectId,resourceId,resourceValueSearch)
    },[projectId,resourceValueSearch])

  return (
    <>
      {(projectTakhsisInAResource?.length>0) 
      ?
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-purple-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="p-2">دوره</th>
            <th className="p-2">تخصیص</th>
          </tr>
        </thead>
        <tbody>
        {
              projectTakhsisInAResource?.map((pt) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-custom-hover"
                key={pt.id} 
              >
                <td className="p-2 cursor-pointer text-purple-500 font-bold"> {pt?.resourceValue?.period?.name}</td>
                <td className="p-2 cursor-pointer">{convertToFarsiDigits(pt.validity)}</td>
              </tr>
            ))
        } 
        </tbody>
      </table>
      :<p className="text-red-500">تخصیص برای این پروژه ثبت نشده است</p>
      }   
    </>
)}

export default ProjectTakhsisTable
