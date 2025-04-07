import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { deleteData, fetchData, postData, putData } from "./projectsStore"
import { config } from "../config"

interface EtebarOrgansOstanState{
    etebarOrgansOstan : ETEBARORGANOSTAN[]
    etebarOrgansOstanByFinancialId : ETEBARORGANOSTAN[]
    getEtebarOrgansOstan: (financialId:string) => Promise<void>
    add: (newEtebarOrganOstan:ETEBARORGANOSTANWithoutId,financialId:string)=> Promise<ETEBARORGANOSTAN>
    update: (etebarOrganOstanId:string ,etebarOrganOstan: ETEBARORGANOSTANWithoutId , financialId:string) => Promise<ETEBARORGANOSTAN> 
    remove: (id:string , financialId:string ) => Promise<ETEBARORGANOSTAN>      
}

export const useEtebarOrgansOstanStore = create<EtebarOrgansOstanState>()(
    devtools((set)=>{ 
        return{
            etebarOrgansOstan:[],
            etebarOrgansOstanByFinancialId:[],
            getEtebarOrgansOstan: async (financialId)=>{
                const etebarOrgansOstan = await fetchData(config.api.EtebarOrgansOstan_URL)

                if (etebarOrgansOstan.length>0)
                    set({etebarOrgansOstan, etebarOrgansOstanByFinancialId:etebarOrgansOstan.filter((ef:ETEBARORGANOSTAN)=>ef.financialYear!==null && ef.financialYear.id===financialId) })
            },
            add: async (newEtebarOrganOstan, financialId) => {
                try {
                    const etebarOrganOstan = await postData(config.api.EtebarOrgansOstan_URL, JSON.stringify(newEtebarOrganOstan));
                    if (etebarOrganOstan) {
                    set((state) => ({
                        etebarOrgansOstan: [...state.etebarOrgansOstan, etebarOrganOstan],
                        etebarOrgansOstanByFinancialId:[...state.etebarOrgansOstan.filter(ef=>ef.financialYear?.id===financialId),etebarOrganOstan], 
                    }));
                    return etebarOrganOstan
                    }
                } catch (error) {
                    console.error('خطای ثبت اعتبار برای دستگاه انتخاب شده', error);
                }
            },
            update: async (id,etebarOrganOstanId , financialId) => {
                try {
                  const updatedEtebarOrganOstanId = await putData(`${config.api.EtebarOrgansOstan_URL}/${id}`, JSON.stringify(etebarOrganOstanId));

                  if (updatedEtebarOrganOstanId===undefined)
                    return null
                  else {
                    set((state) => ({  
                        etebarOrgansOstan: state.etebarOrgansOstan.map((ec) =>  
                        ec.id === id ? { ...ec, ...updatedEtebarOrganOstanId } : ec  
                        ),  
                        etebarOrgansOstanByFinancialId: state.etebarOrgansOstan.filter(ec=>ec.financialYear?.id===financialId).map((ec) =>  
                            ec.id === id ? { ...ec, ...updatedEtebarOrganOstanId } : ec  
                            ),  
                    }));  
                    return updatedEtebarOrganOstanId
                  }
                } catch (error) {
                  console.error('خطای تغییر اعتبار', error);
                }
              },       
            remove: async (id, financialId) => {  
                try {  
                    const deletedOrganOstan = await deleteData(`${config.api.EtebarOrgansOstan_URL}/${id}`);  
            
                    if (deletedOrganOstan === undefined) {  
                        return null;  
                    } else {  
                        set((state) => ({  
                            etebarOrgansOstan: state.etebarOrgansOstan.filter((eb) => eb.id !== id), // Remove deleted item  
                            etebarOrgansOstanByFinancialId: state.etebarOrgansOstan.filter(eb=>eb.financialYear?.id===financialId && eb.id !== id), // Update the financial ID filtered list  
                        }));  
                        return deletedOrganOstan; // Return the deleted data if necessary  
                    }  
                } catch (error) {  
                    console.error('خطای حذف اعتبار', error);  
                }  
            },                         
        }
    })
)