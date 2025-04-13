import { useState } from 'react';  
import * as XLSX from 'xlsx';  
import Card from './UI/Card'

interface ExcelImportProps {
    setJsonData: (data: DataRow[]) => void;
}

const ExcelImport = ({ setJsonData }: ExcelImportProps) => {  
    const [fileName, setFileName] = useState('انتخاب فایل'); // Initial message in Persian  

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {  
        const file = event.target.files?.[0];  
        if (!file) return;  

        setFileName(file.name); // Show the selected file name  

        const reader = new FileReader();  
        reader.onload = (e:ProgressEvent<FileReader>) => {  
            if (e.target!==null)
            {
                if (e.target.result !== null) {
                    const data = new Uint8Array(e.target.result as ArrayBuffer);  
                    const workbook = XLSX.read(data, { type: 'array' });  
                    const firstSheetName = workbook.SheetNames[0];  
                    const worksheet = workbook.Sheets[firstSheetName];  
                    //console.log('xlsx',XLSX.utils.sheet_to_json(worksheet, { header: 1 }))
                    setJsonData( XLSX.utils.sheet_to_json(worksheet, { header: 1 })); // Returns an array of arrays  
                }
            }
        };  

        reader.readAsArrayBuffer(file);  
    };  

    return (  
        <Card fontStyles={'flex gap-4'}>  
            <div className='flex items-center'>
            <h1 className="text-sm font-bold">فایل اکسل مورد نظر را وارد کنید.</h1>  
            </div>
            <label htmlFor="fileInput" className="cursor-pointer border border-gray-300 p-3 text-center rounded-lg bg-blue-500 text-gray-50 hover:bg-blue-600" >  
                    <span>{fileName}  </span>
                    <input   
                        type="file"   
                        id="fileInput"   
                        accept=".xlsx, .xls"   
                        onChange={handleFileUpload}   
                        className='hidden'
                    />  
            </label>  
        </Card>  
    );  
};  

export default ExcelImport;  