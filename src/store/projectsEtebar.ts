import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData, postData, putData } from "./projectsStore";
import { config } from "../config";
import axios from "axios";


interface ProjectsEtebarState{
    allProjectsEtebar:PROJECTETEBAR[]
    isLoading:boolean
    totalCount:number; //keep just projects that were filtered
    projectsEtebar:PROJECTETEBAR[]
    projectEtebarInAResource : PROJECTETEBAR
    projectsEtebarInAResource : PROJECTETEBAR[]
    projectsEtebarSum:ProjectEtebarSum[]
    projectsWithAnEtebarResource : ProjectWithResource[]
    allProjectsWithAnEtebarResource : ProjectWithResource[]
    projectsEtebarSumCity:ProjectEtebarSumCity[]
    projectsEtebarSumById: ProjectEtebarSumById[]
    //getAll:()=>Promise<void>
    getByProjectId:(projectId:string)=>Promise<void>
    getByResourceValueId:(resourceValueId:string)=>Promise<void>
    getProjectsWithAnEtebarResource: (pageParam:number,resourceValueId:string, takhsisResourceValueId:string,cityId?: Action, organId?: Action, faslId?: Action, barnamehId?: Action, employeeSearchId?: Action, projectCode?: string) => Promise<{items:ProjectWithResource[],totalCount:number}>;  
    getAllProjectsWithAnEtebarResource: (pageParam:number,resourceValueId:string, takhsisResourceValueId:string,cityId?: Action, organId?: Action, faslId?: Action, barnamehId?: Action, employeeSearchId?: Action, projectCode?: string) => Promise<{items:ProjectWithResource[],totalCount:number}>;  
    getSum:()=>Promise<void>
    getSumCity:(cityId:GUID ) =>Promise<void>
    getByProjectIdAndResourceValueId :(projectId:GUID|string|undefined,resourceValueId:GUID|string|undefined) =>Promise<void>
    getSumByProjectId:(projectId:GUID|string|undefined)=>Promise<void>
    add:(newProjectsEtebar:ProjectEtebarWithoutId)=>Promise<PROJECTETEBAR>
    update:(id:string,projectEtebar:ProjectEtebarWithoutId)=>Promise<PROJECTETEBAR>

}

export const useProjectsEtebarStore=create<ProjectsEtebarState>()(
    devtools((set) => {  
        return{
            isLoading:false,
            allProjectsEtebar:[],
            totalCount:0,
            projectsEtebar:[],
            //TakhsisResourceValueId:context.resourceValueSearch,
            projectsEtebarInAResource:[],
            projectsWithAnEtebarResource:[],
            allProjectsWithAnEtebarResource:[],
            projectEtebarInAResource:null,
            projectsEtebarSum:[],
            projectsEtebarSumCity:[],
            // getAll: async ()=>{
            //     const allProjectsEtebar = await fetchData(`${config.api.ProjectsEtebar_URL}`)
            //     set( {allProjectsEtebar})
            // },
            getByProjectId : async (projectId) =>
            {
                const projectsEtebar = await fetchData(`${config.api.ProjectsEtebar_URL}/${projectId}`)

                set( {projectsEtebar})
            },

//get all projects that has etebar in a apecial resource with projects filter conditions
            getProjectsWithAnEtebarResource: async (pageParam=1,resourceValueId, takhsisResourceValueId,cityId = null, organOstanId= null, faslId = null, barnamehId = null, employeeSearchId = null, projectCode = '') => {  
              if (resourceValueId!=='')
              {
                const urlParams: string = `?organOstanId=${organOstanId ?? ''}&projectCode=${projectCode}&cityId=${cityId ?? ''}&faslId=${faslId ?? ''}&barnamehId=${barnamehId ?? ''}&employeeSearchId=${employeeSearchId ?? ''}`;  
                try {  

                    set({isLoading:true})
                    console.log('get:'+`${config.api.ProjectsEtebar_URL}/findByConditions/${resourceValueId}${urlParams}&pageNumber=${pageParam}&pageSize=100`)
                    const response = await axios.get(`${config.api.ProjectsEtebar_URL}/findByConditions/${resourceValueId}${urlParams}&pageNumber=${pageParam}&pageSize=100`);  
                
                    set({totalCount: response.data.totalCount===null ? 0 :response.data.totalCount})
                    console.log('response.data',response.data)
                    if (response.data.items?.length !== 0) 
                    {
                      const manipulatedData = {  
                        ...response.data,  
                        items: response.data.items.map(item=> ({  
                            ...item.project, // Spread the properties of item.project  
                            resourceVal: item.validity, // new field resourceVal  
                            resourceValueId:takhsisResourceValueId
                        }))  
                      };  
                      set({ projectsWithAnEtebarResource: 
                        manipulatedData.items,
                        //[...state.projectsWithAnEtebarResource, ...manipulatedData.items] ,
                        totalCount: manipulatedData?.totalCount ,
                        isLoading:false
                      }); // Append new projects to the existing                       
                      return manipulatedData
                    }
                } catch (error) {  
                    console.error('خطای دریافت داده', error);  
                }                                  
              }
            } , 

//get all projects that has etebar in a apecial resource with projects filter conditions
            getAllProjectsWithAnEtebarResource: async (pageParam=1,resourceValueId, takhsisResourceValueId, cityId = null, organOstanId= null, faslId = null, barnamehId = null, employeeSearchId = null, projectCode = '') => {  

              if (resourceValueId!=='')
              {
                const urlParams: string = `?organOstanId=${organOstanId ?? ''}&projectCode=${projectCode}&cityId=${cityId ?? ''}&faslId=${faslId ?? ''}&barnamehId=${barnamehId ?? ''}&employeeSearchId=${employeeSearchId ?? ''}`;  

                try {  

                    set({isLoading:true})

                    const response = await axios.get(`${config.api.ProjectsEtebar_URL}/findByConditions/${resourceValueId}${urlParams}&pageNumber=${pageParam}`);  
                
                    set({totalCount: response.data.totalCount===null ? 0 :response.data.totalCount})
                    if (response.data.items?.length !== 0) 
                    {
                      const manipulatedData = {  
                        ...response.data,  
                        items: response.data.items.map(item=> ({  
                            ...item.project, // Spread the properties of item.project  
                            resourceVal: item.validity, // new field resourceVal  
                            resourceValueId:takhsisResourceValueId,
                            isLoading:false
                        }))  
                      };  
                      set({ allProjectsWithAnEtebarResource: manipulatedData.items}); // Append new projects to the existing                       
                      return manipulatedData
                    }
                } catch (error) {  
                    console.error('خطای دریافت داده', error);  
                }                                  
              }
            } , 

            getByResourceValueId :  async (resourceValueId) =>
              {
                  const projectsEtebarInAResource = await fetchData(`${config.api.ProjectsEtebar_URL}/findByResource/${resourceValueId}`)
                  set( {projectsEtebarInAResource})
              },
            getSum: async ()=>{
                const projectsEtebarSum = await fetchData(config.api.ProjectsEtebarSum_URL)
                set({projectsEtebarSum})
            },
            getSumCity : async (cityId)=>{
                if (cityId!==undefined)
                {
                    const projectsEtebarSumCity = await fetchData(`${config.api.ProjectsEtebarSumCity_URL}?cityId=${cityId}`)
                    set({projectsEtebarSumCity})
                }
                else {
                    set({projectsEtebarSumCity:[]})
                }
            },
            getByProjectIdAndResourceValueId: async(projectId,resourceValueId)=>{
                if (projectId!==undefined && resourceValueId!==undefined)
                {
                    const projectEtebarInAResource = await fetchData(`${config.api.ProjectsEtebar_URL}/${projectId}/${resourceValueId}`);  
                    set ({projectEtebarInAResource})
                }
            },
            getSumByProjectId: async (projectId) =>{
                if (projectId!==undefined)
                {
                    const  projectsEtebarSumById= await fetchData( `${config.api.ProjectsEtebarSum_URL}/${projectId}`)
                    set ({projectsEtebarSumById})
                }
            },
            add: async (newProjectsEtebar) => {
                try {
                  const projectEtebar = await postData(config.api.ProjectsEtebar_URL, JSON.stringify(newProjectsEtebar));
                  if (projectEtebar) {
                    set((state) => ({
                      projectsEtebar: [...state.projectsEtebar, projectEtebar],    
                    }));
                    return projectEtebar
                  }
                } catch (error) {
                  console.error('خطای تغییر اعتبار', error);
                }
            },
            update: async (id,updateProjectEtebarRequest) => {
                try {
                  const projectEtebar = await putData(`${config.api.ProjectsEtebar_URL}/${id}`, JSON.stringify(updateProjectEtebarRequest));
                  if (projectEtebar===undefined)
                    return null
                  else {
                    set((state) => ({  
                        projectsEtebar: state.projectsEtebar.map((pe) =>  
                        pe.projectId === id ? { ...pe, ...projectEtebar } : pe  
                        ),  
                    }));  
                    return projectEtebar
                  }
                } catch (error) {
                  console.error('خطای تغییر اعتبار', error);
                }
              },


        }
    })    
)