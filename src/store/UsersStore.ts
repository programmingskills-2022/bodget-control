import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData } from "./projectsStore"
import { config } from "../config"

interface UsersState{
    users : AFFAIR[]
    getUsers: () => Promise<void>
}

export const useUsersStore = create<UsersState>()(
    devtools((set)=>{
        return{
            users:[],
            getUsers: async ()=>{
                const users = await fetchData(config.api.Users_URL)
                set({users})
            }
        }
    })
)