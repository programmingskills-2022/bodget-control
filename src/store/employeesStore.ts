import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData } from "./projectsStore"
import { config } from "../config"

interface EmployeesState{
    sazmanEmployees : EMPLOYEE[]
    othersEmployees : EMPLOYEE[]
    areaEmployees : EMPLOYEE[]
    getEmployees: (employeeTypeId:string) => Promise<void>
    getEmployeeByUserId:(userId:GUID) => EMPLOYEE
}

export const useEmployeesStore = create<EmployeesState>()(
    devtools((set)=>{
        return{
            sazmanEmployees:[],
            othersEmployees:[],
            areaEmployees:[],
            getEmployees: async (employeeTypeId)=>{
                const employees = await fetchData(`${config.api.Employees_URL}/${employeeTypeId}`)
                switch (employeeTypeId) {
                    case config.employeeType_Sazman:
                        set({sazmanEmployees:employees})
                        break;
                    case config.employeeType_Others:
                        set({othersEmployees:employees})
                        break
                    case config.employeeType_Area:
                        set({areaEmployees:employees})
                        break
                    default:
                        break;
                }
            },
            getEmployeeByUserId:async(userId)=>{
                const users:USER[] = await fetchData(`${config.api.Users_URL}`) 
                const user= users.find(u=>u.id===userId)
                if (user!==undefined)
                    return user.employee
                return null
            }
        }
    })
)