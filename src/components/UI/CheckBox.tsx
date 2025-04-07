import React from 'react';  

interface Props {  
  label: string; 
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; 
  id?: string; 
  required?: boolean; 
}  

const CheckBox: React.FC<Props> = ({ label, checked, onChange, id, required = false }) => {  
  return (  
    <div className="flex py-2 w-full items-center justify-between space-x-2">
      <label htmlFor="exampleCheckbox" className="text-gray-700">
        {label }
      </label>                    
      <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="form-checkbox h-5 w-5 text-blue-600"
          required={required}       
      />
    </div>
  );  
};  

export default CheckBox;  