import  { ReactNode } from 'react'

type Props = {
  children:ReactNode,
  fontStyles:string
}
const Card = ({children , fontStyles}:Props) => {
  return (
    <div className={`container mb-4 mx-auto p-4 bg-slate-50 rounded-xl mt-4`}>  
        <div className={`flex flex-wrap ${fontStyles}`}>  
            {children}
        </div>  
    </div>  
  )
}

export default Card
