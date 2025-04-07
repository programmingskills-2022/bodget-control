import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData } from "./projectsStore"
import { config } from "../config"

interface projectTypesState{
    projectTypes : DIFINATION[]
    getProjectTypes: () => Promise<void>
}

export const useProjectTypesStore = create<projectTypesState>()(
    devtools((set)=>{
        return{
            projectTypes:[],
            getProjectTypes: async ()=>{
                const projectTypes = await fetchData(config.api.ProjectTypes_URL)
                set({projectTypes})
            }
        }
    })
)