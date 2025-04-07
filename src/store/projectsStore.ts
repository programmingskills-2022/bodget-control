import axios from 'axios';  
import { create } from 'zustand';  
import { devtools } from 'zustand/middleware';  
import { config } from '../config';  

interface ProjectState {  
    isLoading:boolean
    totalCount:number; //keep just projects that were filtered
    count:number; //keep all projects number
    selectedProject : Project|null
    projects: Project[]; // Hold an array of projects  
    allProjects: Project[]; // Hold an array of projects  
    projectsEtebarList: ProjectEtebarList[]
    allProjectsEtebarList: ProjectEtebarList[]
    getProjects: (pageParam:number,cityId?: Action, organId?: Action, faslId?: Action, barnamehId?: Action, employeeSearchId?: Action, projectCode?: string) => Promise<{items:Project[],totalCount:number}>;  
    getAllProjects: (pageParam:number,cityId?: Action, organId?: Action, faslId?: Action, barnamehId?: Action, employeeSearchId?: Action, projectCode?: string) => Promise<{items:Project[],totalCount:number}>;  
    init:() => void
    getById: (projectId:string)=> Promise<Project>
    add:(project:ProjectWithoutId) => Promise<Project>
    getCount:()=>Promise<number>
    getProjectsEtebarList:(pageParam:number,cityId?: Action, organId?: Action, faslId?: Action, barnamehId?: Action, employeeSearchId?: Action, projectCode?: string) => Promise<{items:ProjectEtebarList[],totalCount:number}>;  
    getAllProjectsEtebarList:(pageParam:number,cityId?: Action, organId?: Action, faslId?: Action, barnamehId?: Action, employeeSearchId?: Action, projectCode?: string) => Promise<{items:ProjectEtebarList[],totalCount:number}>;  
}  

export async function fetchData(url: string) {  
    let data = null;  

    try {  
        const response = await axios.get(url);  
        data = response.data;  
    } catch (error) {  
        console.error('Error fetching data:', error);  
        // Handle error as needed  
    }  
    
    return data;  
}  

export async function postData(url: string, jsonObj: string) {
    try {
      // Sending POST request
      const response = await axios.post(url, jsonObj, {
        headers: {
          'Content-Type': 'application/json', // Set the content type if necessary
          // 'Authorization': 'Bearer your_token' // Include if you need to send an auth token
        },
      });
      return response.data; // Return the parsed JSON data directly
    } catch (error) {
      // Handling errors
      console.error('Error posting data:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }

  export async function putData(url: string, jsonObj: string) {
    try {
      // Sending PUT request
      const response = await axios.put(url, jsonObj, {
        headers: {
          'Content-Type': 'application/json', // Set the content type if necessary
          // 'Authorization': 'Bearer your_token' // Include if you need to send an auth token
        },
      });
      return response.data; // Return the parsed JSON data directly
    } catch (error) {
      // Handling errors
      console.error('Error putting data:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }

  export async function deleteData(url: string) {
    try {
      // Sending PUT request
      const response = await axios.delete(url, {
        headers: {
          'Content-Type': 'application/json', // Set the content type if necessary
          // 'Authorization': 'Bearer your_token' // Include if you need to send an auth token
        },
      });
      return response.data; // Return the parsed JSON data directly
    } catch (error) {
      // Handling errors
      console.error('Error putting data:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }
// Create Zustand store  
export const useProjectStore = create<ProjectState>()(  
    devtools((set,get) => {  
        return {  
            totalCount:0,
            count:0, 
            selectedProject : {},
            projects: [], // Initialize with an empty array  
            allProjects:[],
            projectsEtebarList:[],
            allProjectsEtebarList:[],
            getProjects: async (pageParam=1, cityId = null, organOstanId= null, faslId = null, barnamehId = null, employeeSearchId = null, projectCode = '') => {  

                const urlParams: string = `?organOstanId=${organOstanId ?? ''}&projectCode=${projectCode}&cityId=${cityId ?? ''}&faslId=${faslId ?? ''}&barnamehId=${barnamehId ?? ''}&employeeSearchId=${employeeSearchId ?? ''}`;  
                console.log(`getProjects url = ${config.api.Projects_URL}${urlParams}&pageNumber=${pageParam}&pageSize=100`)
                try {  
                    set({isLoading:true})
                    const response = await axios.get(`${config.api.Projects_URL}${urlParams}&pageNumber=${pageParam}&pageSize=100`);  
                    
                    console.log('response.data?.totalCount=',response.data.totalCount===null ? 0 :response.data.totalCount)
                    set({totalCount: response.data.totalCount===null ? 0 :response.data.totalCount})
                    if (response.data.items?.length !== 0) 
                        set({ isLoading:false,
                              projects:response.data.items ,
                              totalCount: response.data.totalCount===null ? 0 :response.data.totalCount,
                              selectedProject:null}); // Append new projects to the existing 
                    return response.data;
                } catch (error) {  
                    console.error('خطای دریافت داده', error);  
                } 
            } , 

            getAllProjects: async (pageParam=1, cityId = null, organOstanId= null, faslId = null, barnamehId = null, employeeSearchId = null, projectCode = '') => {  

                const urlParams: string = `?organOstanId=${organOstanId ?? ''}&projectCode=${projectCode}&cityId=${cityId ?? ''}&faslId=${faslId ?? ''}&barnamehId=${barnamehId ?? ''}&employeeSearchId=${employeeSearchId ?? ''}`;  
                console.log(`getAllProjects url = ${config.api.Projects_URL}${urlParams}&pageNumber=${pageParam}`)
                try {  
                    set({isLoading:true})
                    const response = await axios.get(`${config.api.Projects_URL}${urlParams}&pageNumber=${pageParam}`);  
                    console.log('GetAllProjects',response.data.totalCount===null ? 0 :response.data.totalCount,response.data.items)  
                    
                    set({totalCount: response.data.totalCount===null ? 0 :response.data.totalCount,
                      selectedProject:null})                  
                    if (response.data.items?.length !== 0) 
                        set({
                            isLoading:false,
                            allProjects: response.data.items,
                            totalCount: response.data?.totalCount ,
                        }); // Append new projects to the existing 
                    return response.data;
                } catch (error) {  
                    console.error('خطای دریافت داده', error);  
                } 
            } , 

            init: ()=>{
                set({isLoading:false ,projects:[],selectedProject:null})
                
            },

            getById: async(projectId)=>{
                const project = await fetchData(`${config.api.ProjectById_URL}/${projectId}`)
                set({selectedProject:project})
            },

            add: async (newProject: Project) => {
                //console.log('newGroupProject',JSON.stringify(newProject))
                try {
                  const project = await postData(config.api.Projects_URL, JSON.stringify(newProject));
                  //console.log(get().projects,project)
                  if (project) {
                    get().getById(project.id)
                    set((state) => ({
                      projects: [...state.projects, project],selectedProject:project
                    }));
                  }
                  return project
                } catch (error) {
                  console.error('خطای درج پروژه جدید', error);
                }
            },

            getCount:async ()=>{
              const count = await fetchData(`${config.api.Projects_URL}/count`)
              set({count ,selectedProject:null})
            },

            getProjectsEtebarList: async (pageParam=1, cityId = null, organOstanId= null, faslId = null, barnamehId = null, employeeSearchId = null, projectCode = '') => {  

              const urlParams: string = `?organOstanId=${organOstanId ?? ''}&projectCode=${projectCode}&cityId=${cityId ?? ''}&faslId=${faslId ?? ''}&barnamehId=${barnamehId ?? ''}&employeeId=${employeeSearchId ?? ''}`;  
              console.log(`getProjectsEtebarList url = ${config.api.ProjectsEtebar_URL}/list${urlParams}&pageNumber=${pageParam}&pageSize=100`)
              try {  
                  set({isLoading:true})
                  const response = await axios.get(`${config.api.ProjectsEtebar_URL}/list${urlParams}&pageNumber=${pageParam}&pageSize=100`); 

                  //const response1 = await axios.get(`${config.api.ProjectsEtebar_URL}/list${urlParams}&pageNumber=${pageParam}`);   

                  console.log('response.data?.totalCount=',response.data.totalCount===null ? 0 :response.data.totalCount)
                  set({totalCount: response.data.totalCount===null ? 0 :response.data.totalCount})
                  if (response.data.items?.length !== 0 
                  //  && response1.data.items?.length !== 0
                  ) 
                      set({ isLoading:false,
                            projectsEtebarList:response.data.items ,
                            totalCount: response.data?.totalCount ,
                          //  allProjectsEtebarList:response1.data.items ,
                          });                   
                  
                  return response.data;
              } catch (error) {  
                  console.error('خطای دریافت داده', error);  
              } 
            } ,       

            getAllProjectsEtebarList: async (pageParam=1, cityId = null, organOstanId= null, faslId = null, barnamehId = null, employeeSearchId = null, projectCode = '') => {  

              const urlParams: string = `?organOstanId=${organOstanId ?? ''}&projectCode=${projectCode}&cityId=${cityId ?? ''}&faslId=${faslId ?? ''}&barnamehId=${barnamehId ?? ''}&employeeId=${employeeSearchId ?? ''}`;  
              console.log(`getAllProjectsEtebarList url = ${config.api.ProjectsEtebar_URL}/list${urlParams}&pageNumber=${pageParam}`)
              try {  
                  const response = await axios.get(`${config.api.ProjectsEtebar_URL}/list${urlParams}&pageNumber=${pageParam}`);  
                  
                  console.log('response.data?.totalCount=',response.data.totalCount===null ? 0 :response.data.totalCount)
                  
                  //set({totalCount: response.data.totalCount===null ? 0 :response.data.totalCount})
                  if (response.data.items?.length !== 0) 
                      set({  allProjectsEtebarList:response.data.items ,}); 
                  return response.data;
              } catch (error) {  
                  console.error('خطای دریافت داده', error);  
              } 
            } ,       
        };  
    })  
); 