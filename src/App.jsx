import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './component/Home'
import Admin from './component/Admin'
import Voter from './component/Voter'


function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/admin" element={<Admin/>}></Route>
                <Route path="/voter" element={<Voter/>}></Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App