import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData } from "./projectsStore"
import { config } from "../config"

interface OrgansState{
    organs : ORGAN[]
    getOrgans: () => Promise<void>
}

export const useOrgansStore = create<OrgansState>()(
    devtools((set)=>{
        return{
            organs:[],
            getOrgans: async ()=>{
                const organs = await fetchData(config.api.Organs_URL)
                set({organs})
            }
        }
    })
)