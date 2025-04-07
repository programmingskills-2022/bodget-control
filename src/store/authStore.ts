import {create} from 'zustand'
import { config } from '../config';
import axios from 'axios';
import { devtools } from 'zustand/middleware';


interface AuthState{
    isAuthenticated:boolean;
    loginInfo: {
        jwtToken: string 
        user: {
          id: GUID,
          aspNetUsersId: GUID,
          employee: EMPLOYEE,
          unlimited: boolean | null
        }        
    }|null ;
    errorMessage: string | null; 
    login:  (username:string , password:string) =>  Promise<void>;
    logout: ()=>void;
    setErrorMessage: (message: string | null) => void;
}

export const useAuthStore = create<AuthState> ()(
    devtools((set)=>({
        isAthenticated:false,
        loginInfo:null,
        errorMessage: null,
        login: async(username:string , password:string) =>{
            try {  
                const response = await axios.post(config.api.Login_URL, {username , password})
                console.log(response)
                set({ isAuthenticated: true, loginInfo: {jwtToken:response.data.jwtToken,user: response.data.user} });  
                localStorage.setItem('token', response.data.jwtToken); 
            } catch (error) {  
                set({ errorMessage: 'نام کاربری یا رمز عبور اشتباه است.' });
                console.error('ورود مجاز نیست:', error);
            }  
        },
        logout:()=> {
            set({isAuthenticated : false, loginInfo:null, errorMessage:null})
            localStorage.removeItem('token');
        },
        setErrorMessage: (message: string | null) => set({ errorMessage: message }), 
    }))
)

