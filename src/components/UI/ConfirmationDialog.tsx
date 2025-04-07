import React from 'react';  

interface ConfirmationDialogProps {  
  isOpen: boolean;  
  onConfirm: () => void;  
  onCancel: () => void;  
  message: string;  
}  

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({  
  isOpen,  
  onConfirm,  
  onCancel,  
  message,  
}) => {  
  if (!isOpen) {  
    return null;  
  }  

  return (  
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">  
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">  
        <h2 className="text-lg font-semibold mb-4">تایید حذف</h2>  
        <p className="mb-4">{message}</p>  
        <div className="flex justify-end">  
          <button  
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"  
            onClick={onCancel}  
          >  
            انصراف  
          </button>  
          <button  
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"  
            onClick={onConfirm}  
          >  
            حذف  
          </button>  
        </div>  
      </div>  
    </div>  
  );  
};  

export default ConfirmationDialog;  