import React from 'react';  
import { useNavigate } from "react-router-dom";  

interface Props {  
  type?: "button" | "submit" | "reset"; // Optional property for button type  
  label: string; // Required label for the button  
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Optional click event handler  
  disabled?: boolean; // Optional disabled flag  
  variant?: string; // Optional variant for additional styling  
  exit?: boolean; // Optional flag to indicate if it should behave as an exit button  
}  

const Button: React.FC<Props> = ({  
  type,  
  label,  
  onClick,  
  disabled = false,  
  variant,  
  exit = false,  
}) => {  
  const className = `px-2 py-2  ${variant ? variant : ''}`;  
  const classname2 = `px-2 py-2  ${variant ? variant : ''}`;  

  const navigate = useNavigate();  

  const handleExitClick = () => {  
    navigate(-1);  
  };  

  return (  
    type !== undefined ? (  
      // If it is a submit button  
      <button type={type} className={className} disabled={disabled}>  
        {label}  
      </button>  
    ) : (exit ? (  
      // If it is an Exit button  
      <button className={classname2} onClick={handleExitClick} disabled={disabled}>  
        {label}  
      </button>  
    ) : (  
      // If it is a regular button  
      <button className={className} onClick={onClick} disabled={disabled}>  
        {label}  
      </button>  
    ))  
  );  
};  

export default Button;  