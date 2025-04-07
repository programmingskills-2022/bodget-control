import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData } from "./projectsStore"
import { config } from "../config"

interface MotevazenFaslsState{
    motevazenFasls : MOTEVAZENFASL[]
    motevazenFaslsByPartId:MOTEVAZENFASL[]
    getMotevazenFasls: () => Promise<void>
    getMotevazenFaslsByPartId:(partId:string) =>Promise<void>
}

export const useMotevazenFaslsStore = create<MotevazenFaslsState>()(
    devtools((set)=>{
        return{
            motevazenFasls:[],
            getMotevazenFasls: async ()=>{
                const motevazenFasls = await fetchData(config.api.MotevazenFasls_URL)
                set({motevazenFasls})
            },
            getMotevazenFaslsByPartId:async (partId)=>{
                const motevazenFaslsByPartId = await fetchData(`${config.api.MotevazenFasls_URL}/${partId}`)
                set({motevazenFaslsByPartId})
            }
        }
    })
)