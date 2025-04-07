import {  useInfiniteQuery } from 'react-query';  
import { useAuthStore } from '../../store/authStore';
import { useContext } from '../../contexts/context';
import { useProjectsEtebarStore } from '../../store/projectsEtebar';
import ProjectCount from '../project/ProjectCount';
import { useCallback, useEffect, useRef, useState } from 'react';
import useProjectTableColumns from '../../hooks/useProjectTableColumns';
import { useProjectsTakhsisStore } from '../../store/projectsTakhsis';
import { convertToFarsiDigits } from '../../general/Functions';
import Textbox from '../UI/TextBox';
import Button from '../UI/Button';
import Project from '../project/Project';
import ProjectTakhsisTable from '../projectTakhsis/ProjectTakhsisTable';

type Props = {  
  resourceValueId:string,
  //TakhsisResourceValueId:string
  etebar:boolean;
  isGroup:boolean;
  //isEdit: boolean;  
  validityMap?:{
    [key: string]: {
        validity: number;
        expertComment: string;
    };
  }
  setValidityMap?: React.Dispatch<React.SetStateAction<{
    [key: string]: {
        validity: number;
        expertComment: string;
    };
  }>>
  handleAdd?:(project: Project|ProjectWithResource | null) => Promise<void>
};  

const ProjectsEtebarTable = ({ 
  resourceValueId,
  //TakhsisResourceValueId,
  etebar,
  isGroup,
  // isEdit
  validityMap,
  setValidityMap,
  handleAdd
   }: Props) => {  

  const {
    getProjectsWithAnEtebarResource,
    } = useProjectsEtebarStore();
  const { isAuthenticated,loginInfo } = useAuthStore();  

  const {totalCount,isLoading}=useProjectsEtebarStore();

  const {citySearch,organOstanSearch,faslSearch,barnamehSearch,employeeSearch,projectCode,resourceValueSearch
    } = useContext();

  const {columns,visibleColumns,toggleColumnVisibility,checkVisibility} = useProjectTableColumns()   

  const [projectsShowTakhsis,setProjectsShowTakhsis]=useState<ProjectsShowEtebar[]>([])   
  
  const {projectsTakhsis,getAll}=useProjectsTakhsisStore();
  
    useEffect(()=>{
      getAll()
    },[])
//-------------------------------------------------------------------------------------
const {
  fetchNextPage, //function 
  hasNextPage, // boolean
  isFetchingNextPage, // boolean
  data,
  status,
  error
} = useInfiniteQuery(['projectsEtebar',{resourceValueId,resourceValueSearch,citySearch,
  organOstanSearch,
  faslSearch,
  barnamehSearch,
  employeeSearch,
  projectCode
  }], ({ pageParam = 1 }) =>getProjectsWithAnEtebarResource(pageParam,resourceValueId,resourceValueSearch as string,citySearch,
    organOstanSearch,
    faslSearch,
    barnamehSearch,
    isAuthenticated && !loginInfo?.user?.unlimited ? loginInfo?.user?.employee.id : employeeSearch!==null ? employeeSearch : '',
    projectCode), {
  getNextPageParam:(lastPage,allPages)=>{
        const maxPages = lastPage?.totalCount ? Math.ceil(lastPage.totalCount / 100) : 0;  
        const nextPage= allPages.length + 1
        return nextPage<=maxPages ? nextPage :undefined
   }
})

useEffect(() => {  
  if (data?.pages) {  
    const newProjects = data.pages.flatMap((page) =>  
      page?.items!==undefined ? page.items.map(project => ({ projectId: project.id, isVisible: false })) : []  
    );  
    setProjectsShowTakhsis(newProjects);  
  }  
}, [data]); 

//------------------------------------------------------------------------------------------------
  const intObserver = useRef()
//-------------------callback------------------------------------------------------------------------------  
const lastProjectRef = useCallback((project:ProjectWithResource) => {  
  if (isFetchingNextPage) return  

  if (intObserver.current) intObserver.current.disconnect()  

  intObserver.current = new IntersectionObserver(p => {  
    if (p[0].isIntersecting && hasNextPage) {  
        console.log('We are near the last project!')  
        fetchNextPage()  
    }  
  })  

  if (project) intObserver.current.observe(project)  
}, [isFetchingNextPage, fetchNextPage, hasNextPage])  
//------------------------------------------------------------------------------------------------------------
  if (status === 'error') return <p className='center'>خطا: {error.message}</p>

 //-----------------------If we wanna addOne projectTakhsis------------------------------------
if (!isGroup && !etebar && validityMap!==undefined && setValidityMap!==undefined && handleAdd!==undefined) 
  {
    columns.push({  
      header: 'اعتبار',  
      accessor: (project: Project | ProjectWithResource): JSX.Element | string => {  
          // Check if project is of type ProjectWithResource  
          if ('resourceVal' in project) {  
              return <p className='text-slate-500 font-bold text-sm'>{convertToFarsiDigits(project.resourceVal)}</p>// Return resourceVal if it exists  
          }  
          return ''; // Return an empty string or handle the case for Project if needed  
      },  
      visible: true,  
    });
    columns.push({  
      header: 'تخصیص ثبت شده',  
      accessor: (project: Project | ProjectWithResource): JSX.Element | string => {  
          // Check if project is of type ProjectWithResource  
          let pt:PROJECTETEBAR|undefined=undefined
          if ('resourceVal' in project) {  
              pt=projectsTakhsis.find(pt=>pt.projectId===project.id && pt.resourceValueId===project.resourceValueId)
              //console.log('pt',pt)
              return  <p className='text-purple-600 font-bold text-sm'>{convertToFarsiDigits(pt?.validity)}</p> 
          }  
          return ''; // Return an empty string or handle the case for Project if needed  
      },  
      visible: true,  
    });
    columns.push(  
      {  
        header: 'تخصیص',  
        accessor: (project: Project | ProjectWithResource): JSX.Element | string => 
        {
          return  <div className='w-32 text-sm'>
            <Textbox  
              value={validityMap[project.id]?.validity || ''}  
              type="text"  
              onChange={(e) => {  
                setValidityMap(prev => ({  
                  ...prev,  
                  [project.id]: {  
                    ...prev[project.id], // Preserve existing properties  
                    validity: parseInt(e.target.value) || 0 // Fallback to 0 on invalid number  
                  },  
                }));  
              }} 
              placeholder="تخصیص ..."   
              required={false}  
            />          
          </div> 
        }
  ,  
        visible: true,  
      }  
    ); 
    columns.push(
      {  
        header: 'عملیات',  
        accessor: (project: Project|ProjectWithResource): JSX.Element | string => 
        <Button 
          label='ثبت'
          onClick={()=>handleAdd(project)}  
          variant='px-2 py-1 w-20 text-sm bg-green-100 text-green-600 rounded hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-600'
         />
        ,  
        visible: true,  
      });     
      
  }
  //-----------------------If we wanna addGroup projectTakhsis------------------------------------
  if (isGroup && !etebar && validityMap===undefined && setValidityMap===undefined && handleAdd===undefined) 
  {
    columns.push({  
      header: 'اعتبار',  
      accessor: (project: Project | ProjectWithResource): JSX.Element | string => {  
          // Check if project is of type ProjectWithResource  
          if ('resourceVal' in project) {  
              return <p className='text-slate-500 font-bold text-sm'>{convertToFarsiDigits(project.resourceVal)}</p>// Return resourceVal if it exists  
          }  
          return ''; // Return an empty string or handle the case for Project if needed  
      },  
      visible: true,  
    });
    columns.push({  
      header: 'تخصیص ثبت شده',  
      accessor: (project: Project | ProjectWithResource): JSX.Element | string => {  
          // Check if project is of type ProjectWithResource  
          let pt:PROJECTETEBAR|undefined=undefined
          if ('resourceVal' in project) {  
              pt=projectsTakhsis.find(pt=>pt.projectId===project.id && pt.resourceValueId===project.resourceValueId)
              //console.log('pt',pt)
              return  <p className='text-purple-600 font-bold text-sm'>{convertToFarsiDigits(pt?.validity)}</p> 
          }  
          return ''; // Return an empty string or handle the case for Project if needed  
      },  
      visible: true,  
    });   
  }
//-----------------------------------------------------------------------------------------------------------  
  return (  
    <>
      {!isLoading && <ProjectCount label='تعداد پروژه های توزیع اعتبار شده:' count={totalCount}/>}

      <div>
        <div className="mb-2 flex flex-wrap gap-2">  
          {visibleColumns.map((col, index) => (  
            <Button 
              label={col.visible ? `عدم نمایش ${col.label}` : `نمایش ${col.label}`}  
              key={index}
              onClick={() => toggleColumnVisibility(index)}  
              variant='px-2 py-1 text-sm bg-purple-400 text-white rounded hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400'
            />
          ))}  
        </div>  

        <table className="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">  
          <thead className="text-xs text-gray-700 uppercase bg-purple-100 dark:bg-gray-700 dark:text-gray-400">  
            <tr>  
              {columns.map(  
                (column, index) =>  
                  column.visible && (  
                    <th key={index} className="p-2">  
                      {column.header}  
                    </th>  
                  )  
              )}  
            </tr>  
          </thead>  
          <tbody className='w-full'>  
            {data?.pages.map((page) =>  
              page?.items!==undefined && page.items.length > 0 
              ? ( 
                  page.items.map((project, i:number)  => {
                    let projectContent:JSX.Element  
                    if (page.items.length === i + 1) {
                      projectContent=  <Project ref={lastProjectRef} key={project.id} 
                        columns={columns} 
                        project={project}
                        projectsShowEtebar={projectsShowTakhsis} 
                        setProjectsShowEtebar={setProjectsShowTakhsis}
                      />
                    }
                    else projectContent= <Project key={project.id} 
                      columns={columns} 
                      project={project} 
                      projectsShowEtebar={projectsShowTakhsis} 
                      setProjectsShowEtebar={setProjectsShowTakhsis}
                    />
                    return <> {projectContent} 
                    {<tr className='w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-custom-hover'>  
                        <td colSpan={9} className='w-full place-content-center'>  
                          {checkVisibility(project.id,projectsShowTakhsis) && (  
                            <ProjectTakhsisTable projectId={project.id} />  
                          )}  
                        </td>  
                      </tr> }  
                    </>
                  } )        
              )
              : (  
                  <tr>  
                    <td colSpan={11}>  
                      <p className='text-lg'>هیچ پروژه ای یافت نشد</p>  
                    </td>  
                  </tr>  
                  
                )  
            )}  
          </tbody>  
        </table>  
        {isFetchingNextPage && <p className="center">بارگزاری پروژه های بیشتر...</p>}  
        {totalCount>20 && !isFetchingNextPage && !isLoading && <p className="center"><a href="#top">برگشت به ابتدا</a></p>}  
      </div>
    </>
  );  
};  

export default ProjectsEtebarTable; 