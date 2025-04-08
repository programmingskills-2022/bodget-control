import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { deleteData, fetchData, postData, putData } from "./projectsStore"
import { config } from "../config"

type RESOURCEJUST = {
    id:GUID
    code:string
    name:string
}

interface ResourceValuesState{
    resourceValues : RESOURCEVALUE[]
    resourcesJust : RESOURCEJUST[]
    getResourceValues: () => Promise<void>
    getResourcesJust:(isEtebar : boolean,periodId?:string)=> Promise<void>
    emptyResourcesJust:()=>void
    add: (newResourceValue:RESOURCEVALUEWithoutId)=> Promise<RESOURCEVALUE>
    update: (resourceValueId:string ,resourceValue: RESOURCEVALUEWithoutId ) => Promise<RESOURCEVALUE>
    remove: (id:string ) => Promise<RESOURCEVALUE>       
}

export const useResourceValuesStore = create<ResourceValuesState>()(
    devtools((set)=>{
        return{
            resourceValues:[],
            resourcesJust:[],
            getResourceValues: async ()=>{
                const resourceValues = await fetchData(`${config.api.ResourceValues_URL}`)
                console.log(resourceValues)
                set({resourceValues})
            },
            getResourcesJust: async (isEtebar,periodId)=>{
                const param= periodId!==undefined && periodId!==null ? `&periodId=${periodId}` : ''
                const resourceValues = await fetchData(`${config.api.ResourceValues_URL}/list?isEtebar=${isEtebar}${param}`)
                //console.log(resourceValues)
                set ({resourcesJust: resourceValues?.map((resourceValue:RESOURCEVALUE)=>{
                    const resourceJust={
                                id:resourceValue.id, 
                                code:resourceValue?.resource?.code,
                                name:resourceValue?.resource?.viewName,
                            }
                    return resourceJust
                })});
            },
            emptyResourcesJust:()=>{

                set({resourcesJust:[]})
            },
            add: async  (newResourceValue)=> {
                try {

                    const resourceValue = await postData(config.api.ResourceValues_URL, JSON.stringify(newResourceValue));
                    if (resourceValue) {
                    set((state) => ({
                        resourceValues: [...state.resourceValues, resourceValue],
                    }));
                    return resourceValue
                    }
                } catch (error) {
                    console.error('خطای ثبت اعتبار', error);
                }
            },
            update: async (resourceValueId ,resourceValue ) => {
                try {
                    const updatedResourceValue = await putData(`${config.api.ResourceValues_URL}/${resourceValueId}`, JSON.stringify(resourceValue));

                    console.log(updatedResourceValue)

                    if (updatedResourceValue===undefined)
                    return null
                    else {
                    set((state) => ({  
                        resourceValues: state.resourceValues.map((rv) =>  
                        rv.id === resourceValueId ? { ...rv, ...updatedResourceValue } : rv  
                        ),  
                    }));  
                    
                    return updatedResourceValue
                    }
                } catch (error) {
                    console.error('خطای تغییر اعتبار', error);
                }
                },  
            remove: async (id) => {  
                try {  
                    const deletedResourceValue = await deleteData(`${config.api.ResourceValues_URL}/${id}`);  
            
                    if (deletedResourceValue === undefined) {  
                        return null;  
                    } else {  
                        set((state) => ({  
                            resourceValues: state.resourceValues.filter((rv) => rv.id !== id), // Remove deleted item  
                        }));  
                        return deletedResourceValue; // Return the deleted data if necessary  
                    }  
                } catch (error) {  
                    console.error('خطای حذف اعتبار', error);  
                }  
            },


        }
    })
)