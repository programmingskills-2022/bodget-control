import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData } from "./projectsStore"
import { config } from "../config"

interface ApprovalAuthoritiesState{
    approvalAuthorities : DIFINATION[]
    getApprovalAuthorities: () => Promise<void>
}

export const useApprovalAuthoritiesStore = create<ApprovalAuthoritiesState>()(
    devtools((set)=>{
        return{
            approvalAuthorities:[],
            getApprovalAuthorities: async ()=>{
                const approvalAuthorities = await fetchData(config.api.ApprovalAuthorities_URL)
                set({approvalAuthorities})
            }
        }
    })
)