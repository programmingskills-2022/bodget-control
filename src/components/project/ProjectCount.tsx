
import { convertToFarsiDigits } from '../../general/Functions';

type Props={
    label:string
    count:number
}
const ProjectCount = ({label, count}:Props) => {

  return (
        <div className="my-2 flex text-gray-700 gap-2">
          <label>
            {label}
          </label>
          <label>
            {convertToFarsiDigits(count)}
          </label>
        </div>

  )
}

export default ProjectCount