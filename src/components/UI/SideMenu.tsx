import { useNavigate } from 'react-router-dom';  
import { FaChartLine, FaCog, FaProjectDiagram, FaMoneyCheck, FaCoins } from 'react-icons/fa';  
import { AiOutlineDashboard } from 'react-icons/ai';  
import { useState } from 'react';  
import { useContext } from '../../contexts/context';  
  

const SideMenu = () => {  
  const { menuItems, menuDefinationItems,setMenuDefinationItems,setMenuItems } = useContext();  
  const navigate = useNavigate();  
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);  


  const toggleSubmenu = (item:MenuItem, index:number,isDefination:boolean) => {  
    const hasChildren = item.childrenItems.length > 0;  
    setOpenSubmenu(hasChildren && openSubmenu === index ? null : hasChildren ? index : null);  

    if (isDefination) {  
      setMenuDefinationItems((prev) => ({  
        ...prev,  
        selectedIndex: index,  
      }));  
    } else {  
      setMenuItems((prev) => ({  
        ...prev,  
        selectedIndex: index,  
      }));  
    }  

        
    if (!hasChildren) {  
      navigate(`/${item.parentNavigate}`);  
    }  
  };  

  const renderIcon = (index:number) => {  
    const icons = [AiOutlineDashboard, FaProjectDiagram, FaCoins, FaMoneyCheck, FaChartLine, FaCog];  
    const IconComponent = icons[index];  
    return <IconComponent className="mr-2" />;  
  };  

  return (  
    <aside className="w-48 bg-indigo-900 text-white min-h-screen p-4">  
      <h2 className="text-xl font-bold mb-4 border-b border-gray-600">تعاریف</h2>  
      <ul>  
        {menuDefinationItems.menuItems.map((item, index) => (  
          <li key={index} className="mb-4">  
            <div  
              className="flex items-center gap-2 cursor-pointer hover:text-indigo-300"  
              onClick={() => toggleSubmenu(item, index,true)}  
            >  
              {renderIcon(index)}  
              <span>{item.parentLabel}</span>  
            </div>  
          </li>  
        ))}  
      </ul>  
      <h2 className="text-xl font-bold mb-4 border-b border-gray-600">عملیات</h2>  
      <ul>  
        {menuItems.menuItems.map((item, index) => (  
          <li key={index} className="mb-4">  
            <div  
              className="flex items-center gap-2 cursor-pointer hover:text-indigo-300"  
              onClick={() => toggleSubmenu(item, index,false)}  
            >  
              {renderIcon(index)}  
              <span>{item.parentLabel}</span>  
            </div>  
            {openSubmenu === index && item.childrenItems.length > 0 && (  
              <ul className="w-full mx-6 my-2">  
                {item.childrenItems.map((child, childIndex) => (  
                  <li  
                    key={childIndex}  
                    className="flex items-center gap-2 cursor-pointer hover:text-indigo-300 mb-1"  
                    onClick={() => navigate(`/${child.navigate}`)}  
                  >  
                    {renderIcon(index)}  
                    <span className="text-gray-300">{child.label}</span>  
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