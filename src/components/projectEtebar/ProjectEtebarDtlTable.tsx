import { convertToFarsiDigits } from "../../general/Functions";

type Props = {
    projectEtebarDtls: PROJECTETEBARDTL[];
    mode:boolean
};

const ProjectEtebarDtlTable = ({ projectEtebarDtls }: Props) => {

  return (
    <>
      {(projectEtebarDtls?.length>0) 
      &&
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-purple-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="p-2">منبع</th>
            <th className="p-2">دوره</th>
            <th className="p-2">اعتبار</th>
            <th className="p-2">نیاز به شورا دارد/ندارد</th>
            <th className="p-2">توضیحات</th>
            <th className="p-2">نظر کارشناسی</th>
            <th className="p-2"> تاریخ و ساعت</th>
            {/* {mode && <th className="p-2">عملیات</th>} */}
            {<th className="p-2">ثبت کننده</th>}
          </tr>
        </thead>
        <tbody>
        {
            projectEtebarDtls?.length>0 
            && projectEtebarDtls?.map((projectEtebarDtl) => (
                <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-custom-hover"
                    key={projectEtebarDtl.id}
                >
                    <td className="p-2 cursor-pointer">{convertToFarsiDigits(projectEtebarDtl?.projectEtebar?.resourceValue?.resource?.viewName)} </td>
                    <td className="p-2 cursor-pointer">{convertToFarsiDigits(projectEtebarDtl?.period?.name)} </td>
                    <td className="p-2 cursor-pointer">{convertToFarsiDigits(projectEtebarDtl.validity)}</td>
                    <td className="p-2 cursor-pointer">{projectEtebarDtl.shoraNeed ? "دارد" : "ندارد"}</td>
                    <td className="p-2 cursor-pointer">{projectEtebarDtl.description}</td>
                    <td className="p-2 cursor-pointer">{projectEtebarDtl.expertComment}</td>
                    <td className="p-2 cursor-pointer">
                    {convertToFarsiDigits(projectEtebarDtl?.date)}---{convertToFarsiDigits(projectEtebarDtl?.time)}
                    </td>
                    <td className="p-2 cursor-pointer">{projectEtebarDtl?.user?.employee?.lName}</td>
                </tr>
                ))
        } 
        </tbody>
      </table>

}    </>
)}

export default ProjectEtebarDtlTable
