
const api='https://localhost:44346/api'

export const config = {
    api:{
        API_URL: api,
        Login_URL:`${api}/Auth/Login`,
        Categories_URL:`${api}/Categories`,
        Periods_URL:`${api}/Periods`,
        Employees_URL:`${api}/Employees`,

        Projects_URL:`${api}/Projects`,
        ProjectById_URL:`${api}/Projects/findId`,

        ProjectsEtebar_URL:`${api}/ProjectsEtebar`,
        ProjectsEtebarDtl_URL:`${api}/ProjectsEtebarDtl`,
        ProjectsEtebarSum_URL:`${api}/ProjectsEtebar/sum`,
        ProjectsEtebarSumCity_URL:`${api}/ProjectsEtebar/sumCity`,

        ProjectsTakhsis_URL:`${api}/ProjectsTakhsis`,
        ProjectsTakhsisSum_URL:`${api}/ProjectsTakhsis/sumByPeriodId`,
        ProjectsTakhsisSumCity_URL:`${api}/ProjectsTakhsis/sumCity`,
        
        Resources_URL: `${api}/Resources`,
        ResourceValues_URL: `${api}/ResourceValues`,
        Cities_URL:`${api}/Cities`,
        Organs_URL:`${api}/Organs`,
        Fasls_URL:`${api}/Fasls`,
        Barnamehs_URL:`${api}/Barnamehs`,        
        Tarhs_URL:`${api}/Tarhs`,        
        Parts_URL:`${api}/Parts`,        
        Villages_URL:`${api}/Villages`,        
        PerformancePoints_URL:`${api}/PerformancePoints`,        
        Affairs_URL:`${api}/Affairs`,        
        OrgansOstan_URL:`${api}/OrgansOstan`,    
        MotevazenParts_URL:`${api}/MotevazenParts`, 
        MotevazenFasls_URL:`${api}/MotevazenFasls`, 
        ProjectTypes_URL:`${api}/ProjectTypes`, 
        Goals_URL:`${api}/Goals`, 
        Areas_URL:`${api}/Areas`, 
        Collaboratives_URL:`${api}/Collaboratives`, 
        PerformanceMethods_URL:`${api}/PerformanceMethods`, 
        ApprovalAuthorities_URL:`${api}/ApprovalAuthorities`, 
        FinancialYears_URL:`${api}/FinancialYears`, 
        EtebarFasls_URL: `${api}/EtebarFasls`, 
        EtebarBarnamehs_URL: `${api}/EtebarBarnamehs`, 
        EtebarOrgansOstan_URL: `${api}/EtebarOrgansOstan`, 
        EtebarCities_URL: `${api}/EtebarCities`, 
        Users_URL:`${api}/Users`, 
        Settings_URL:`${api}/Settings`, 
    },
     //ostanId: '0DD1A3E7-D3C9-41E1-9E4C-9490CCCDB254', //خراسان رضوی
     //financialYearId:'D7453716-07DB-4250-AC99-8DF55D26EF80' ,//1403
     //organId:'234FB14B-C8FB-45E8-A0E0-4F23913D76E4' ,// سازمان مدیریت و برنامه ریزی استان
     employeeType_Sazman:'BF2BE697-A4FF-49CA-B063-E4FC8340D4C9', // سازمان مدیریت و برنامه ریزی
     employeeType_Others:'345E3AFD-1755-4B8A-855A-7FD8DA2E93CE', // ساير دستگاههاي اجرايي
     employeeType_Area:'326D8EED-CBA2-4EB0-A0AC-F460D18204B0' ,// حوزه هاي انتخابيه
     
}
