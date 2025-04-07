import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData } from "./projectsStore"
import { config } from "../config"

type ORGANSJUST = {
    id:GUID
    code:string
    name:string
}

interface OrgansOstanState{
    organsJust: ORGANSJUST[] //include all organs codes and names and the id's of it's record in organOstans
    organOstanSearch:ORGANOSTAN
    getOrgansOstan: () => Promise<void>
    getByOrganId: (organId: string) => Promise<ORGANOSTAN>
}

export const useOrgansOstanStore = create<OrgansOstanState>()(
    devtools((set)=>{
        return{
            organsJust:[],
            organOstanSearch:{},
            getOrgansOstan: async ()=>{
                const organsOstan = await fetchData(`${config.api.OrgansOstan_URL}`)
                set ({organsJust: organsOstan?.map((organOstan:ORGANOSTAN)=>{
                    const organ={id:organOstan.id, 
                                code:organOstan.organ?.code,
                                name:organOstan.organ?.name
                            }
                    return organ
                })});
            },
            getByOrganId: async (organId)=>{
                const organOstan = await fetchData(`${config.api.OrgansOstan_URL}/${organId}`)
                set ({organOstanSearch:organOstan})
            }
        }
    })
)