
type Props = {
  showProgress: boolean
  message: string
}

const ShowProgress = ({ showProgress, message }:Props) => {  
  if (!showProgress) return null;  

  return (  
    <div className="m-4 p-4 border bg-green-200 shadow-lg rounded-lg z-50">  
      <h2 className="text-sm font-semibold">{message}</h2>  
    </div>  
  );  
};  

export default ShowProgress;  