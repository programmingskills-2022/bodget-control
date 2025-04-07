import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData } from "./projectsStore"
import { config } from "../config"

interface AreasState{
    areas : AREA[]
    getAreas: () => Promise<void>
    areasWithCity:AreaWithCity[]
    getAreasWithCity:()=>Promise<void>
}

export const useAreasStore = create<AreasState>()(
    devtools((set)=>{
        return{
            areas:[],
            areasWithCity:[],
            getAreas: async ()=>{
                const areas = await fetchData(config.api.Areas_URL)
                set({areas})
            },
            getAreasWithCity: async ()=>{
                const areas = await fetchData(`${config.api.Areas_URL}`)

                set({areasWithCity: areas?.map((a:AREA)=>
                {
                    const area={
                        id:a.id,
                        code:a.code,
                        employeeId:a?.employeeId,
                        cityId:a?.cityId,
                        partId:a?.partId,
                        cityName:a.city?.name,
                        partName:a.part?.name,
                        employeeName:a.employee?.lName
                    }
                    return area
                }
                )})
            }
        }
    })
)