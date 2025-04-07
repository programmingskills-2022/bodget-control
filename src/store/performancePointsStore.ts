import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData } from "./projectsStore"
import { config } from "../config"

interface performancePointsState{
    performancePoints:PERFORMANCEPOINT[]
    performancePointsByVillageId : PERFORMANCEPOINT[]
    getPerformancePoints: () => Promise<void>
    getPerformancePointsByVillageId: (villageId:string) => Promise<void>
}

export const usePerformancePointsStore = create<performancePointsState>()(
    devtools((set)=>{
        return{
            performancePoints:[],
            performancePointsByVillageId:[],

            getPerformancePoints: async ()=>{
                const performancePoints = await fetchData(`${config.api.PerformancePoints_URL}`)
                set({performancePoints})
            },
            getPerformancePointsByVillageId: async (villageId)=>{
                const performancePointsByVillageId = await fetchData(`${config.api.PerformancePoints_URL}/${villageId}`)
                set({performancePointsByVillageId})
            }
        }
    })
)