// src/components/Layout.js  
import { ReactNode } from 'react';
import { useAuthStore } from '../../store/authStore';
import SideMenu from './SideMenu';
import { useContext } from '../../contexts/context';
import { useSettingsStore } from '../../store/settingsStore';
import { convertToFarsiDigits } from '../../general/Functions';

interface Props{
  children:ReactNode
}

const Layout :React.FC<Props> = ({ children }) => {  

  const {isAuthenticated,loginInfo,logout} = useAuthStore();
  const {settings}=useSettingsStore();
  const {initSearchItems} = useContext()

  return (  
    <div className="overflow-x-hidden">  

      <header className='flex justify-between w-full p-2 h-10 bg-slate-300' >  
        <div>
            <h1>سامانه بودجه {settings.organOstan?.organ?.name} {settings.organOstan?.ostan?.name}</h1>  
        </div>
        <div className='flex gap-8 flex-row '>
            {isAuthenticated && <h3>کاربر: {loginInfo?.user?.employee?.lName}</h3>}
        </div>
        <div className='flex gap-8 flex-row '>
            {isAuthenticated && <h3>سال مالی: {convertToFarsiDigits(settings.financialYear?.year)}</h3>}
        </div>
        <div className="text-gray-600 cursor-pointer hover:text-gray-900 hover:font-bold" 
                  onClick={()=>{initSearchItems();
                                logout();
                   }}>
                    خروج</div>  

      </header>  

      <main className='flex'>
        {isAuthenticated && <SideMenu />}      
        <div className='flex-1'>
          {children}
        </div>    
      </main>  

    </div>  
  );  
};  

export default Layout;  