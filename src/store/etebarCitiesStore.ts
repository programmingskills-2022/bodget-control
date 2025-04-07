import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { deleteData, fetchData, postData, putData } from "./projectsStore"
import { config } from "../config"

interface EtebarCitiesState{
    etebarCities : ETEBARCITY[]
    etebarCitiesByFinancialId : ETEBARCITY[]
    getEtebarCities: (financialId:string) => Promise<void>
    add: (newEtebarCity:ETEBARCITYWithoutId,financialId:string)=> Promise<ETEBARCITY>
    update: (etebarCityId:string ,etebarCity: ETEBARCITYWithoutId , financialId:string) => Promise<ETEBARCITY>   
    remove: (id:string , financialId:string ) => Promise<ETEBARCITY>     
}

export const useEtebarCitiesStore = create<EtebarCitiesState>()(
    devtools((set)=>{ 
        return{
            etebarCities:[],
            etebarCitiesByFinancialId:[],
            getEtebarCities: async (financialId)=>{
                const etebarCities = await fetchData(config.api.EtebarCities_URL)

                if (etebarCities.length>0)
                    set({etebarCities, etebarCitiesByFinancialId:etebarCities.filter((ef:ETEBARCITY)=>ef.financialYear!==null && ef.financialYear.id===financialId) })
            },
            add: async (newEtebarCity, financialId) => {
                try {
                    const etebarCity = await postData(config.api.EtebarCities_URL, JSON.stringify(newEtebarCity));
                    if (etebarCity) {
                    set((state) => ({
                        etebarCities: [...state.etebarCities, etebarCity],
                        etebarCitiesByFinancialId:[...state.etebarCities.filter(ef=>ef.financialYear?.id===financialId),etebarCity], 
                    }));
                    return etebarCity
                    }
                } catch (error) {
                    console.error('خطای ثبت اعتبار برای شهرستان انتخاب شده', error);
                }
            },
            update: async (id,etebarCityId , financialId) => {
                try {
                  const updatdEtebarCityId = await putData(`${config.api.EtebarCities_URL}/${id}`, JSON.stringify(etebarCityId));

                  if (updatdEtebarCityId===undefined)
                    return null
                  else {
                    set((state) => ({  
                        etebarCities: state.etebarCities.map((ec) =>  
                        ec.id === id ? { ...ec, ...updatdEtebarCityId } : ec  
                        ),  
                        etebarCitiesByFinancialId: state.etebarCities.filter(ec=>ec.financialYear?.id===financialId).map((ec) =>  
                            ec.id === id ? { ...ec, ...updatdEtebarCityId } : ec  
                            ),  
                    }));  
                    return updatdEtebarCityId
                  }
                } catch (error) {
                  console.error('خطای تغییر اعتبار', error);
                }
              },             
            remove: async (id, financialId) => {  
                try {  
                    const deletedEtebarCity = await deleteData(`${config.api.EtebarCities_URL}/${id}`);  
            
                    if (deletedEtebarCity === undefined) {  
                        return null;  
                    } else {  
                        set((state) => ({  
                            etebarCities: state.etebarCities.filter((eb) => eb.id !== id), // Remove deleted item  
                            etebarCitiesByFinancialId: state.etebarCities.filter(eb=>eb.financialYear?.id===financialId && eb.id !== id), // Update the financial ID filtered list  
                        }));  
                        return deletedEtebarCity; // Return the deleted data if necessary  
                    }  
                } catch (error) {  
                    console.error('خطای حذف اعتبار', error);  
                }  
            },               
        }
    })
)