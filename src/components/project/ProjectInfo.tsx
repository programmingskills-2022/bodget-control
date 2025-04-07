
import Card from '../UI/Card';
import { useProjectStore } from '../../store/projectsStore';


const ProjectInfo = () => {
    const {selectedProject}=useProjectStore()
 
  return (
    <Card fontStyles='text-sm gap-8 text-slate-600 justify-between'>  
      <div className='flex px-2 gap-2'>  
          <div className='flex flex-col place-items-end justify-between'>  
              <p className='font-semibold text-right pb-2'>نام دستگاه:</p>  
              <p className='font-semibold text-right pb-2'>کد پروژه:</p>  
              <p className='font-semibold text-right pb-2'>عنوان پروژه:</p>  
          </div>  
          <div className='flex flex-col  justify-between'>  
              <p className='pb-2'> {selectedProject?.organOstan?.organ?.name}</p>  
              <p className='pb-2 text-purple-700 font-bold'> {selectedProject?.projectCode}</p>
              <p className='pb-2 text-purple-700 font-bold'> {selectedProject?.projectName}</p>
          </div>  
      </div>  

      <div className='flex px-2 gap-2'>  
          <div className='flex flex-col place-items-end justify-between'>  
              <p className='font-semibold text-right pb-2'>فصل:</p>
              <p className='font-semibold text-right pb-2'> برنامه:</p>  
              <p className='font-semibold text-right pb-2'> طرح:</p>  
          </div>  
          <div className='flex flex-col  justify-between'>  
              <p className='pb-2'> {selectedProject?.tarh?.barnameh?.fasl?.name}</p>  
              <p className='pb-2'> {selectedProject?.tarh?.barnameh?.name}</p>
              <p className='pb-2'> {selectedProject?.tarh?.name}</p>
          </div>  
      </div>  

      <div className='flex px-2'>  
          <div className='flex flex-col place-items-end justify-between'>  
              <p className='font-semibold text-right pb-2'>شهر:</p>
              <p className='font-semibold text-right pb-2'> بخش:</p>  
              <p className='font-semibold text-right pb-2'> نقطه اجرا:</p>  
          </div>  
          <div className='flex flex-col  justify-between'>  
              <p className='pb-2'> {selectedProject?.city?.name}</p>  
              <p className='pb-2'> {selectedProject?.part?.name}</p>
              <p className='pb-2'> {selectedProject?.performancePoint?.name}</p>
          </div>  
      </div> 
  </Card>
  )
}

export default ProjectInfo
