import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData, postData, putData } from "./projectsStore";
import { config } from "../config";


interface ProjectsTakhsisState{
    projectsTakhsis:PROJECTETEBAR[]
    projectTakhsis:PROJECTETEBAR[]
    projectTakhsisInAResource : PROJECTETEBAR[]
    projectsTakhsisInAResource : PROJECTETEBAR[]
    projectsTakhsisSum:ProjectEtebarSum[]
    projectsTakhsisSumCity:ProjectEtebarSumCity[]
    projectsTakhsisSumById: ProjectEtebarSumById[]
    getAll:()=>Promise<void>
    getByProjectId:(projectId:string)=>Promise<void>
    getByResourceValueId:(resourceValueId:string)=>Promise<void>
    getSumTakhsis:(periodId?:string)=>Promise<void>
    getSumTakhsisCity:(cityId:GUID ) =>Promise<void>
    getByProjectIdAndResourceId :(projectId:GUID|string|undefined,resourceId:GUID|string|undefined) =>Promise<void>
    getSumByProjectId:(projectId:GUID|string|undefined)=>Promise<void>
    add:(newProjectsTakhsis:ProjectEtebarWithoutId)=>Promise<PROJECTETEBAR>
    update:(id:string,projectTakhsis:ProjectEtebarWithoutId)=>Promise<PROJECTETEBAR>
}

export const useProjectsTakhsisStore=create<ProjectsTakhsisState>()(
    devtools((set)=>{
        return{
            projectsTakhsis:[],
            projectTakhsis:[],
            projectsTakhsisInAResource:[],
            projectTakhsisInAResource:[],
            projectsTakhsisSum:[],
            projectsTakhsisSumCity:[],
            getAll: async ()=>{
                const projectsTakhsis = await fetchData(`${config.api.ProjectsTakhsis_URL}`)
                set( {projectsTakhsis})
            },
            getByProjectId : async (projectId) =>
            {
                const projectTakhsis = await fetchData(`${config.api.ProjectsTakhsis_URL}/${projectId}`)
                set( {projectTakhsis})
            },
            getByResourceValueId :  async (resourceValueId) =>
              {
                  const projectsTakhsisInAResource = await fetchData(`${config.api.ProjectsTakhsis_URL}/findByResource/${resourceValueId}`)
                  set( {projectsTakhsisInAResource})
              },
            getSumTakhsis: async (periodId?:string)=>{
                const param= periodId!==undefined && periodId!==null ? `?periodId=${periodId}` : ''
                const projectsTakhsisSum = await fetchData(`${config.api.ProjectsTakhsisSum_URL}${param}`)
                set({projectsTakhsisSum})
            },
            getSumTakhsisCity : async (cityId)=>{
                if (cityId!==undefined)
                {
                    const projectsTakhsisSumCity = await fetchData(`${config.api.ProjectsTakhsisSumCity_URL}?cityId=${cityId}`)
                    set({projectsTakhsisSumCity})
                }
                else {
                    set({projectsTakhsisSumCity:[]})
                }
            },
            getByProjectIdAndResourceId: async(projectId,resourceId)=>{
                if (projectId!==undefined && resourceId!==undefined)
                {
                    const projectTakhsisInAResource = await fetchData(`${config.api.ProjectsTakhsis_URL}/${projectId}/${resourceId}`);  
                    set ({projectTakhsisInAResource})
                }
            },
            getSumByProjectId: async (projectId) =>{
                if (projectId!==undefined)
                {
                    const  projectsTakhsisSumById= await fetchData( `${config.api.ProjectsTakhsisSum_URL}/${projectId}`)
                    set ({projectsTakhsisSumById})
                }
            },
            add: async (newProjectsTakhsis) => {
                try {
                  const projectTakhsis = await postData(config.api.ProjectsTakhsis_URL, JSON.stringify(newProjectsTakhsis));
                  if (projectTakhsis) {
                    set((state) => ({
                      projectsTakhsis:[...state.projectsTakhsis,projectTakhsis],
                      projectTakhsis:[...state.projectTakhsis,projectTakhsis]   
                    }));
                    return projectTakhsis
                  }
                } catch (error) {
                  console.error('خطای افزودن تخصیص', error);
                }
            },
            update: async (id,updateProjectTakhsisRequest) => {
                try {
                  const projectTakhsis = await putData(`${config.api.ProjectsTakhsis_URL}/${id}`, JSON.stringify(updateProjectTakhsisRequest));
                  if (projectTakhsis===undefined)
                    return null
                  else {
                    set((state) => ({  
                        projectsTakhsis:state.projectsTakhsis.map((pts)=>
                          pts.id===id  ? {...pts, ...projectTakhsis} :pts
                        ) ,
                        projectTakhsis: state.projectTakhsis.map((pt) =>  
                          pt.id === id ? { ...pt, ...projectTakhsis } : pt  
                        ),  
                    }));  
                    return projectTakhsis
                  }
                } catch (error) {
                  console.error('خطای تغییر تخصیص', error);
                }
              },

        }
    })    
)