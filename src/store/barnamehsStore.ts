import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData } from "./projectsStore"
import { config } from "../config"

interface BarnamehsState{
    barnamehs : BARNAMEH[]
    barnamehsByFaslId: BARNAMEH[]
    getBarnamehs: () => Promise<void>
    getBarnamehsByFaslId: (faslId:string) => Promise<void>
}

export const useBarnamehsStore = create<BarnamehsState>()(
    devtools((set)=>{
        return{
            barnamehs:[],
            barnamehsByFaslId:[],
            getBarnamehs: async ()=>{
                const barnamehs = await fetchData(config.api.Barnamehs_URL)
                set({barnamehs})
            },
            getBarnamehsByFaslId: async (faslId)=>{
                const barnamehsByFaslId = await fetchData(`${config.api.Barnamehs_URL}/${faslId}`)
                set({barnamehsByFaslId})
            }
        }
    })
)