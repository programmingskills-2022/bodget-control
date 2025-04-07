import { useNavigate } from "react-router-dom";
import { convertToFarsiDigits } from "../../general/Functions";
import { useProjectsEtebarDtlStore } from "../../store/projectsEtebarDtl";


type Props = {
    projectsEtebar: PROJECTETEBAR[];
};

const ProjectEtebarTable = ({ projectsEtebar }: Props) => {
//    const {
//      getByProjectIdAndResourceValueId,
//  }= useProjectsEtebarStore()
const {getByProjectEtebarId}=useProjectsEtebarDtlStore()

  const navigate = useNavigate();

  const handleProjectEtebarClick = (projectEtebar: PROJECTETEBAR ) => {
    getByProjectEtebarId(projectEtebar.id)
    navigate(`/ProjectsEtebar/${projectEtebar.projectId}/${projectEtebar.id}`);
  };


  return (
    <>
      {(projectsEtebar?.length>0) 
      ?
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-purple-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="p-2">منبع</th>
            <th className="p-2">اعتبار</th>
          </tr>
        </thead>
        <tbody>
        {
              projectsEtebar?.map((projectEtebar) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-custom-hover"
                key={projectEtebar.id} 
                onClick={()=>handleProjectEtebarClick(projectEtebar)}
              >
                <td className="p-2 cursor-pointer text-purple-500 font-bold"> {projectEtebar?.resourceValue?.resource?.viewName}</td>
                <td className="p-2 cursor-pointer">{convertToFarsiDigits(projectEtebar.validity)}</td>
              </tr>
            ))
        } 
        </tbody>
      </table>
      :<p className="text-red-500">هیچ اعتباری برای این پروژه ثبت نشده است</p>
      }   
    </>
)}

export default ProjectEtebarTable
