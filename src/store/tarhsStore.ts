import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData } from "./projectsStore"
import { config } from "../config"

interface TarhsState{
    tarhs : TARH[]
    tarhsByBarnamehId:TARH[]
    getTarhs: () => Promise<void>
    getTarhsByBarnamehId: (barnamehId:string) => Promise<void>
}

export const useTarhsStore = create<TarhsState>()(
    devtools((set)=>{
        return{
            tarhs:[],
            tarhsByBarnamehId:[],
            getTarhs: async ()=>{
                const tarhs = await fetchData(config.api.Tarhs_URL)
                set({tarhs})
            },
            getTarhsByBarnamehId: async (barnamehId)=>{
                const tarhsByBarnamehId = await fetchData(`${config.api.Tarhs_URL}/${barnamehId}`)
                set({tarhsByBarnamehId})
            }
        }
    })
)