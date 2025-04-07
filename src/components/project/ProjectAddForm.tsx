import {  useEffect, useRef, useState } from "react"
import Textbox from "../UI/TextBox"
import Button from "../UI/Button"
import { useContext } from "../../contexts/context"
import { useMotevazenFaslsStore } from "../../store/MotevazenFaslsStore"
import { useMotevazenPartsStore } from "../../store/MotevazenPartsStore"
import LookupDropdown from "../UI/LookupDropdown"
import { useAffairsStore } from "../../store/affairsStore"
import { useFaslsStore } from "../../store/faslsStore"
import { useBarnamehsStore } from "../../store/barnamehsStore"
import { useTarhsStore } from "../../store/tarhsStore"
import { useGoalsStore } from "../../store/goalsStore"
import { useProjectTypesStore } from "../../store/projectTypesStore"
import { useOrgansOstanStore } from "../../store/organsOstanStore"
import { useCitiesStore } from "../../store/citiesStore"
import { usePartsStore } from "../../store/partsStore"
import { useVillagesStore } from "../../store/villagesStore"
import { usePerformancePointsStore } from "../../store/performancePointsStore"
import { useEmployeesStore } from "../../store/employeesStore"
import { useAreasStore } from "../../store/areasStore"
import { usePerformanceMethodsStore } from "../../store/performanceMethodsStore"
import { useCollaborativesStore } from "../../store/collaborativesStore"
import { useApprovalAuthoritiesStore } from "../../store/approvalAuthoritiesStore"
import CheckBox from "../UI/CheckBox"


type Props={
    handleAdd : React.FormEventHandler<HTMLFormElement> | undefined,
    newProject: ProjectWithoutId,
    setNewProject: React.Dispatch<React.SetStateAction<ProjectWithoutId>>
    updateNeed: UpdateNeed
    setUpdateNeed: React.Dispatch<React.SetStateAction<UpdateNeed>>
    updateNeedMotevazen: UpdateNeedMotevazen
    setUpdateNeedMotevazen: React.Dispatch<React.SetStateAction<UpdateNeedMotevazen>>
    updateNeedPlace: UpdateNeedPlace
    setUpdateNeedPlace: React.Dispatch<React.SetStateAction<UpdateNeedPlace>>
    clear:boolean
}

const ProjectAddForm = ({handleAdd,newProject,setNewProject,updateNeed,setUpdateNeed,updateNeedMotevazen,setUpdateNeedMotevazen,updateNeedPlace,setUpdateNeedPlace,clear}:Props) => {

    const {motevazenFaslsByPartId,getMotevazenFaslsByPartId} = useMotevazenFaslsStore()
    const {motevazenParts,getMotevazenParts} = useMotevazenPartsStore()
    const {affairs,getAffairs} = useAffairsStore()
    const {faslsByAffairId,getFaslsByAffairId} = useFaslsStore()
    const {barnamehsByFaslId,getBarnamehsByFaslId} = useBarnamehsStore()
    const {tarhsByBarnamehId,getTarhsByBarnamehId} = useTarhsStore()
    const {goalsByBarnamehId,getGoalsByBarnamehId} = useGoalsStore()
    const {projectTypes} = useProjectTypesStore()
    const {organsJust,} = useOrgansOstanStore()
    const {cities,} = useCitiesStore()
    const {partsByCityId,getPartsByCityId} = usePartsStore()
    const {villagesByPartId,getVillagesByPartId} = useVillagesStore()
    const {performancePointsByVillageId,getPerformancePointsByVillageId} = usePerformancePointsStore()
    const {sazmanEmployees,} = useEmployeesStore()
    const {performanceMethods,} = usePerformanceMethodsStore()
    const {collaboratives,} = useCollaborativesStore()
    const {approvalAuthorities,} = useApprovalAuthoritiesStore()
    const {areasWithCity} = useAreasStore()
    const [filteredArea,setFilteredArea]=useState<AreaWithCity[]>([])

    const inputRef = useRef<HTMLInputElement>(null);  
                                           
    const {
        motevazenPartSearch,

        affairSearch,
        faslSearch,
        barnamehSearch,

        setAffairSearch,
        setFaslSearch,
        setBarnamehSearch,
        setMotevazenPartSearch,

        citySearch,
        partSearch,
        villageSearch,
        setCitySearch,
        setPartSearch,
        setVillageSearch,
        setPerformancePointSearch,
        handleSelect
    } = useContext();

    useEffect(()=>{
        getAffairs()
        getMotevazenParts()

    },[getAffairs])

    useEffect(()=>{
        console.log('clear:',clear) 
    },[clear])

    const [areaDesc,setAreaDesc]=useState('')

    useEffect(()=>{
        const findAreas= areasWithCity.filter(a=>a.cityId===newProject.cityId)
        if (findAreas!==undefined) setFilteredArea(findAreas)
        setNewProject({...newProject,areaId:findAreas[0]?.id})
    },[newProject.cityId,areasWithCity])

    useEffect(()=>{
        console.log('object')
        let findAreas:AreaWithCity[]=[]
        if (newProject.partId===null && newProject.cityId!==null)
            findAreas= areasWithCity.filter(a=>a.cityId===newProject.cityId)
        else if (newProject.partId!==null)
            findAreas= areasWithCity.filter(a=>a.partId===newProject.partId)
        if (findAreas!==undefined) setFilteredArea(findAreas)
        setNewProject({...newProject,areaId:findAreas[0]?.id})           

    },[newProject.partId,areasWithCity])


    useEffect(()=>{
        const name= areasWithCity.find(a=>a.id===newProject.areaId)?.employeeName
        if (name!==undefined && name!==null) setAreaDesc(name)
    },[newProject.areaId,areasWithCity])

    useEffect(()=>{
        if (typeof motevazenPartSearch === 'string' && motevazenPartSearch.trim() !== '') {
            getMotevazenFaslsByPartId(motevazenPartSearch);
        }
        if (typeof affairSearch === 'string' && affairSearch.trim() !== '') {
            getFaslsByAffairId(affairSearch);
        }
        if (typeof faslSearch === 'string' && faslSearch.trim() !== '') {
            getBarnamehsByFaslId(faslSearch);
        }
        if (typeof barnamehSearch === 'string' && barnamehSearch.trim() !== '') {
            getTarhsByBarnamehId(barnamehSearch);
        }
        if (typeof barnamehSearch === 'string' && barnamehSearch.trim() !== '') {
            getGoalsByBarnamehId(barnamehSearch);
        }
        if (typeof citySearch === 'string' && citySearch.trim() !== '') {
            getPartsByCityId(citySearch);
        }
        if (typeof citySearch === 'string' && citySearch.trim() !== '') {
            getPartsByCityId(citySearch);
        }
        if (typeof partSearch === 'string' && partSearch.trim() !== '') {
            getVillagesByPartId(partSearch);
        }
        if (typeof villageSearch === 'string' && villageSearch.trim() !== '') {
            getPerformancePointsByVillageId(villageSearch);
        }
        
        
    },[motevazenPartSearch,affairSearch,faslSearch,barnamehSearch,citySearch,partSearch,villageSearch])




    const handlePropertySet = <T,>(property: keyof ProjectWithoutId, value:unknown,
        updateNeed?:T,
        setUpdateNeed?: React.Dispatch<React.SetStateAction<T>>,
        search?: Action, 
        setSearch?: React.Dispatch<React.SetStateAction<Action>>
    ) => 
    {  
       // console.log({  
        //     ...newProject, 
        //     [property]: value, 
        // })
        setNewProject(prevProject  => ({  
            ...prevProject, 
            [property]: value, 
        }));  
        
        if (updateNeed!==undefined && setUpdateNeed!==undefined) 
        {
            //console.log('updateNeed',updateNeed)
            setUpdateNeed(updateNeed)
        }
        if (search!==undefined && setSearch!==undefined)
        {
            setSearch(search)
        }
    };  

    
  return (
        <form onSubmit={handleAdd} className="w-full text-sm flex flex-col p-2 justify-items-center gap-4">  
            <div className="w-full text-sm flex p-2 justify-between">
                <div className='w-1/5 flex flex-col p-2 justify-items-center'>
                    <LookupDropdown  
                        items={organsJust?.length>0 ? organsJust:[]}  
                        idKey="id"  
                        nameKey="name" 
                        codeKey="code"
                        onItemSelect={(value)=>handlePropertySet('organOstanId',value) }
                        searchLabel={'کد دستگاه'}
                        hasLabel={true}
                        clear={clear}
                        required={true}
                    /> 
                    <Textbox  
                        label="کد پروژه"  
                        value={newProject.projectCode===null ? '' : newProject.projectCode}  
                        type="text"  
                        onChange={(e) => handlePropertySet('projectCode', e.target.value)}
                        placeholder="کد پروژه را وارد کنید"  
                        required={true}  
                        inputRef={inputRef}
                    />  
                    <Textbox  
                        label="نام پروژه"  
                        value={newProject.projectName===null ? '' : newProject.projectName} 
                        type="text"  
                        onChange={(e) => handlePropertySet('projectName', e.target.value) }  
                        placeholder="نام پروژه را وارد کنید"  
                        required={true}  
                    />   
                    <LookupDropdown  
                        items={affairs.length>0 ? affairs : []}  
                        idKey="id"  
                        nameKey="name" 
                        codeKey="code"
                        onItemSelect={(value)=>handleSelect(value, setAffairSearch,
                                                                    {affairUpdateNeed:false, 
                                                                    faslUpdateNeed:true,
                                                                    barnamehUpdateNeed:true,
                                                                    tarhUpdateNeed:true,
                                                                    goalUpdateNeed:true},
                                                                setUpdateNeed) }
                        searchLabel={'امور'}
                        hasLabel={true}
                        clear={updateNeed?.affairUpdateNeed}
                        required={true}
                    /> 
                    <LookupDropdown  
                        items={faslsByAffairId.length>0 ? faslsByAffairId : []}  
                        idKey="id"  
                        nameKey="name" 
                        codeKey="code"
                        onItemSelect={(value)=>handleSelect(value, setFaslSearch, {affairUpdateNeed:false, 
                                                                    faslUpdateNeed:false,
                                                                    barnamehUpdateNeed:true,
                                                                    tarhUpdateNeed:true,
                                                                    goalUpdateNeed:true},
                                                                setUpdateNeed) }
                        searchLabel={'فصل'}
                        hasLabel={true}
                        clear={updateNeed?.faslUpdateNeed}
                        required={true}
                    /> 
                    <LookupDropdown  
                        items={barnamehsByFaslId.length>0 ? barnamehsByFaslId : []}  
                        idKey="id"  
                        nameKey="name" 
                        codeKey="code"
                        onItemSelect={(value)=>handleSelect(value, setBarnamehSearch,  {affairUpdateNeed:false, 
                                                                faslUpdateNeed:false,
                                                                barnamehUpdateNeed:false,
                                                                tarhUpdateNeed:true,
                                                                goalUpdateNeed:true},
                                                            setUpdateNeed) }
                        searchLabel={'برنامه'}
                        hasLabel={true}
                        clear={updateNeed?.barnamehUpdateNeed}
                        required={true}
                    /> 
                    <LookupDropdown  
                        items={tarhsByBarnamehId?.length>0 ? tarhsByBarnamehId : []}  
                        idKey="id"  
                        nameKey="name" 
                        codeKey="code"
                        onItemSelect={(value)=>{handlePropertySet('tarhId',value,{affairUpdateNeed:false, 
                                                                                    faslUpdateNeed:false,
                                                                                    barnamehUpdateNeed:false,
                                                                                    tarhUpdateNeed:false,
                                                                                    goalUpdateNeed:false},
                                                                                setUpdateNeed)  }}
                        searchLabel={'طرح'}
                        hasLabel={true}
                        clear={updateNeed?.tarhUpdateNeed}
                        required={true}
                    /> 
                    <LookupDropdown  
                        items={goalsByBarnamehId?.length>0 ? goalsByBarnamehId : []}  
                        idKey="id"  
                        nameKey="name" 
                        codeKey="code"
                        onItemSelect={(value)=>{handlePropertySet('goalId',value,{affairUpdateNeed:false, 
                                                                                    faslUpdateNeed:false,
                                                                                    barnamehUpdateNeed:false,
                                                                                    tarhUpdateNeed:false,
                                                                                    goalUpdateNeed:false},
                                                                                setUpdateNeed)  }}
                        searchLabel={'هدف'}
                        hasLabel={true}
                        clear={updateNeed?.tarhUpdateNeed}
                        required={true}
                    /> 
                </div>
                <div className='w-1/5 flex flex-col p-2 justify-items-center'>

                    <Textbox  
                        label="مقدار هدف"  
                        value={newProject.goalVal===null ? '' : newProject.goalVal}  
                        type="text"  
                        onChange={(e) => handlePropertySet('goalVal', e.target.value)}
                        placeholder="مقدار هدف را وارد کنید"  
                        required={true}  
                    />                    
                    <LookupDropdown  
                        items={projectTypes.length>0 ? projectTypes : []}  
                        idKey="id"  
                        nameKey="name" 
                        codeKey="code"
                        onItemSelect={(value)=>handlePropertySet('projectTypeId',value) }
                        searchLabel={'نوع پروژه'}
                        hasLabel={true}
                        clear={clear}
                        required={false}
                    />                  
                    <LookupDropdown  
                        items={cities.length>0 ? cities : []}  
                        idKey="id"  
                        nameKey="name" 
                        codeKey="code"
                        onItemSelect={(value)=>handlePropertySet('cityId',value,
                            {   cityUpdateNeed:false, 
                                partUpdateNeed:true,
                                villageUpdateNeed:true,
                                performancePointUpdateNeed:true,
                            },
                            setUpdateNeedPlace,
                            value,
                            setCitySearch
                        )}
                        searchLabel={'شهرستان'}
                        hasLabel={true}
                        clear={updateNeedPlace?.cityUpdateNeed}
                        required={true}
                    /> 
                    <LookupDropdown  
                        items={partsByCityId.length>0 ? partsByCityId : []}  
                        idKey="id"  
                        nameKey="name" 
                        codeKey="code"
                        onItemSelect={(value)=>handlePropertySet('partId',value,
                            {   cityUpdateNeed:false, 
                                partUpdateNeed:false,
                                villageUpdateNeed:true,
                                performancePointUpdateNeed:true,
                            },
                            setUpdateNeedPlace,
                            value,
                            setPartSearch

                        ) }
                        searchLabel={'بخش'}
                        hasLabel={true}
                        clear={updateNeedPlace?.partUpdateNeed}
                        required={false}
                    /> 
                    <LookupDropdown  
                        items={villagesByPartId.length>0 ? villagesByPartId : []}  
                        idKey="id"  
                        nameKey="name" 
                        codeKey="code"
                        onItemSelect={(value)=>handlePropertySet('villageId',value,
                            {   cityUpdateNeed:false, 
                                partUpdateNeed:false,
                                villageUpdateNeed:false,
                                performancePointUpdateNeed:true,
                            },
                            setUpdateNeedPlace,
                            value,
                            setVillageSearch
                        ) }
                        searchLabel={'دهستان'}
                        hasLabel={true}
                        clear={updateNeedPlace?.villageUpdateNeed}
                        required={false}
                    /> 
                    <LookupDropdown  
                        items={performancePointsByVillageId?.length>0 ? performancePointsByVillageId : []}  
                        idKey="id"  
                        nameKey="name" 
                        codeKey="code"
                        onItemSelect={(value)=>handlePropertySet('performancePointId',value,
                            {   cityUpdateNeed:false, 
                                partUpdateNeed:false,
                                villageUpdateNeed:false,
                                performancePointUpdateNeed:false,
                            },           
                            setUpdateNeedPlace,
                            value,
                            setPerformancePointSearch           
                        )  }
                        searchLabel={'نقطه اجرا'}
                        hasLabel={true}
                        clear={updateNeedPlace?.performancePointUpdateNeed}
                        required={false}
                    />                 
                    <LookupDropdown  
                        items={motevazenParts.length>0 ? motevazenParts : []}  
                        idKey="id"  
                        nameKey="name" 
                        codeKey="code"
                        onItemSelect={(value)=>handleSelect(value, setMotevazenPartSearch,
                            {
                                motevazenPartUpdateNeed:false,
                                motevazenFaslUpdateNeed :true
                            },setUpdateNeedMotevazen) }
                        searchLabel={'بخش متوازن'}
                        hasLabel={true}
                        clear={updateNeedMotevazen.motevazenPartUpdateNeed}
                        required={false}
                    /> 
                    <LookupDropdown  
                        items={motevazenFaslsByPartId?.length>0 ? motevazenFaslsByPartId:[]}  
                        idKey="id"  
                        nameKey="name" 
                        codeKey="code"
                        onItemSelect={(value)=>{handlePropertySet('motevazenFaslId',value, {
                                        motevazenPartUpdateNeed:false,
                                        motevazenFaslUpdateNeed :false
                                    },
                                    setUpdateNeedMotevazen)  }}
                        searchLabel={'فصل متوازن'}
                        hasLabel={true}
                        clear={updateNeedMotevazen.motevazenFaslUpdateNeed}
                        required={false}
                    /> 

                </div>

                <div className='w-1/5 flex flex-col p-2 justify-items-center'>
                    <LookupDropdown  
                        hasLabel={true}
                        items={performanceMethods?.length>0 ? performanceMethods:[]}  
                        idKey="id"  
                        nameKey="name" 
                        codeKey="code"
                        onItemSelect={(value)=>handlePropertySet('performanceMethodId',value)}
                        searchLabel={'روش اجرا'}
                        clear={clear}
                        required={false}
                    /> 
                    <LookupDropdown  
                        hasLabel={true}
                        items={collaboratives?.length>0 ? collaboratives:[]}  
                        idKey="id"  
                        nameKey="name" 
                        codeKey="code"
                        onItemSelect={(value)=>handlePropertySet('collaborativeId',value)}
                        searchLabel={'نوع (مشارکت)'}
                        clear={clear}
                        required={false}
                    /> 
                    <LookupDropdown  
                        hasLabel={true}
                        items={approvalAuthorities?.length>0 ? approvalAuthorities:[]}  
                        idKey="id"  
                        nameKey="name" 
                        codeKey="code"
                        onItemSelect={(value)=>handlePropertySet('approvalAuthorityId',value)}
                        searchLabel={'مرجع تصویب'}
                        clear={clear}
                        required={false}
                    /> 
                    <LookupDropdown  
                        hasLabel={true}
                        items={sazmanEmployees?.length>0 ? sazmanEmployees:[]}  
                        idKey="id"  
                        nameKey="code" 
                        codeKey="lName"
                        onItemSelect={(value)=>handlePropertySet('employeeId',value)}
                        searchLabel={'کارشناس'}
                        clear={clear}
                        required={true}
                    />  
                    <LookupDropdown  
                        hasLabel={true}
                        items={sazmanEmployees?.length>0 ? sazmanEmployees:[]}  
                        idKey="id"  
                        nameKey="code" 
                        codeKey="lName"
                        onItemSelect={(value)=>handlePropertySet('employeeCommitteeId',value)}
                        searchLabel={'دبیر کمیته برنامه ریزی'}
                        clear={clear}
                        required={true}
                    />                    
                    <LookupDropdown  
                        hasLabel={true}
                        items={filteredArea?.length>0 ? filteredArea : []} 
                        idKey="id"  
                        nameKey="partName" 
                        codeKey="cityName"
                        onItemSelect={(value)=>handlePropertySet('areaId',value)}
                        searchLabel={'حوزه انتخابیه'}
                        clear={clear}
                        required={false}
                        disabled={true}
                        selected={newProject.areaId!==null ? filteredArea.find(a=>a.id===newProject.areaId): null}
                    />  
                    {newProject.areaId && <label className="text-blue-500 my-2">{areaDesc}</label>}
                    <Textbox  
                        label="اعتبار مورد نیاز پروژه های خاتمه یافتنی"  
                        value={newProject.terminableValidity===null ? 0 : newProject.terminableValidity}  
                        type="text"  
                        onChange={(e) => handlePropertySet('terminableValidity', e.target.value)}
                        placeholder="اعتبار مورد نیاز پروژه های خاتمه یافتنی را وارد کنید"  
                        required={true}  
                    />  
                    <Textbox  
                        label="اعتبار مصوب"  
                        value={newProject.approvedValidity===null ? 0 : newProject.approvedValidity}  
                        type="text"  
                        onChange={(e) => handlePropertySet('approvedValidity', e.target.value)}
                        placeholder="اعتبار مصوب را وارد کنید"  
                        required={true}  
                    />                  
                </div>
                <div className='w-1/5 flex flex-col p-2 justify-items-center'>

                    <Textbox  
                        label="اعتبار"  
                        value={newProject.totalValidity===null ? 0 : newProject.totalValidity}  
                        type="text"  
                        onChange={(e) => handlePropertySet('totalValidity', e.target.value)}
                        placeholder="اعتبار را وارد کنید"  
                        required={true}  
                    />  
                    <Textbox  
                        label="تخصیص"  
                        value={newProject.allocation===null ? 0 : newProject.allocation}  
                        type="text"  
                        onChange={(e) => handlePropertySet('allocation', e.target.value)}
                        placeholder="اعتبار را وارد کنید"  
                        required={true}  
                    />  
                    <Textbox  
                        label="سال شروع"  
                        value={newProject.startYear===null ? 0 : newProject.startYear}  
                        type="text"  
                        onChange={(e) => handlePropertySet('startYear', e.target.value)}
                        placeholder="سال شروع را وارد کنید"  
                        required={true}  
                    />  
                    <Textbox  
                        label="سال خاتمه"  
                        value={newProject.endYear===null ? 0 : newProject.endYear}  
                        type="text"  
                        onChange={(e) => handlePropertySet('endYear', e.target.value)}
                        placeholder="سال خاتمه را وارد کنید"  
                        required={true}  
                    />  
                    <Textbox  
                        label="پیشرفت طی سال"  
                        value={newProject.ProgressDuringYear===null ? 0 : newProject.ProgressDuringYear}  
                        type="text"  
                        onChange={(e) => handlePropertySet('ProgressDuringYear', e.target.value)}
                        placeholder="پیشرفت طی سال را وارد کنید"  
                        required={true}  
                    />  
                    <Textbox  
                        label="پیش بینی پیشرفت طی سال"  
                        value={newProject.ProgressPredictionDuringYear===null ? 0 : newProject.ProgressPredictionDuringYear}  
                        type="text"  
                        onChange={(e) => handlePropertySet('ProgressPredictionDuringYear', e.target.value)}
                        placeholder="پیش بینی پیشرفت طی سال را وارد کنید"  
                        required={true}  
                    />  
                    <Textbox  
                        label="پیش بینی پیشرفت"  
                        value={newProject.ProgressPrediction===null ? 0 : newProject.ProgressPrediction}  
                        type="text"  
                        onChange={(e) => handlePropertySet('ProgressPrediction', e.target.value)}
                        placeholder="پیش بینی پیشرفت را وارد کنید"  
                        required={true}  
                    />  
                    <CheckBox
                        label="مستمر"
                        checked={newProject.continuous===null ? false : newProject.continuous}
                        onChange={(e) => handlePropertySet('continuous', e.target.checked)}
                        id="continuous"
                    />
                </div>
            </div>


            <div className='flex items-end justify-end'>  
                <Button  
                    label="ثبت"  
                    type={'submit'}
                    variant={'mx-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 w-32'}   
                />   
                <Button  
                    label="بازگشت"  
                    exit={true}  
                    variant={'mx-4 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:text-blue-700 w-32'} 
                />   
            </div> 

         
        </form>  

  )
}

export default ProjectAddForm