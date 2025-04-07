import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData } from "./projectsStore"
import { config } from "../config"

interface ResourcesState{
    resources : RESOURCE[]
    getResources: () => Promise<void>
}

export const useResourcesStore = create<ResourcesState>()(
    devtools((set)=>{
        return{
            resources:[],
            getResources: async ()=>{
                const resources = await fetchData(config.api.Resources_URL)
                set({resources})
            }
        }
    })
)