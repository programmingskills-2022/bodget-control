import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData } from "./projectsStore"
import { config } from "../config"

interface PartsState{
    parts:PART[]
    partsByCityId : PART[]
    getParts:()=>Promise<void>
    getPartsByCityId: (cityId: string) => Promise<void>
}

export const usePartsStore = create<PartsState>()(
    devtools((set)=>{
        return{
            parts:[],
            partsByCityId:[],
            getParts:async()=>{
                const parts = await fetchData(`${config.api.Parts_URL}`)
                set({parts})                
            },
            getPartsByCityId: async (cityId)=>{
                const partsByCityId = await fetchData(`${config.api.Parts_URL}/${cityId}`)
                set({partsByCityId})
            }
        }
    })
)