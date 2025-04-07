import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData } from "./projectsStore"
import { config } from "../config"

interface PeriodsState{
    periods : PERIOD[]
    getPeriods: (isEtebar:boolean) => Promise<void>
}

export const usePeriodsStore = create<PeriodsState>()(
    devtools((set)=>{
        return{
            periods:[],
            getPeriods: async (isEtebar)=>{
                const periods = await fetchData(`${config.api.Periods_URL}?isEtebar=${isEtebar? 'true' : 'false'}`)
                set({periods})
            }
        }
    })
)