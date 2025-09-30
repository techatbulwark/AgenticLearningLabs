import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import SDFRegister from './pages/SDFRegister'
import BakSDFRegister  from './pages/BakSDFRegister'
import Courses from './pages/Courses'
import Team from './pages/Team'
import FAQ from './pages/FAQ'
import DataAnalytics from './pages/DataAnalytics'
import PrereqModal from './components/PrereqModal'
import ScrollLink from './components/ScrollLink'
import CustomerExperience from './pages/CustomerExperience'
import SalesMarketing from './pages/SalesMarketing'
import InquiryModal from './components/InquiryModal'

function App() {

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
        <Route path='/bak-register-full' element={<BakSDFRegister/>}/>
      </Routes>
      <PrereqModal />
      <InquiryModal />
    </>
  )
}

export default App
