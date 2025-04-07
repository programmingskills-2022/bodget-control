import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData } from "./projectsStore"
import { config } from "../config"

interface FaslsState{
    fasls : FASL[]
    faslsByAffairId: FASL[]
    getFasls: () => Promise<void>
    getFaslsByAffairId: (affairId:string) => Promise<void>
}

export const useFaslsStore = create<FaslsState>()(
    devtools((set)=>{
        return{
            fasls:[],
            faslsByAffairId:[],
            getFasls: async ()=>{
                const fasls = await fetchData(config.api.Fasls_URL)
                set({fasls})
            },
            getFaslsByAffairId: async (affairId)=>{
                const faslsByAffairId = await fetchData(`${config.api.Fasls_URL}/${affairId}`)
                set({faslsByAffairId})
            }
        }
    })
)