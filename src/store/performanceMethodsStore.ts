import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData } from "./projectsStore"
import { config } from "../config"

interface PerformanceMethodsState{
    performanceMethods : DIFINATION[]
    getPerformanceMethods: () => Promise<void>
}

export const usePerformanceMethodsStore = create<PerformanceMethodsState>()(
    devtools((set)=>{
        return{
            performanceMethods:[],
            getPerformanceMethods: async ()=>{
                const performanceMethods = await fetchData(config.api.PerformanceMethods_URL)
                set({performanceMethods})
            }
        }
    })
)