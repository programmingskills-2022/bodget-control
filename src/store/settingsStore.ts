import { devtools } from "zustand/middleware"
import { create } from 'zustand';  
import { fetchData, putData } from "./projectsStore"
import { config } from "../config"

interface SettingsState{
    settings : SETTING
    getSettings: () => Promise<void>
    update:(id:string, updateSettingRequest:UpdateSettingRequest) => Promise<SETTING>
}

export const useSettingsStore = create<SettingsState>()(
    devtools((set)=>{
        return{
            settings:[],
            getSettings: async ()=>{
                const settings = await fetchData(config.api.Settings_URL)
                set({settings})
            },
            update: async(id, updateSettingRequest)=> {
                try {
                    const updateSetting = await putData(`${config.api.Settings_URL}/${id}`,JSON.stringify(updateSettingRequest)) 
                    console.log('update setting',updateSetting)
                    const setting = await fetchData(config.api.Settings_URL)
                    console.log('setting',setting)
                    if (setting!==undefined){
                        set({settings:setting})
                    }
                } catch (error) {
                    console.error('خطای تغییر تنظیمات',error)
                }
            }
        }
    })
)