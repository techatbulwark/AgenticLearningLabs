import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Courses from './pages/Courses'
import Team from './pages/Team'
import FAQ from './pages/FAQ'
import DataAnalytics from './pages/DataAnalytics'
import PrereqModal from './components/PrereqModal'
import ScrollLink from './components/ScrollLink'
import CustomerExperience from './pages/CustomerExperience'

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
        <Route path='/register' element={<Register/>}/>
      </Routes>
      <PrereqModal />
    </>
  )
}
3
export default App
