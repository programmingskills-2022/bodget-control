import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData } from "./projectsStore"
import { config } from "../config"

interface CitiesState{
    cities : CITY[]
    getCities: () => Promise<void>
}

export const useCitiesStore = create<CitiesState>()(
    devtools((set)=>{
        return{
            cities:[],
            getCities: async ()=>{
                const cities = await fetchData(`${config.api.Cities_URL}`)
                set({cities})
            }
        }
    })
)