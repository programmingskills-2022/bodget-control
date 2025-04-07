
import { useEffect } from 'react';
import { convertToFarsiDigits } from '../../general/Functions';

import { useParams } from 'react-router-dom';
import Card from '../UI/Card';
import { useProjectsEtebarStore } from '../../store/projectsEtebar';

const ProjectsEtebarSum = () => {
    const { getSumByProjectId, 
        projectsEtebarSumById }  = useProjectsEtebarStore();  
   
    const { projectId } = useParams();

    useEffect(() => {  
        getSumByProjectId(projectId);
    }, [projectId]);  
  return (
    <>
    {projectsEtebarSumById &&  (
        <Card fontStyles='text-sm gap-8 text-slate-600 '>
            <div className='flex justify-end gap-2'>  
                <p className='font-semibold  pb-2'>جمع اعتبار توزیع شده:</p>
                <p className='pb-2 text-purple-700 font-bold'> {convertToFarsiDigits(projectsEtebarSumById[0]?.validitySum )}</p>
            </div>
        </Card>
        )}
    </>
  )
}

export default ProjectsEtebarSum