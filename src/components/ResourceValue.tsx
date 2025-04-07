
import { convertToFarsiDigits } from '../general/Functions'

type Props ={
    resourceValue:number | string | null | undefined,
    warning:boolean,
    hasLabel:boolean
}
const ResourceValue = ({resourceValue,warning,hasLabel}:Props) => {
    const classname = hasLabel
    ? 'flex gap-2 items-center px-2'
    :(warning
        ? 'flex gap-2 items-center bg-red-200 border border-gray-300 rounded-lg shadow-md p-2 transition-transform duration-200 hover:scale-105' //animate-pulse  
        : 'flex gap-2 items-center bg-white border border-gray-300 rounded-lg shadow-md p-2 transition-transform duration-200 hover:scale-105'
    )
    const classname2= hasLabel
    ?'ml-2 text-gray-600 font-bold w-16 text-center text-xs'
    :'ml-2 text-purple-800 font-bold w-16 text-center text-sm'
  return (
    <div className='flex flex-col items-center'>
            {/* <span className='font-semibold text-gray-600'>  
                {convertToFarsiDigits(resourceName)}  
            </span>  */}
            <div   
                className= {classname}
            >  
                <span className={classname2}>{convertToFarsiDigits(resourceValue)}</span>  
            </div> 
        </div>
  )
}

export default ResourceValue