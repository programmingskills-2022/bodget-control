import { ChangeEvent, useEffect, useState } from "react";
import { useProjectStore } from "../store/projectsStore";
import Card from "../components/UI/Card";
import ProjectAddForm from "../components/project/ProjectAddForm";
import Modal from "../components/UI/Modal";
import { useFinancialYearsStore } from "../store/financialYearsStore";
import { handleMessage } from "../general/Functions";
import ProjectsListAddTable from "../components/project/ProjectsListAddTable";
import Button from "../components/UI/Button";
import ExcelImport from "../components/ExcelImport";
import { useOrgansOstanStore } from "../store/organsOstanStore";
import { useTarhsStore } from "../store/tarhsStore";
import { useCitiesStore } from "../store/citiesStore";
import { usePartsStore } from "../store/partsStore";
import { useVillagesStore } from "../store/villagesStore";
import { usePerformancePointsStore } from "../store/performancePointsStore";
import { useEmployeesStore } from "../store/employeesStore";
import { config } from "../config";
import { useMotevazenFaslsStore } from "../store/MotevazenFaslsStore";
import { usePerformanceMethodsStore } from "../store/performanceMethodsStore";
import { useProjectTypesStore } from "../store/projectTypesStore";
import { useCollaborativesStore } from "../store/collaborativesStore";
import { useApprovalAuthoritiesStore } from "../store/approvalAuthoritiesStore";
import { useGoalsStore } from "../store/goalsStore";
import { useAreasStore } from "../store/areasStore";
import ShowProgress from "../components/UI/ShowProgress";
import { useContext } from "../contexts/context";
import { useSettingsStore } from "../store/settingsStore";


const ProjectAdd = () => {

  const [newProject ,setNewProject] = useState<ProjectWithoutId>({
    code:  null, 
    projectCode:  null,
    projectName: null, 
    motevazenFaslId:  null,
    terminableValidity:  null,
    approvedValidity: null,
    totalValidity:  null,
    continuous: null,
    disadvantaged:  null,
    goalVal: null,  
    startYear: null,
    endYear: null,
    ProgressDuringYear:  null,
    ProgressPrediction:  null,
    ProgressPredictionDuringYear:  null,
    allocation:  null,
    organOstanId: null,
    tarhId: null,
    performancePointId:  null, 
    employeeId: null,
    areaId: null,
    employeeCommitteeId: null,
    performanceMethodId:null,
    collaborativeId: null,
    projectTypeId: null,
    approvalAuthorityId: null,
    goalId: null,  
    financialYearId: null,
    villageId: null,  
    partId: null,
    cityId: null,
    visible:null
  });
  const { add,
    //projects,
    selectedProject,
    allProjects,
    getCount,
    count,
     } = useProjectStore();

  const [jsonData, setJsonData] = useState<DataRow[]>([])     
  const [addProjects,setAddProjects] = useState<Project[]>([])
  const {getFinancialYears} = useFinancialYearsStore();
  const {organsJust,getOrgansOstan}=useOrgansOstanStore()
  const {tarhs,getTarhs}=useTarhsStore()
  const {cities,getCities}=useCitiesStore()
  const {parts,getParts}=usePartsStore()
  const {villages,getVillages}=useVillagesStore()
  const {performancePoints,getPerformancePoints}=usePerformancePointsStore()
  const {sazmanEmployees,getEmployees}=useEmployeesStore()
  const {motevazenFasls,getMotevazenFasls}=useMotevazenFaslsStore()
  const {performanceMethods,getPerformanceMethods}=usePerformanceMethodsStore()
  const {projectTypes,getProjectTypes}=useProjectTypesStore()
  const {collaboratives,getCollaboratives}=useCollaborativesStore()
  const {approvalAuthorities,getApprovalAuthorities}=useApprovalAuthoritiesStore()
  const {areasWithCity,getAreasWithCity}=useAreasStore()
  const {goals,getGoals}=useGoalsStore()
  const {settings}=useSettingsStore()
  const {progressMessage,setProgressMessage,showProgress,setShowProgress,isModalOpen,setModalOpen,successMessage,setSuccessMessage}=useContext()
  const [selectedOption, setSelectedOption] = useState('-1');  
  
  const [clear,setClear] = useState(false)

  const [showProjects, setShowProjects] = useState<boolean>(false)

  const [updateNeed, setUpdateNeed] = useState<UpdateNeed>(
    {affairUpdateNeed:false, 
        faslUpdateNeed:false,
        barnamehUpdateNeed:false,
        tarhUpdateNeed:false,
        goalUpdateNeed:false    
    })
    const [updateNeedMotevazen, setUpdateNeedMotevazen] = useState<UpdateNeedMotevazen>(
    {
        motevazenPartUpdateNeed:false, 
        motevazenFaslUpdateNeed:false,
    })

    const [updateNeedPlace, setUpdateNeedPlace] = useState<UpdateNeedPlace>(
    {   cityUpdateNeed:false, 
        partUpdateNeed:false,
        villageUpdateNeed:false,
        performancePointUpdateNeed:false,
    })  

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {  
      setSelectedOption(event.target.value); 
      setShowProjects(false) 
  }


  useEffect(()=>{
    refreshPage()
    getFinancialYears()
    getOrgansOstan()
    getTarhs()
    getCities()
    getParts()
    getVillages()
    getPerformancePoints()
    getEmployees(config.employeeType_Sazman)
    getMotevazenFasls()
    getPerformanceMethods()
    getProjectTypes()
    getCollaboratives()
    getApprovalAuthorities()
    getGoals()
    getAreasWithCity()
    getCount()
  },[])


  const createNewProject = (data:DataRow) :ProjectWithoutId => {  
    const organOstan= organsJust.find(oj=>oj.code===data[0]?.toString())
    const tarh= tarhs.find(t=>t.code===data[4]?.toString())
    const city= cities.find(c=>c.code===data[5]?.toString())
    const part= parts.find(p=>p.code===data[6]?.toString())
    const village= villages.find(v=>v.code===data[7])
    const performancePoint= performancePoints.find(pp=>pp.code===data[8])
    const employee= sazmanEmployees.find(se=>se.lName===data[9])
    const employeeCommittee= sazmanEmployees.find(se=>se.lName===data[10]?.trim()) 
    const motevazenFasl= motevazenFasls.find(mf=>mf.code===data[11]?.trim()) 
    const performanceMethod= performanceMethods.find(pm=>pm.name===data[13]?.trim()) 
    const projectType= projectTypes.find(pt=>pt.name===data[14]?.trim()) 
    const collaborative= collaboratives.find(c=>c.name===data[15]?.trim()) 
    const approvalAuthority= approvalAuthorities.find(aa=>aa.name===data[16]?.trim()) 
    const goal= goals.find(g=>g.name===data[17]?.trim()) 
    const area= areasWithCity.find(a=>a.code===parseInt(data[21]?? '')) 
    const newProject = {  
      code:null,
      organOstanId: organOstan!==undefined ? organOstan.id : null,  
      projectCode: data[1] === undefined ? '' : data[1].toString().trim(),  
      projectName: data[2] === undefined ? '' : data[2].trim().trim(),  
      tarhId: tarh!==undefined ? tarh.id : null, 
      cityId: city!==undefined ? city.id : null, 
      partId: part!==undefined ? part.id : null, 
      villageId: village!==undefined ? village.id : null, 
      performancePointId: performancePoint!==undefined ? performancePoint.id : null, 
      employeeId: employee!==undefined ? employee.id : null, 
      employeeCommitteeId: employeeCommittee!==undefined ? employeeCommittee.id : null, 
      motevazenFaslId: motevazenFasl!==undefined ? motevazenFasl.id : null, 
      continuous: data[12] === undefined ? null : data[12]==='0' ? false : true ,  
      disadvantaged: false,  
      performanceMethodId: performanceMethod!==undefined ? performanceMethod.id : null, 
      projectTypeId: projectType!==undefined ? projectType.id : null, 
      collaborativeId: collaborative!==undefined ? collaborative.id : null, 
      approvalAuthorityId: approvalAuthority!==undefined ? approvalAuthority.id : null, 
      goalId: goal!==undefined ? goal.id : null, 
      goalVal: data[18] === undefined ? 0 : parseFloat(data[18]),
      startYear:data[19] === undefined ? 0 : parseInt(data[19]), 
      endYear: data[20] === undefined ? 0 : parseInt(data[20]), 
      areaId: area!==undefined ? area.id : null, 
      ProgressDuringYear: data[22] === undefined ? '' : data[22].toString(),  
      ProgressPrediction:   data[23] === undefined ? '' : data[23].toString(),  
      ProgressPredictionDuringYear: data[24] === undefined ? '' : data[24].toString(),  
      terminableValidity:  data[25] === undefined ? null : parseInt(data[25]), 
      approvedValidity:data[26] === undefined ? null : parseInt(data[26]), 
      totalValidity:  data[27] === undefined ? null : parseInt(data[27]), 
      allocation: data[28] === undefined ? null : parseInt(data[28]), 
      financialYearId:settings.financialYear?.id!==undefined ? settings.financialYear?.id : null,
      visible:true
    };  
    
    return newProject;  
  };  

  const delay = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));  

  const handleAddGroup = async () => {  
    // Assuming jsonData is available in the scope  
    let code =count===0 ? 1: count + 1 
    for (let i = 0; i < jsonData.length; i++) {  
      if (i === 0) continue; // Skip the first iteration  
      
      const data = jsonData[i];  
      try {
        const newProject = createNewProject(data);  
        const findProject= allProjects.find(ap=>ap.projectCode===newProject.projectCode)
        if (findProject)
        {
          handleMessage(setSuccessMessage,setModalOpen,`کد پروژه ${findProject.projectCode} تکراری است.`)
          continue
        }        
        if (newProject.financialYearId===null)
        {
          handleMessage(setSuccessMessage,setModalOpen,`سال مالی درست دریافت نشده است`)
          continue
        }        
        const project:Project = await add({...newProject, code })

        if (project!==undefined) setAddProjects((prev)=>[...prev,project])
        setShowProgress(true);  
        setProgressMessage(`پروژه ${newProject.projectName} اضافه شد.`);  
        
        // Wait for 2 seconds before hiding the progress message  
        await delay(500);  
        
        // Hide the progress message after the delay    
        setShowProgress(false);  
        code ++
      } catch (error) {
        console.log(error)
        handleMessage(setSuccessMessage,setModalOpen,'پروژه مورد نظر ثبت نشد. لطفا مجدد امتحان کنید')
      }
    }  
    setShowProjects(true)
  };



  const handleAddOne = async (e: React.FormEvent<HTMLFormElement>) => {  
    try {  
        e.preventDefault(); 
        const code =count===0 ? 1: count + 1 

        const findProject= allProjects.find(ap=>ap.projectCode===newProject.projectCode)
        if (findProject)
        {
          handleMessage(setSuccessMessage,setModalOpen,'کد پروژه تکراری است.')
          return
        }
        add({...newProject, disadvantaged:false,code,financialYearId:settings.financialYearId, visible:true })
        handleMessage(setSuccessMessage,setModalOpen,'پروژه مورد نظر با موفقیت ثبت شد')
        getCount();
        setShowProjects(true)
 
      } catch (error) {  
        console.log(error)
        handleMessage(setSuccessMessage,setModalOpen,'پروژه مورد نظر ثبت نشد. لطفا مجدد امتحان کنید')
    }  
    refreshPage()
  }  


  
  const refreshPage = ()=>{
    setClear(!clear)
    setUpdateNeed({affairUpdateNeed:true, 
        faslUpdateNeed:true,
        barnamehUpdateNeed:true,
        tarhUpdateNeed:true,
        goalUpdateNeed:true})
    setUpdateNeedMotevazen({
        motevazenPartUpdateNeed:true,
        motevazenFaslUpdateNeed :true
    })
    setUpdateNeedPlace(   
    {   cityUpdateNeed:true, 
        partUpdateNeed:true,
        villageUpdateNeed:true,
        performancePointUpdateNeed:true,
    })
    setNewProject({
      code:  null, 
      projectCode:  null,
      projectName: null, 
      motevazenFaslId:  null,
      terminableValidity:  null,
      approvedValidity: null,
      totalValidity:  null,
      continuous: null,
      disadvantaged:  null,
      goalVal: null,  
      startYear: null,
      endYear: null,
      ProgressDuringYear:  null,
      ProgressPrediction:  null,
      ProgressPredictionDuringYear:  null,
      allocation:  null,
      organOstanId: null,
      tarhId: null,
      performancePointId:  null, 
      employeeId: null,
      areaId: null,
      employeeCommitteeId: null,
      performanceMethodId:null,
      collaborativeId: null,
      projectTypeId: null,
      approvalAuthorityId: null,
      goalId: null,  
      financialYearId: null,
      villageId: null,  
      partId: null,
      cityId: null,
      visible:null
    })
  }

  
  return (

    <Card fontStyles='flex flex-row mt-4'>  
          <div className="p-4">  
            <h2 className="text-xl font-semibold mb-4">ایجاد پروژه</h2>  
            <div className="flex items-center space-x-4">  
                <label className="flex items-center">  
                    <input  
                        type="radio"  
                        value={'0'}
                        checked={selectedOption === '0'}  
                        onChange={handleChange}  
                        className="form-radio text-blue-600 h-5 w-5"  
                    />  
                    <span className="ml-2">انفرادی</span>  
                </label>  
                <label className="flex items-center">  
                    <input  
                        type="radio"  
                        value={'1'}
                        checked={selectedOption === '1'}  
                        onChange={handleChange}  
                        className="form-radio text-blue-600 h-5 w-5"  
                    />  
                    <span className="ml-2">گروهی</span>  
                </label>  
            </div>  
        </div>  

        {selectedOption === '0' 
        && <ProjectAddForm handleAdd={handleAddOne} 
              newProject={newProject} 
              setNewProject={setNewProject} 
              updateNeed={updateNeed}
              setUpdateNeed={setUpdateNeed}
              updateNeedMotevazen={updateNeedMotevazen}
              setUpdateNeedMotevazen={setUpdateNeedMotevazen}
              updateNeedPlace={updateNeedPlace}
              setUpdateNeedPlace={setUpdateNeedPlace}
              clear={clear}/>}
        {selectedOption === '1'
        &&  <>
              <ExcelImport setJsonData={setJsonData} />  
              {jsonData.length!==0 && 
                <Button onClick={handleAddGroup} 
                        label={'پردازش فایل اکسل'} 
                        variant="m-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
              />}
              <ShowProgress showProgress={showProgress} message={progressMessage} /> 
              {/* {newProjects.length!==0 && <ProjectListTable filterProjects={newProjects} handleProjectClick={()=>(alert('hi'))} check={false}/>} */}
            </>
        }
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} message={successMessage} /> 
        {showProjects && 
          <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">      
              {selectedProject!==null && selectedOption === '0' && //for one insertion
              <ProjectsListAddTable projects={ [selectedProject]} />}
              {addProjects!==null && selectedOption === '1' && //for group insertion
              <ProjectsListAddTable projects={addProjects} />}
          </div> 
        }
    </Card>
  )
}

export default ProjectAdd