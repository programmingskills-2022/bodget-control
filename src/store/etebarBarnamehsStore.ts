import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { deleteData, fetchData, postData, putData } from "./projectsStore"
import { config } from "../config"

interface EtebarBarnamehsState{
    etebarBarnamehs : ETEBARBARNAMEH[]
    etebarBarnamehsByFinancialId : ETEBARBARNAMEH[]
    getEtebarBarnamehs: (financialId:string) => Promise<void>
    add: (newEtebarBarnameh:ETEBARBARNAMEHWithoutId,financialId:string)=> Promise<ETEBARBARNAMEH>
    update: (etebarBarnamehId:string ,etebarBarnameh: ETEBARBARNAMEHWithoutId , financialId:string) => Promise<ETEBARBARNAMEH>
    remove: (etebarBarnamehId:string , financialId:string ) => Promise<ETEBARBARNAMEH>
}

export const useEtebarBarnamehsStore = create<EtebarBarnamehsState>()(
    devtools((set)=>{ 
        return{
            etebarBarnamehs:[],
            etebarBarnamehsByFinancialId:[],
            getEtebarBarnamehs: async (financialId)=>{
                const etebarBarnamehs = await fetchData(config.api.EtebarBarnamehs_URL)
                if (etebarBarnamehs.length>0)
                        set({etebarBarnamehs, etebarBarnamehsByFinancialId:etebarBarnamehs.filter((ef:ETEBARBARNAMEH)=>ef.financialYear!==null && ef.financialYear.id===financialId) })
            },
            add: async (newEtebarBarnameh, financialId) => {
                try {
                    const etebarBarnameh = await postData(config.api.EtebarBarnamehs_URL, JSON.stringify(newEtebarBarnameh));
                    if (etebarBarnameh) {
                    set((state) => ({
                        etebarBarnamehs: [...state.etebarBarnamehs, etebarBarnameh],
                        etebarBarnamehsByFinancialId:[...state.etebarBarnamehs.filter(eb=>eb.financialYear?.id===financialId),etebarBarnameh], 
                    }));
                    return etebarBarnameh
                    }
                } catch (error) {
                    console.error('خطای ثبت اعتبار برای برنامه انتخاب شده', error);
                }
            },
            update: async (id,etebarBarnameh , financialId) => {
                try {
                  const updatedEtebarBarnameh = await putData(`${config.api.EtebarBarnamehs_URL}/${id}`, JSON.stringify(etebarBarnameh));

                  if (updatedEtebarBarnameh===undefined)
                    return null
                  else {
                    set((state) => ({  
                        etebarBarnamehs: state.etebarBarnamehs.map((eb) =>  
                        eb.id === id ? { ...eb, ...updatedEtebarBarnameh } : eb  
                        ),  
                        etebarBarnamehsByFinancialId: state.etebarBarnamehs.filter(eb=>eb.financialYear?.id===financialId).map((eb) =>  
                            eb.id === id ? { ...eb, ...updatedEtebarBarnameh } : eb  
                            ),  
                    }));  
                    return updatedEtebarBarnameh
                  }
                } catch (error) {
                  console.error('خطای تغییر اعتبار', error);
                }
              },      
            remove: async (id, financialId) => {  
                try {  
                    const deletedEtebarBarnameh = await deleteData(`${config.api.EtebarBarnamehs_URL}/${id}`);  
            
                    if (deletedEtebarBarnameh === undefined) {  
                        return null;  
                    } else {  
                        set((state) => ({  
                            etebarBarnamehs: state.etebarBarnamehs.filter((eb) => eb.id !== id), // Remove deleted item  
                            etebarBarnamehsByFinancialId: state.etebarBarnamehs.filter(eb=>eb.financialYear?.id===financialId && eb.id !== id), // Update the financial ID filtered list  
                        }));  
                        return deletedEtebarBarnameh; // Return the deleted data if necessary  
                    }  
                } catch (error) {  
                    console.error('خطای حذف اعتبار', error);  
                }  
            },                    
        }
    })
)