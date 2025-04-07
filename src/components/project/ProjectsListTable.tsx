import {  useInfiniteQuery } from 'react-query';  
import { useProjectStore } from '../../store/projectsStore';  
import { useAuthStore } from '../../store/authStore';  
import { useContext } from '../../contexts/context';  
import ProjectCount from './ProjectCount';  
import { useCallback, useEffect, useRef, useState } from 'react';  
import Project from './Project';  
import useProjectTableColumns from '../../hooks/useProjectTableColumns';  
import Button from '../UI/Button';  
import ProjectsEtebarListTable from '../projectEtebar/ProjectsEtebarListTable';  
import Textbox from '../UI/TextBox';  


type Props = {  
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
  handleAdd?:(projectId:  Project|ProjectWithResource | null) => Promise<void>  
};  

const ProjectsListTable = ({  
  etebar,  
  isGroup,  
  // isEdit  
  validityMap,  
  setValidityMap,  
  handleAdd  
   }: Props) => {  


  useEffect(()=>{  
    console.log('validityMap',validityMap)  
  },[validityMap])  

  const {  
    getProjects,  
    } = useProjectStore();  

  const { isAuthenticated,loginInfo } = useAuthStore();  

  const {totalCount,isLoading}=useProjectStore()  

  const {citySearch,organOstanSearch,faslSearch,barnamehSearch,employeeSearch,projectCode  
    } = useContext();  

  const {columns,visibleColumns,toggleColumnVisibility,checkVisibility} = useProjectTableColumns()  

  const [projectsShowEtebar,setProjectsShowEtebar]=useState<ProjectsShowEtebar[]>([])  

//-------------------------------------------------------------------------------------  
  const {  
    fetchNextPage, //function  
    hasNextPage, // boolean  
    isFetchingNextPage, // boolean  
    data,  
    status,  
    error  
  } = useInfiniteQuery(['ProjectsRepositories',{citySearch,  
    organOstanSearch,  
    faslSearch,  
    barnamehSearch,  
    employeeSearch,  
    projectCode  
    }], ({ pageParam = 1 }) =>getProjects(pageParam,citySearch,  
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
      setProjectsShowEtebar(newProjects);  
    }  
  }, [data]);  

//------------------------------------------------------------------------------------------------  
  const intObserver = useRef()  
//-------------------callback------------------------------------------------------------------------------  
const lastProjectRef = useCallback((project:Project) => {  
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
//-----------------------If we wanna addOne projectEtebar---------------------------------------------------  
if (!isGroup && etebar && validityMap!==undefined && setValidityMap!==undefined && handleAdd!==undefined)  
  {  
    columns.push(  
      {  
        header: 'اعتبار',  
        accessor: (project: Project ): JSX.Element | string =>  
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
              placeholder="اعتبار ..."  
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
        header: 'توضیحات',  
        accessor: (project: Project ): JSX.Element | string =>  
        {  
          return  <div className='w-48 text-sm'>  
            <Textbox  
              value={validityMap[project.id]?.expertComment || ''}  
              type="text"  
              onChange={(e) => {  
                setValidityMap(prev => ({  
                  ...prev,  
                  [project.id]: {  
                    ...prev[project.id], // Preserve existing properties  
                    expertComment: e.target.value
                  },  
                }));  
              }}  
              placeholder="توضیحات ..."  
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
        accessor: (project: Project): JSX.Element | string =>  
        <Button  
          label='ثبت'  
          onClick={()=>handleAdd(project)}  
          variant='px-2 py-1 w-20 text-sm bg-green-100 text-green-600 rounded hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-600'  
         />  
        ,  
        visible: true,  
      });  

  }  

  return (  
    <>  
      {isLoading ? null : <ProjectCount label='تعداد پروژه ها:' count={totalCount}/>}  
       <div>  
        <div className="mb-2 flex flex-wrap gap-2">  
          {visibleColumns.map((col, index) => (  
            <Button  
              key={index}  
              label={col.visible ? `عدم نمایش ${col.label}` : `نمایش ${col.label}`}  
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
                 <>  
                    {page.items.map((project:Project, i:number)  => {  
                      let projectContent:JSX.Element  
                      if (page.items.length === i + 1) {  
                        projectContent= <Project ref={lastProjectRef} key={project.id}  
                          columns={columns}  
                          project={project}  
                          projectsShowEtebar={projectsShowEtebar}
                          setProjectsShowEtebar={setProjectsShowEtebar}
                         />  
                      }  
                      else projectContent = <Project key={project.id}  
                        columns={columns}  
                        project={project}  
                        projectsShowEtebar={projectsShowEtebar}
                        setProjectsShowEtebar={setProjectsShowEtebar}
                      />  
                      return <> 
                        {projectContent}  
                        {etebar && 
                        <tr className='w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-custom-hover'>  
                          <td colSpan={9} className='w-full place-content-center'>  
                            {checkVisibility(project.id,projectsShowEtebar) && (  
                              <ProjectsEtebarListTable projectId={project.id} more={false} mode={false} />  
                            )}  
                          </td>  
                        </tr> }  
                      </>  
                    } )}  
                  </>  
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
      </div>   

      {isFetchingNextPage && <p className="center">بارگزاری پروژه های بیشتر...</p>}  
      {totalCount>20 && <p className="center"><a href="#top">برگشت به ابتدا</a></p>}  
    </>  
  );  
};  

export default ProjectsListTable;  