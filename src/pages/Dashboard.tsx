import { useEffect, useState } from "react";
import ProjectSearch from "../components/project/ProjectSearch";
import ResourceValues from "../components/ResourceValues";
import LookupDropdown from "../components/UI/LookupDropdown";
import { usePeriodsStore } from "../store/periodsStore";

 const Dashboard = () => {  
  const {periods,getPeriods}=usePeriodsStore()
  const [periodId,setPeriodId]=useState<string|undefined>(undefined)

  useEffect(()=>{
      getPeriods(false)
  },[] )


  return (  

    <div className="flex">  

      {/* Main Content */}  
      <div className="flex-1 p-6">  
        <header className="flex justify-between items-center mb-6 border-b border-indigo-300 pb-4">  
          <h1 className="text-2xl font-bold text-gray-700">داشبورد</h1>  
          {/* You can add a user profile icon or logout button here */}  
        </header>  

        <div className="space-y-4">  
          <p>اینجا می‌توانید به اطلاعات و آمار سایت دسترسی داشته باشید.</p>  
          
          {/* Sample content */}  
          <div className="bg-blue-100 p-4 rounded shadow">  
            <h2 className="text-xl font-semibold pb-4">خلاصه اعتبار</h2> 
            <div className="px-12 w-1/4">
              <ProjectSearch justCitySearch={true} />
            </div>
            <ResourceValues isaProject={false} isEtebar={true}/>
            <h2 className="text-xl font-semibold pb-4">خلاصه تخصیص</h2> 
            <div className='w-1/5 mx-12'>
              <LookupDropdown  
                  items={periods?.length>0 ? periods : []}  
                  idKey="id"  
                  nameKey="name" 
                  codeKey="code"
                  onItemSelect={(value)=>setPeriodId(value as  string) }
                  searchLabel={'دوره'}
                  hasLabel={false}
                  clear={true}
                  required={true}
              /> 
            </div>
            <ResourceValues isaProject={false} isEtebar={false} periodId={periodId}/>
          </div>  
          <div className="bg-blue-100 p-4 rounded shadow">  
            <h3 className="font-bold">گزارشات اخیر</h3>  
            <p>اینجا می‌توانید گزارشات اخیر را بررسی کنید.</p>  
          </div>  
        </div>  
      </div>  
    </div>  

  );  

};  

export default Dashboard;  