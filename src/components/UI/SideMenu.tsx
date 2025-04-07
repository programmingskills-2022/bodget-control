import { useNavigate } from 'react-router-dom';  
import { FaChartLine, FaCog, FaProjectDiagram, FaMoneyCheck,FaCoins } from 'react-icons/fa';  
import {AiOutlineDashboard} from 'react-icons/ai'
import { useState } from 'react';  
import { useContext } from '../../contexts/context';  

interface MenuItem {  
  parentLabel: string;  
  parentNavigate: string;  
  childrenItems: { label: string; navigate: string }[];  
}  

const SideMenu = () => {  
  const { menuItems , menuDefinationItems} = useContext();  
  const navigate = useNavigate();  
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);  

  const toggleSubmenu = (item: MenuItem, index: number) => {  
    if (item.childrenItems.length>0) setOpenSubmenu(openSubmenu === index ? null : index);  
    // Navigate if it doesn't have any children  
    if (item.childrenItems.length === 0) {  
      navigate(`/${item.parentNavigate}`);  
    }  
  };  

  const handleNavigation = (route: string) => {  
    navigate(`/${route}`);  
  };  

  return (  
    <aside className="w-48 bg-indigo-900 text-white min-h-screen p-4">  
      <h2 className="text-xl font-bold mb-4 border-b border-gray-600">تعاریف</h2>  
      <ul>  
        {menuDefinationItems.map((item, index) => (  
          <li key={index} className="mb-4">  
            <div  
              className="flex items-center gap-2 cursor-pointer hover:text-indigo-300"  
              onClick={() => toggleSubmenu(item, index)} // Toggle submenu on click  
            >  
              {index === 0 && <FaCoins className="mr-2" />}  
              {index === 1 && <FaCoins className="mr-2" />}  
              {index === 2 && <FaCoins className="mr-2" />}  
              {index === 3 && <FaCoins className="mr-2" />}  
              {index === 4 && <FaCoins className="mr-2" />}  
              {index === 5 && <FaCoins className="mr-2" />}  
              <span>{item.parentLabel}</span>  
            </div>  

          </li>  
        ))}  
      </ul>  
      <h2 className="text-xl font-bold mb-4 border-b border-gray-600">عملیات</h2>  
      <ul>  
        {menuItems.map((item, index) => (  
          <li key={index} className="mb-4">  
            <div  
              className="flex items-center gap-2 cursor-pointer hover:text-indigo-300"  
              onClick={() => toggleSubmenu(item, index)} // Toggle submenu on click  
            >  
              {index === 0 && <AiOutlineDashboard className="mr-2" />}  
              {index === 1 && <FaProjectDiagram className="mr-2" />}  
              {index === 2 && <FaCoins className="mr-2" />}  
              {index === 3 && <FaMoneyCheck className="mr-2" />}  
              {index === 4 && <FaChartLine className="mr-2" />}  
              {index === 5 && <FaCog className="mr-2" />}  
              <span>{item.parentLabel}</span>  
            </div>  

            {/* Render submenu */}  
            {openSubmenu === index && item.childrenItems.length > 0 && (  
              <ul className="w-full mx-6 my-2"> {/* Added list styles */}  
                {item.childrenItems.map((child, childIndex) => (  
                  <li  
                    key={childIndex}  
                    className="flex  items-center gap-2 cursor-pointer hover:text-indigo-300 mb-1"  
                    onClick={() => handleNavigation(child.navigate)}  
                  >  
                    {index === 0 && <AiOutlineDashboard className="mr-2" />}  
                    {index === 1 && <FaProjectDiagram className="mr-2" />}  
                    {index === 2 && <FaMoneyCheck className="mr-2" />}  
                    {index === 3 && <FaMoneyCheck className="mr-2" />}  
                    {index === 4 && <FaChartLine className="mr-2" />}  
                    {index === 5 && <FaCog className="mr-2" />} 
                    <span className="text-gray-300">{child.label}</span> {/* Optional styling for children */}  
                  </li>  
                ))}  
              </ul>  
            )}  
          </li>  
        ))}  
      </ul>  
    </aside>  
  );  
};  

export default SideMenu;  