import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData } from "./projectsStore"
import { config } from "../config"

interface AffairsState{
    affairs : AFFAIR[]
    getAffairs: () => Promise<void>
}

export const useAffairsStore = create<AffairsState>()(
    devtools((set)=>{
        return{
            affairs:[],
            getAffairs: async ()=>{
                const affairs = await fetchData(config.api.Affairs_URL)
                set({affairs})
            }
        }
    })
)