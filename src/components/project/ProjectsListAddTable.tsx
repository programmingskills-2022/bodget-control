
import { convertToFarsiDigits } from '../../general/Functions'

type Props = {
    projects : Project[];
}

const ProjectsListAddTable = ({projects }: Props) => {

  return (
    <>
    { projects.length>0 &&
    <table className="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">  
        <thead className='text-xs text-gray-700 uppercase bg-purple-100 dark:bg-gray-700 dark:text-gray-400'>  
            <tr >  
                <th className=" p-2">دستگاه</th>  
                <th className=" p-2">پروژه</th>  
                <th className=" p-2">فصل</th>  
                <th className=" p-2">برنامه</th>  
                <th className=" p-2">طرح</th>  
                <th className=" p-2">شهر/بخش/روستا/نقطه اجرا</th>  
                <th className=" p-2">کارشناس</th>  
                <th className=" p-2">مستمر/غیرمستمر</th>            
                <th className=" p-2">محروم/غیر محروم</th>                   
                
            </tr>  
        </thead>  
        <tbody>            
            {projects.map((project) =>(
            <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-custom-hover' 
            key={project.code} 
            >  
                <td className="p-2 cursor-pointer">{convertToFarsiDigits(project?.organOstan?.organ?.code)}-{project?.organOstan?.organ?.name}</td>  
                <td className="p-2 cursor-pointer">{convertToFarsiDigits(project?.projectCode)}-{project?.projectName}</td>  
                <td className="p-2 cursor-pointer">{convertToFarsiDigits(project?.tarh?.barnameh?.fasl?.code)}-{project?.tarh?.barnameh?.fasl?.name}</td>  
                <td className="p-2 cursor-pointer">{convertToFarsiDigits(project?.tarh?.barnameh?.code)}-{project?.tarh?.barnameh?.name}</td> 
                <td className="p-2 cursor-pointer">{convertToFarsiDigits(project?.tarh?.viewCode)}-{project?.tarh?.name}</td> 
                <td className="p-2 cursor-pointer">{project?.city?.name}/{project?.part?.name}/{project?.village?.name}/{project?.performancePoint?.name}</td> 
                <td className="p-2 cursor-pointer">{project?.employee?.fName} {project?.employee?.lName}</td> 
                <td className="p-2 cursor-pointer">{project?.continuous ? 'مستمر' : 'غیر مستمر' }</td>  
                <td className="p-2 cursor-pointer">{project?.disadvantaged ? 'محروم' : 'غیر محروم'} </td>  
            </tr>  
            ))
            }
        </tbody>  
    </table> 
     }
     </>
  )
}

export default ProjectsListAddTable