import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData } from "./projectsStore"
import { config } from "../config"

interface CollaborativesState{
    collaboratives : DIFINATION[]
    getCollaboratives: () => Promise<void>
}

export const useCollaborativesStore = create<CollaborativesState>()(
    devtools((set)=>{
        return{
            collaboratives:[],
            getCollaboratives: async ()=>{
                const collaboratives = await fetchData(config.api.Collaboratives_URL)
                set({collaboratives})
            }
        }
    })
)