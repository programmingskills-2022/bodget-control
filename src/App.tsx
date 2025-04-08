import './index.css';  
import './fonts.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import Layout from './components/UI/Layout';  
import Login from './pages/Login';  
import Dashboard from './pages/Dashboard';  
import { useAuthStore } from './store/authStore';  
import Projects from './pages/Projects';
import ProjectsEtebar from './pages/ProjectsEtebar';
import ProjectsEtebarList from './components/projectEtebar/ProjectsEtebarList';
import ProjectAdd from './pages/ProjectAdd';
import React from 'react';
import ProjectEtebarAddGroup from './components/projectEtebar/ProjectEtebarAddGroup';
import ProjectEtebarAddOne from './components/projectEtebar/ProjectEtebarAddOne';
import Settings from './pages/Settings';
import ProjectTakhsisAddGroup from './components/projectTakhsis/ProjectTakhsisAddGroup';
import ProjectTakhsisAddOne from './components/projectTakhsis/ProjectTakhsisAddOne';
import EtebarFasls from './pages/EtebarFasls';
import EtebarBarnamehs from './pages/EtebarBarnamehs';
import EtebarOrgansOstan from './pages/EtebarOrgansOstan';
import EtebarCities from './pages/EtebarCities';
import EtebarTakhsisResources from './pages/EtebarTakhsisResources';

const App: React.FC = () => {  
  const { isAuthenticated } = useAuthStore();  

  return (  
    <Router>  
      <Layout>  
        <Routes>  
          <Route path="/Dashboard" element={isAuthenticated ? <Dashboard /> : <Login />} />  
          <Route path="/Settings" element={isAuthenticated ? <Settings /> : <Login />} />  
          <Route path="/" element={<Login />} />  
          <Route path='/Projects' element={isAuthenticated 
                        ?
                          <Projects /> 
                        : <Login />} />
          <Route path='/Projects/Add' element={isAuthenticated ? <ProjectAdd />  : <Login />} />
          {/* <Route path='/ProjectsEtebar' element={isAuthenticated 
                        ?
                          <Projects 
                          etebar={true}/> 
                        : <Login />} /> */}
          <Route path='/ProjectsEtebar/AddGroup' element={isAuthenticated ? <ProjectEtebarAddGroup/> : <Login />} />
          <Route path='/ProjectsEtebar/AddOne' element={isAuthenticated ? <ProjectEtebarAddOne/> : <Login />} />
          <Route path='/ProjectsEtebar/:projectId' 
                element={isAuthenticated 
                        ? 
                          <ProjectsEtebar  >  
                            <ProjectsEtebarList more={false} /> 
                          </ProjectsEtebar>
                        : 
                          <Login />} 
          />
          <Route path='/ProjectsEtebar/:projectId/:projectEtebarId' 
              element={isAuthenticated
                      ? 
                        <ProjectsEtebar >
                          <ProjectsEtebarList more={true} /> 
                        </ProjectsEtebar> 
                      : 
                        <Login />}
          />
          <Route path='/ProjectsTakhsis/AddGroup' element={isAuthenticated ? <ProjectTakhsisAddGroup/> : <Login />} />
          <Route path='/ProjectsTakhsis/AddOne' element={isAuthenticated ? <ProjectTakhsisAddOne/> : <Login />} />
          <Route path='/EtebarFasls' element={isAuthenticated ? <EtebarFasls/> : <Login />} />
          <Route path='/EtebarBarnamehs' element={isAuthenticated ? <EtebarBarnamehs/> : <Login />} />
          <Route path='/EtebarOrgansOstan' element={isAuthenticated ? <EtebarOrgansOstan/> : <Login />} />
          <Route path='/EtebarCities' element={isAuthenticated ? <EtebarCities/> : <Login />} />
          <Route path='/ResourceValues' element={isAuthenticated ? <EtebarTakhsisResources/> : <Login />} />
        </Routes>  
      </Layout>  
    </Router>  
  );  
};  

export default App;  
