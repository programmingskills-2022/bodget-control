import { useInfiniteQuery } from "react-query"
import { useContext } from "../../contexts/context";
import { useProjectStore } from "../../store/projectsStore";
import { useAuthStore } from "../../store/authStore";
import { useResourceValuesStore } from "../../store/resourceValuesStore";
import { useCallback, useEffect, useRef, } from "react";
import RpProject from "./RpProject";
import ProjectCount from "./ProjectCount";

const RpProjectsEtebarTable = () => {

  const {  
    getProjectsEtebarList
    } = useProjectStore();  

  const {totalCount,isLoading}=useProjectStore()    
  const { isAuthenticated,loginInfo } = useAuthStore();  
  const {resourcesJust,getResourcesJust}=useResourceValuesStore();

  const {citySearch,organOstanSearch,faslSearch,barnamehSearch,employeeSearch,projectCode  
    } = useContext();  

   
  const {  
    fetchNextPage, //function  
    hasNextPage, // boolean  
    isFetchingNextPage, // boolean  
    data,  
    status,  
    error  
  } = useInfiniteQuery(['rpProjectsEtebarList',{citySearch,  
    organOstanSearch,  
    faslSearch,  
    barnamehSearch,  
    employeeSearch,  
    projectCode  
    }], ({ pageParam = 1 }) =>getProjectsEtebarList(pageParam,citySearch,  
      organOstanSearch,  
      faslSearch,  
      barnamehSearch,   
      isAuthenticated && !loginInfo?.user?.unlimited ? loginInfo?.user?.employee.id : employeeSearch!==null ? employeeSearch : '',  
      projectCode), {  
    getNextPageParam:(lastPage,allPages)=>{  
          const maxPages = lastPage?.totalCount ? Math.ceil(lastPage.totalCount / 100) : 0;  
          const nextPage= allPages.length + 1  
          //console.log('maxpages,nextpages',maxPages,nextPage)
          return nextPage<=maxPages ? nextPage :undefined  
    }  
  }) 


  //console.log(allProjectsEtebarList)
  useEffect(()=>{
    getResourcesJust(false)
  },[])

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
  return (
    <>
    {isLoading ? null : <ProjectCount label='تعداد پروژه ها:' count={totalCount}/>}  
    <table className="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">  
        <thead className='text-xs text-gray-700 uppercase bg-purple-100 dark:bg-gray-700 dark:text-gray-400'>  
            <tr >  
                <th className=" p-2">کد پروژه</th>  
                <th className=" p-2">نام پروژه</th>  
                <th className=" p-2">نام دستگاه</th>  
                <th className=" p-2">فصل</th>  
                <th className=" p-2">برنامه</th>  
                <th className=" p-2">طرح</th>  
                <th className=" p-2">شهرستان</th>     
                {
                    resourcesJust.map((r)=>
                        <th className=" p-2 border-b border-r ">{r.name}</th>
                    )
                }      
            </tr>  
        </thead>  
        <tbody>            
            {data?.pages.map((page) =>  
              page?.items!==undefined && page.items.length > 0  
            ? (
                <>
                    {
                        page.items.map((project:ProjectEtebarList , i: number)=>{
                            let projectContent:JSX.Element  
                            if (page.items.length === i + 1) {
                              projectContent= <RpProject ref={lastProjectRef} key={project.projectId} project={project}/>
                            }
                            else {
                              projectContent= <RpProject key={project.projectId} project={project}/>
                            }
                            return <>{projectContent} </>
                          }
                        )
                    }                
                </>
                )              
            : page?.totalCount===0 ?(  
                <tr>  
                  <td colSpan={11}>  
                    <p className='text-lg'>هیچ پروژه ای یافت نشد</p>  
                  </td>  
                </tr>  

              ) :<></> )
            }
        </tbody>  
    </table> 
    {isFetchingNextPage && <p className="center">بارگزاری پروژه های بیشتر...</p>}  
    {totalCount>20 && !isFetchingNextPage && !isLoading && <p className="center"><a href="#top">برگشت به ابتدا</a></p>}  
     </>
  )
}

export default RpProjectsEtebarTable