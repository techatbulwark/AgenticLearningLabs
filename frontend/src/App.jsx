import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import SDFRegister from './pages/SDFRegister'
import SDFCohort5 from './pages/SDFCohort5'
import SDFAllCohortsForm from './components/SDFAllCohortsForm'
import SDFConfirmation from './pages/SDFConfirmation'
import SelectCourse from './pages/SelectCourse'
import Courses from './pages/Courses'
import Team from './pages/Team'
import FAQ from './pages/FAQ'
import DataAnalytics from './pages/DataAnalytics'
import PrereqModal from './components/PrereqModal'
import ScrollLink from './components/ScrollLink'
import CustomerExperience from './pages/CustomerExperience'
import SalesMarketing from './pages/SalesMarketing'
import InquiryModal from './components/InquiryModal'
import HealthCheck from './pages/HealthCheck'
import { initGA, trackPageView, trackCampaignData } from './lib/analytics'

function App() {
  const location = useLocation();

  // Initialize Google Analytics on mount
  useEffect(() => {
    initGA();
    // Track initial page view and campaign data
    trackCampaignData();
    trackPageView(location.pathname + location.search, document.title);
  }, []);

  // Track page views on route change
  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
  }, [location]);

  return (
    <>
      <ScrollLink />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/courses' element={<Courses/>}/>
        <Route path='/team' element={<Team/>}/>
        <Route path='/faqs' element={<FAQ/>}/>
        <Route path='/data-analytics' element={<DataAnalytics/>}/>
        <Route path='/customer-experience' element={<CustomerExperience/>}/>
        <Route path='/sales-marketing' element={<SalesMarketing/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/sdf-register-full' element={<SDFRegister/>}/>
        <Route path='/sdf-cohort-5' element={<SDFCohort5/>}/>
        <Route path='/sdf-confirmation' element={<SDFConfirmation/>}/>
        <Route path='/select-course' element={<SelectCourse/>}/>
        <Route path='/sdf/:cohortSlug' element={<SDFAllCohortsForm/>}/>
        <Route path='/health-check' element={<HealthCheck/>}/>
      </Routes>
      <PrereqModal />
      <InquiryModal />
    </>
  )
}
3
export default App
