import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData, postData } from "./projectsStore";
import { config } from "../config";


interface ProjectsEtebarDtlState{
    projectEtebarDtls:PROJECTETEBARDTL[]
    getByProjectEtebarId:(projectId:string)=>Promise<void>
    addDetail:(newProjectsEtebarDtl:ProjectEtebarDtlWithoutId)=>Promise<PROJECTETEBARDTL>
}

export const useProjectsEtebarDtlStore=create<ProjectsEtebarDtlState>()(
    devtools((set)=>{
        return{
            projectsEtebarDtl:[],
            getByProjectEtebarId : async (projectEtebarId) =>
            {
                const projectEtebarDtls = await fetchData(`${config.api.ProjectsEtebarDtl_URL}/${projectEtebarId}`)
                console.log('projectsEtebarDtls',projectEtebarDtls)
                set( {projectEtebarDtls})
            },
            addDetail: async (newProjectsEtebarDtl) => {
                try {
                  await postData(config.api.ProjectsEtebarDtl_URL, JSON.stringify(newProjectsEtebarDtl));
                } catch (error) {
                  console.error('خطای تغییر اعتبار', error);
                }
              },

        }
    })    
)