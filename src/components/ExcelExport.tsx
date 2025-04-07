import React from 'react';  
import * as XLSX from 'xlsx';  
import { useProjectStore } from '../store/projectsStore';

interface ExportToExcelProps {  
  data: ProjectEtebarList[];  
}  

const ExcelExport: React.FC<ExportToExcelProps> = ({ data }) => {  

  const {isLoading}= useProjectStore()
  const fileName='data_export.xlsx';  

  const handleExport = () => {  
    // Validate file name  
    if (!fileName.endsWith('.xlsx')) {  
      alert('Please enter a valid file name with .xlsx extension');  
      return;  
    }  

    // Flatten the data structure to include properties in a single JSON object  
    const flattenedData = data.map(item => {  
      const { properties, ...rest } = item;  
      return {  
        ...rest,  
        ...properties // Spread properties into the flattened object  
      };  
    });  

    // Create a new workbook and add data  
    const worksheet = XLSX.utils.json_to_sheet(flattenedData);  
    const workbook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');  

    // Export the Excel file  
    XLSX.writeFile(workbook, fileName);  
  }; 

  // const handleExport = () => {  
  //   // Validate file name  
  //   if (!fileName.endsWith('.xlsx')) {  
  //     alert('Please enter a valid file name with .xlsx extension');  
  //     return;  
  //   }  

  //   // Create a new workbook and add data  
  //   const worksheet = XLSX.utils.json_to_sheet(data);  
  //   const workbook = XLSX.utils.book_new();  
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');  

  //   // Export the Excel file  
  //   XLSX.writeFile(workbook, fileName);  
  // };  

  return (  
    <div className="flex items-center justify-center space-y-4">  
      {!isLoading &&<button   
        onClick={handleExport}   
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"  
      >  
        انتقال به اکسل  
      </button>  }
      {/* <input   
        type="text"  
        value={fileName}  
        onChange={(e) => setFileName(e.target.value)}  
        className="p-2 rounded"  
        placeholder="Enter file name (with .xlsx)"  
        
      />   */}
    </div>  
  );  
};  

export default ExcelExport;  