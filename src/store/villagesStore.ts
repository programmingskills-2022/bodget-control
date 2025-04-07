import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData } from "./projectsStore"
import { config } from "../config"

interface VillagesState{
    villages:VILLAGE[]
    villagesByPartId : VILLAGE[]
    getVillages: () => Promise<void>
    getVillagesByPartId: (partId:string) => Promise<void>
}

export const useVillagesStore = create<VillagesState>()(
    devtools((set)=>{
        return{
            villages:[],
            villagesByPartId:[],
            getVillages:async()=>{
                const villages = await fetchData(`${config.api.Villages_URL}`)
                set({villages})
            },
            getVillagesByPartId: async (partId)=>{
                const villagesByPartId = await fetchData(`${config.api.Villages_URL}/${partId}`)
                set({villagesByPartId})
            }
        }
    })
)