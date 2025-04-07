import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import Textbox from '../components/UI/TextBox';
import logo from '../assets/images/logo.png'
import Button from '../components/UI/Button';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../store/settingsStore';



const Login : React.FC= () => {

    const {login , errorMessage, setErrorMessage, } = useAuthStore();
    const {getSettings}=useSettingsStore();
    const [username, setUsername] = useState('');  
    const [password, setPassword] = useState('');  
    

    const navigate=useNavigate()
    const handleSubmit= async(e:React.FormEvent)=>{
        e.preventDefault();
        setErrorMessage(null)
        //setEmployeeSearch(loginInfo.user?.employee?.id)
        await login(username,password)
        getSettings()
        navigate('/Dashboard')
    }
    return (  
        <div className="flex items-center justify-center min-h-screen bg-gray-100">  
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">  
                <img className='pb-4' src={logo} alt='لوگوی سازمان'/>
                {errorMessage && <p className="text-red-500 text-right mb-4">{errorMessage}</p>}  
                <form onSubmit={handleSubmit}>  
                    <Textbox  
                        label="نام کاربری"
                        value={username}  
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}  
                        placeholder="نام کاربری..."  
                        required={true}
                    /> 
                    <Textbox  
                        label="رمز عبور"
                        value={password}  
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}  
                        placeholder="رمز عبور..."  
                        required={true}
                    />  
                    <Button  
                      label="ورود"  
                      type={'submit'}
                      variant='my-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600'
                    /> 
                    
                </form>  
            </div>  
        </div>  
      );  
    };  
    
export default Login