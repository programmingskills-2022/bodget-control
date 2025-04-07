type Action =  never[] | null | string |unknown
type GUID = string & { isGuid: true} ;

type ORGAN={
    id: GUID;  
    code: string | null;  
    name: string | null;  
    manager: string | null;  
    organUpperId: GUID;  
    organUpper: {  
        id: GUID;  
        code: string | null;  
        name: string | null;                
    }  
}

type ORGANOSTAN = {  
    id: GUID | null;  
    organId: GUID | null;  
    organ:  ORGAN|null
    ostanId: GUID | null;  
    ostan: OSTAN | null;  
} ;  

type FASL ={  
    id: GUID;  
    code: string | null;  
    name: string | null;  
    affairId: GUID | null;  
    affair:AFFAIR | NULL

} 


type BARNAMEH = {  
    id: GUID;  
    code: string | null;  
    name: string | null;  
    faslId: GUID | null;  
    fasl: FASL| null;  
} ;  

type TARH = {  
    id: GUID;  
    code: string | null;  
    viewCode: string | null;  
    name: string | null;  
    barnamehId: GUID | null;  
    barnameh: BARNAMEH | null;  
} ;  

type OSTAN = {  
    id: GUID;  
    code: string | null;  
    name: string | null;  
    center: string | null;  
} ;  

type CITY = {  
    id: GUID;  
    code: string | null;  
    name: string | null;  
    population: string | null;  
    ostanId: GUID | null;  
    ostan: OSTAN|null;  
} ;  

type PART = {  
    id: GUID;  
    code: string | null;  
    name: string | null;   
    cityId: GUID | null;  
    city: CITY|null;  
} ;  

type VILLAGE = {  
    id: GUID;  
    code: string | null;  
    name: string | null;    
    partId: GUID | null;  
    part: PART | null;  
} ;  


type EMPLOYEE = {  
    id: GUID |null,
    code: string | null;  
    fName: string | null;  
    lName: string | null;  
    gender: boolean | null;  
    employeeTypeId: GUID | null;  
    employeeType: {  
        id: GUID;  
        code: string | null;  
        name: string | null;  
    } | null;  
    organOstanId: GUID | null;  
    OrganOstan: ORGANOSTAN;  
} ;  

type PERFORMANCEPOINT = {  
    id: GUID;  
    code: string | null;  
    name: string | null;    
    longitude: number | null;  
    latitude: number | null; // Fixed typo here  
    villageId: GUID;  
    village: VILLAGE|null;  
} ;  

type EMPLOYEETYPE = {
    id: GUID
    code : string | null;
    name : string | null;  
}

type GOAL = {  
    id: GUID;  
    code: string | null;  
    name: string | null;  
    unit: string | null;  
    barnamehId: GUID | null;  
    barnameh: BARNAMEH;  
}

type DIFINATION= {  
    id: GUID;  
    code: number | null;  
    name: string | null;  
} 
type AFFAIR =  {  
    id: GUID;  
    code: string | null;  
    name: string | null;               
} ;  

type AREA={  
    id: GUID;  
    code: number | null;  
    name: string | null;  
    employeeId: GUID | null;  
    employee: EMPLOYEE;  
    cityId: GUID | null;  
    city: CITY; 
    partId: GUID | null;  
    part: PART; 
}

interface AreaWithCity extends AREA {  
    cityName:string| null,
    partName:string| null,
    employeeName:string| null
  } 

type FINANCIALYEAR ={  
    id: GUID;  
    code: number | null;  
    name: string | null;  
    year:string 
}

interface Project {  
    id: GUID;  
    code: number | null;  
    projectCode: string | null;  
    projectName: string | null;  
    motevazenFaslId: GUID | null;  
    motavazenFasl:MOTEVAZENFASL |null
    terminableValidity: number | null;  
    approvedValidity: number | null;  
    totalValidity: number | null;  
    continuous: boolean | null;  
    disadvantaged: boolean | null;  
    goalVal: number | null;  
    startYear: number | null;  
    endYear: number | null; 
    ProgressDuringYear: string | null;  
    ProgressPredictionDuringYear: string | null;  
    ProgressPrediction: string | null;  
    visible:boolean|null
    allocation: number | null;  
    organOstanId: GUID | null;  
    organOstan: ORGANOSTAN | null;  
    tarhId: GUID | null;  
    tarh: TARH|null;  
    performancePointId: GUID | null;  
    performancePoint: PERFORMANCEPOINT|null;  
    employeeId: GUID | null;  
    employee: EMPLOYEE|null;  
    areaId: GUID | null;  
    area: AreaWithCity | null;  
    employeeCommitteeId: GUID | null;  
    employeeCommittee: EMPLOYEE | null;  
    performanceMethodId: GUID | null;  
    performanceMethod: DIFINATION | null;  
    collaborativeId: GUID | null;  
    collaborative: DIFINATION | null;  
    projectTypeId: GUID | null;  
    projectType: DIFINATION| null;  
    approvalAuthorityId: GUID | null;  
    approvalAuthority: DIFINATION | null;  
    goalId: GUID | null;  
    goal: GOAL | null;  
    financialYearId: GUID | null;  
    financialYear:  FINANCIALYEAR | null;  
    villageId: GUID | null;  
    village: VILLAGE | null;  
    partId: GUID | null;  
    part: PART|null;  
    cityId: GUID | null;  
    city: CITY|null; 

}  

type ProjectWithoutId={    
    code: number | null;  
    projectCode: string | null;  
    projectName: string | null;  
    motevazenFaslId: GUID | null;  
    terminableValidity: number | null;  
    approvedValidity: number | null;  
    totalValidity: number | null;  
    continuous: boolean | null;  
    disadvantaged: boolean | null;  
    goalVal: number | null;  
    startYear: number | null;  
    endYear: number | null; // Fixed property name casing  
    ProgressDuringYear: string | null;  
    ProgressPredictionDuringYear: string | null;  
    ProgressPrediction: string | null;  
    visible:boolean|null
    allocation: number | null;  
    organOstanId: GUID | null;  
    tarhId: GUID | null;  
    performancePointId: GUID | null;  
    employeeId: GUID | null;  
    areaId: GUID | null;  
    employeeCommitteeId: GUID | null;  
    performanceMethodId: GUID | null;  
    collaborativeId: GUID | null;  
    projectTypeId: GUID | null;  
    approvalAuthorityId: GUID | null;  
    goalId: GUID | null;  
    financialYearId: GUID | null;  
    villageId: GUID | null;  
    partId: GUID | null;  
    cityId: GUID | null;  
}  
interface ProjectWithResource extends Project {  
    resourceValueId:GUID
    resourceVal: number; 
  } 

type PERIOD = {
    id:GUID
    code : number| null
    name : string| null
    isEtebar:boolean
}

type RESOURCE = {
    id:GUID
    code : number
    name :string| null
    resourceMiddledId:Guid|null
    active: boolean
    viewName: string|null
}

type RESOURCEVALUE={
    id:GUID|null
    resourceId:Guid
    resource:RESOURCE|null
    financialYearId:GUID|null
    financialYear:FINANCIALYEAR|null
    value:number
    periodId:Guid|null
    period:PERIOD | null
}

type RESOURCEVALUEWithoutId={
    resourceId:Guid
    financialYearId:GUID
    value:number
    periodId:Guid|null
}

type USER={
    id: GUID
    aspNetUsersId:GUID|null
    employeeId:GUID
    employee: EMPLOYEE 
    unlimited:boolean
}

type SETTING = {
    id:GUID
    organOstanId:GUID
    organOstan:ORGANOSTAN|null
    financialYearId:GUID
    financialYear:FINANCIALYEAR|null
}

type UpdateSettingRequest = {
    organOstanId:GUID
    financialYearId:GUID
}

type PROJECTETEBAR = {
    id: GUID
    projectId: GUID
    project:Project | null
    resourceValueId:GUID 
    resourceValue : RESOURCEVALUE | null
    validity : number | null
}

type PROJECTETEBARDTL = {
    id: GUID
    projectEtebarId:GUID
    projectEtebar:PROJECTETEBAR | null
    periodId: GUID
    period:PERIOD  |null 
    userId : GUID | null
    user:USER | null
    validity : number | null
    description: string|null
    expertComment: string|null
    shoraNeed:boolean|null
    notification:string|null
    date :  string|null
    time:string|null
    fullDate : Date|null
}

type ProjectEtebarWithoutId={
    projectId:string|null,
    resourceValueId:GUID|null ,
    validity:number,
}
type ProjectEtebarDtlWithoutId={
    projectEtebarId:GUID|null
    periodId:GUID|null,
    userId:GUID|null,
    validity:number,
    description:string|null,
    expertComment:string|null,
    shoraNeed:boolean|null,
    notification:string,
}

type ProjectEtebarSum = {
    validitySum : number
	resourceName : string
    resourceCode :string
	initialValue:number
    difference :number
}
type ProjectEtebarSumCity = {
    validitySum : number
	resourceName : string
    resourceCode : string
}
type ProjectEtebarSumById ={
    projectId : GUID
    validitySum : number
}


type MOTEVAZENPART={
    id:GUID
    code : string|null
    name :string| null
}

type MOTEVAZENFASL={
    id:GUID
    code : string|null
    name :string| null
    motevazenPartId:GUID|null
    motevazenPart:MOTEVAZENPART | null
}

type UpdateNeed={
    affairUpdateNeed:boolean,
    faslUpdateNeed:boolean,
    barnamehUpdateNeed:boolean,
    tarhUpdateNeed:boolean
    goalUpdateNeed:boolean
  }
type UpdateNeedMotevazen={
    motevazenPartUpdateNeed:boolean,
    motevazenFaslUpdateNeed:boolean,
  }
type UpdateNeedPlace = {
    cityUpdateNeed:boolean,
    partUpdateNeed:boolean,
    villageUpdateNeed:boolean,
    performancePointUpdateNeed:boolean
}

type MenuItem={
    parentLabel:string ,
    parentNavigate:string
    childrenItems: 
    {
      label:string,
      navigate:string
    }[]
  }

type ETEBARFASL = {
    id: GUID |null
    financialYearId: GUID|null
    financialYear: FINANCIALYEAR | null
    faslId: GUID|null
    fasl: FASL | null
    resourceId:GUID|null
    resource: RESOURCE | null
    validity: number
}

type ETEBARFASLWithoutId = {
    financialYearId: GUID|null
    faslId: GUID|null
    resourceId:GUID|null
    validity: number
}

type ETEBARBARNAMEH = {
    id: GUID |null
    financialYearId: GUID|null
    financialYear: FINANCIALYEAR | null
    barnamehId: GUID|null
    barnameh: BARNAMEH | null
    resourceId:GUID|null
    resource: RESOURCE | null
    validity: number
}

type ETEBARBARNAMEHWithoutId = {
    financialYearId: GUID|null
    barnamehId: GUID|null
    resourceId:GUID|null
    validity: number
}

type ETEBARORGANOSTAN = {
    id: GUID |null
    financialYearId: GUID|null
    financialYear: FINANCIALYEAR | null
    organOstanId: GUID|null
    organOstan: ORGANOSTAN | null
    resourceId:GUID|null
    resource: RESOURCE | null
    validity: number
}

type ETEBARORGANOSTANWithoutId = {
    financialYearId: GUID|null
    organOstanId: GUID|null
    resourceId:GUID|null
    validity: number
}

type ETEBARCITY = {
    id: GUID |null
    financialYearId: GUID|null
    financialYear: FINANCIALYEAR | null
    cityId: GUID|null
    city: CITY | null
    resourceId:GUID|null
    resource: RESOURCE | null
    validity: number
}

type ETEBARCITYWithoutId = {
    financialYearId: GUID|null
    cityId: GUID|null
    resourceId:GUID|null
    validity: number
}


// type P = {
//     userId: number
//     id: number
//     title: string
//     body: string
//   }
  

  type Column = {  
    header: string;  
    accessor: (project: Project|ProjectWithResource) => JSX.Element | string;  
    visible: boolean;  
  }; 

  type VisibleColumn = {  
    visible: boolean;  
    label: string;  
  };  

  type ProjectsShowEtebar = {  
    projectId: string;  
    isVisible: boolean;  
  }; 

  type ProjectEtebarList = {  
    projectId: string;  
    projectCode: string;  
    projectName: string;   
    cityName: string;   
    tarhName: string;   
    barnamehName: string;   
    faslName: string;   
    organName: string;   
    properties: {  
        [key: string]: number; // Allows any string as a key with a number value  
    };  
}  
type DefinationType = 'fasl' | 'barnameh' | 'city' | 'organOstan'; 