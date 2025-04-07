import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData } from "./projectsStore"
import { config } from "../config"

interface GoalsState{
    goals : GOAL[]
    goalsByBarnamehId:GOAL[]
    getGoals: () => Promise<void>
    getGoalsByBarnamehId: (barnamehId:string) => Promise<void>
}

export const useGoalsStore = create<GoalsState>()(
    devtools((set)=>{
        return{
            goals:[],
            goalsByBarnamehId:[],
            getGoals: async ()=>{
                const goals = await fetchData(config.api.Goals_URL)
                set({goals})
            },
            getGoalsByBarnamehId: async (barnamehId)=>{
                const goalsByBarnamehId = await fetchData(`${config.api.Goals_URL}/${barnamehId}`)
                set({goalsByBarnamehId})
            }
        }
    })
)