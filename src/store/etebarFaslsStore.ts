import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { deleteData, fetchData, postData, putData } from "./projectsStore"
import { config } from "../config"

interface EtebarFaslsState{
    etebarFasls : ETEBARFASL[]
    etebarFaslsByFinancialId : ETEBARFASL[]
    getEtebarFasls: (financialId:string) => Promise<void>
    add: (newEtebarFasl:ETEBARFASLWithoutId,financialId:string)=> Promise<ETEBARFASL>
    update: (etebarFaslId:string ,etebarFasl: ETEBARFASLWithoutId , financialId:string) => Promise<ETEBARFASL>
    remove: (id:string , financialId:string ) => Promise<ETEBARFASL>     
}

export const useEtebarFaslsStore = create<EtebarFaslsState>()(
    devtools((set)=>{ 
        return{
            etebarFasls:[],
            etebarFaslsByFinancialId:[],
            getEtebarFasls: async (financialId)=>{
                const etebarFasls = await fetchData(config.api.EtebarFasls_URL)

                set({etebarFasls:etebarFasls,etebarFaslsByFinancialId: etebarFasls.filter((ef:ETEBARFASL)=>ef.financialYear!==null && ef.financialYear.id===financialId)})
            },
            add: async (newEtebarFasl, financialId) => {
                try {

                    const etebarFasl = await postData(config.api.EtebarFasls_URL, JSON.stringify(newEtebarFasl));
                    if (etebarFasl) {
                    set((state) => ({
                        etebarFasls: [...state.etebarFasls, etebarFasl],
                        etebarFaslsByFinancialId:[...state.etebarFasls.filter(ef=>ef.financialYear?.id===financialId),etebarFasl]   , 
                    }));
                    return etebarFasl
                    }
                } catch (error) {
                    console.error('خطای ثبت اعتبار برای فصل انتخاب شده', error);
                }
            },
            update: async (id,etebarFasl , financialId) => {
                try {
                  const updatedEtebarFasl = await putData(`${config.api.EtebarFasls_URL}/${id}`, JSON.stringify(etebarFasl));

                  if (updatedEtebarFasl===undefined)
                    return null
                  else {
                    set((state) => ({  
                        etebarFasls: state.etebarFasls.map((ef) =>  
                        ef.id === id ? { ...ef, ...updatedEtebarFasl } : ef  
                        ),  
                        etebarFaslsByFinancialId: state.etebarFasls.filter(ef=>ef.financialYear?.id===financialId).map((eb) =>  
                            eb.id === id ? { ...eb, ...updatedEtebarFasl } : eb  
                            ),  
                    }));  
                    return updatedEtebarFasl
                  }
                } catch (error) {
                  console.error('خطای تغییر اعتبار', error);
                }
              },  
            remove: async (id, financialId) => {  
                try {  
                    const deletedEtebarFasl = await deleteData(`${config.api.EtebarFasls_URL}/${id}`);  
            
                    if (deletedEtebarFasl === undefined) {  
                        return null;  
                    } else {  
                        set((state) => ({  
                            etebarFasls: state.etebarFasls.filter((eb) => eb.id !== id), // Remove deleted item  
                            etebarFaslsByFinancialId: state.etebarFasls.filter(eb=>eb.financialYear?.id===financialId && eb.id !== id), // Update the financial ID filtered list  
                        }));  
                        return deletedEtebarFasl; // Return the deleted data if necessary  
                    }  
                } catch (error) {  
                    console.error('خطای حذف اعتبار', error);  
                }  
            },                            
        }
    })
)