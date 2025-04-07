
import {  useState } from 'react';
import { convertToFarsiDigits } from '../general/Functions';


const useProjectTableColumns=() =>{

    const [visibleColumns, setVisibleColumns] = useState<VisibleColumn[]>([  
        { visible: true, label: 'دستگاه' },  
        { visible: true, label: 'پروژه' },  
        { visible: true, label: 'فصل' },  
        { visible: true, label: 'برنامه' },  
        { visible: true, label: 'طرح' },  
        { visible: true, label: 'شهرستان' },  
        { visible: true, label: 'کارشناس' },  
        { visible: true, label: 'مستمر/غیرمستمر' },  
        //{ visible: true, label: 'ردیف' },  
    ]);    
 
    const columns: Column[] = [  
        {  
            header: visibleColumns[0].label,  
            accessor: (project: Project|ProjectWithResource): JSX.Element | string =>  
            `${convertToFarsiDigits(project?.organOstan?.organ?.code)}-${project?.organOstan?.organ?.name}`,  
            visible: visibleColumns[0].visible,  
        },  
        {  
            header: visibleColumns[1].label,  
            accessor: (project: Project|ProjectWithResource): JSX.Element | string =>  
            `${convertToFarsiDigits(project.projectCode)}-${project?.projectName}`,  
            visible: visibleColumns[1].visible,  
        },  
        {  
            header: visibleColumns[2].label,  
            accessor: (project: Project|ProjectWithResource): JSX.Element | string =>  
            `${convertToFarsiDigits(project?.tarh?.barnameh?.fasl?.code)}-${project?.tarh?.barnameh?.fasl?.name}`,  
            visible: visibleColumns[2].visible,  
        },  
        {  
            header: visibleColumns[3].label,  
            accessor: (project: Project|ProjectWithResource): JSX.Element | string =>  
            `${convertToFarsiDigits(project?.tarh?.barnameh?.code)}-${project?.tarh?.barnameh?.name}`,  
            visible: visibleColumns[3].visible,  
        },  
        {  
            header: visibleColumns[4].label,  
            accessor: (project: Project|ProjectWithResource): JSX.Element | string =>  
            `${convertToFarsiDigits(project?.tarh?.viewCode)}-${project?.tarh?.name}`,  
            visible: visibleColumns[4].visible,  
        },  
        {  
            header: visibleColumns[5].label,  
            accessor: (project: Project|ProjectWithResource): JSX.Element | string =>  
            `${project?.city?.name===undefined ? '' : project?.city?.name}`,
            visible: visibleColumns[5].visible,  
        },  
        {  
            header: visibleColumns[6].label,  
            accessor: (project: Project|ProjectWithResource): JSX.Element | string => `${project?.employee?.lName===undefined ? '' :project?.employee?.lName}`,  
            visible: visibleColumns[6].visible,  
        },  
        {  
            header: visibleColumns[7].label,  
            accessor: (project: Project|ProjectWithResource): JSX.Element | string => (project.continuous ? 'مستمر' : 'غیر مستمر'),  
            visible: visibleColumns[7].visible,  
        },  
        // {  
        //   header: visibleColumns[8].label,  
        //   accessor: (project: Project): JSX.Element | string => (project.disadvantaged ? 'محروم' : 'غیر محروم'),  
        //   visible: visibleColumns[8].visible,  
        // },  
        ];  

        

    const toggleColumnVisibility = (index: number) => {  
        setVisibleColumns((prev) =>  
            prev.map((col, i) => (i === index ? { ...col, visible: !col.visible } : col))  
        );  
        };  

    const toggleEtebarVisibility = (projectId: string,projectsShowEtebar:ProjectsShowEtebar[]) :ProjectsShowEtebar[]=> {  
         
            return projectsShowEtebar?.map((project) => {  
                if (project.projectId === projectId) {  
                return {  
                    ...project,  
                    isVisible: !project.isVisible,  
                };  
                } else {  
                return {  
                    ...project,  
                    isVisible: false,  
                };  
                }  
            });  
        //getById(projectId)
    };  
    
    const checkVisibility = (projectId: string,projectsShowEtebar:ProjectsShowEtebar[]):boolean => {  
        const project = projectsShowEtebar?.find((p) => p.projectId === projectId);  
        return project ? project.isVisible : false;  
        };  
    
    return {visibleColumns,setVisibleColumns,columns,toggleColumnVisibility,checkVisibility,toggleEtebarVisibility}
}


export default useProjectTableColumns