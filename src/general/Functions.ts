
export const convertToFarsiDigits = (num: number | string | null | undefined): string => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    if (num === null || num === undefined) {
        return '';
    }

    if (typeof num === 'string') {
        return num.replace(/\d/g, (d) => farsiDigits[parseInt(d)]);
    } else {
        let temp: string;
        if (num < 0) {
            temp = Math.abs(num).toString().replace(/\d/g, (d) => farsiDigits[parseInt(d)]) + '-';
        } else {
            temp = Math.abs(num).toString().replace(/\d/g, (d) => farsiDigits[parseInt(d)]);
        }
        return temp;
    }
};
  export const convertStringToInteger=(str:string)=> {  
    const result = parseInt(str, 10); // Base 10  
    return isNaN(result) ? null : result; // Return null for NaN  
}  


//    Function to sort data by a specific field  
export const sortData = <T>(field: keyof T, data: T[], setData: (data: T[]) => void): T[] => {
    const sortedData = [...data].sort((a, b) => {
        if (a[field] < b[field]) return -1;
        if (a[field] > b[field]) return 1;
        return 0;
    });
    setData(sortedData);
    return sortedData;
};

export function newGuid(): GUID {  
    const guid: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {  
        const r: number = Math.random() * 16 | 0;  
        const v: number = c === 'x' ? r : (r & 0x3 | 0x8);  
        return v.toString(16);   
    });  

    // Use type assertion and Object.defineProperty to add the isGuid property  
    const guidWithIsGuid = guid as GUID;  
    Object.defineProperty(guidWithIsGuid, 'isGuid', { value: true });  

    return guidWithIsGuid;  
} 

export const handleMessage=(setSuccessMessage: React.Dispatch<React.SetStateAction<string>>,
                                                setModalOpen:React.Dispatch<React.SetStateAction<boolean>>,
                                                message:string)=>{
    setSuccessMessage(message);  
    setModalOpen(true);  
    setTimeout(() => {  
      setModalOpen(false);  
    }, 2000); // Auto close after 2 seconds  
  }

export function formatNumberWithCommas(num: number): string {  
    // Convert the number to a string  
    const numString = num.toString();  
    
    // Use a regular expression to insert commas every three digits from the right  
    const formattedString = numString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');  

    return formattedString;  
}  

