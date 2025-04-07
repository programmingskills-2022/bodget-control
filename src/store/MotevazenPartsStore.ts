import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData } from "./projectsStore"
import { config } from "../config"

interface MotevazenPartsState{
    motevazenParts : MOTEVAZENPART[]
    getMotevazenParts: () => Promise<void>
}

export const useMotevazenPartsStore = create<MotevazenPartsState>()(
    devtools((set)=>{
        return{
            motevazenParts:[],
            getMotevazenParts: async ()=>{
                const motevazenParts = await fetchData(config.api.MotevazenParts_URL)
                set({motevazenParts})
            }
        }
    })
)