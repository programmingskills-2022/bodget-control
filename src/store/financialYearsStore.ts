import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData } from "./projectsStore"
import { config } from "../config"

interface FinancialYearsState{
    financialYears : FINANCIALYEAR[]
    getFinancialYears: () => Promise<void>
}

export const useFinancialYearsStore = create<FinancialYearsState>()(
    devtools((set)=>{
        return{
            financialYears:[],
            getFinancialYears: async ()=>{
                const financialYears:FINANCIALYEAR[] = await fetchData(config.api.FinancialYears_URL)
                set({financialYears})
            },

        }
    })
)