import React, { useEffect } from 'react';  

interface Props {  
  label?: string ; 
  value: string | number | readonly string[] | undefined ; 
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; 
  placeholder?: string; 
  type?: string; 
  required?: boolean; 
  inputRef?:React.RefObject<HTMLInputElement>
  disabled?:boolean
}  

const Textbox: React.FC<Props> = ({ label, value, onChange, placeholder, type = 'text', required = false ,inputRef,disabled}) => {  

  useEffect(() => {  
    // Focus the input whenever the text changes  
    if (inputRef!=undefined)
      if (inputRef.current) {  
        inputRef.current.focus();  
      }  
  }, [value]);

  let classname= `shadow appearance-none border rounded w-full py-2 px-3 bg-slate-100 leading-tight focus:outline-none focus:shadow-outline`
  classname =  disabled===true ? classname +' text-gray-400' : classname + ' text-gray-700'

  return (  
    <div className="w-full">  
      {label!=undefined &&
      <div className='flex'>
        <label className="block text-gray-700 text-sm font-bold my-2" htmlFor={label}>  
          {label}
        </label>    
        <label className="block text-red-700 text-sm font-bold my-2" htmlFor={label}>  
          {required && ' * ' }  
        </label>       
      </div>
      }  
      <input  
        className={classname}
        type={type}  
        id={label} 
        value={value}  
        onChange={onChange}  
        placeholder={placeholder}  
        required={required}
        ref={inputRef}  
        disabled={disabled}
      />  
    </div>  
  );  
};  

export default Textbox;  