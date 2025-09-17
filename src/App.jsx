import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './component/Home'
import Admin from './component/Admin'
import Voter from './component/Voter'
import Election from './component/Election'

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/admin" element={<Admin/>}></Route>
                <Route path="/voter" element={<Voter/>}></Route>
                <Route path="/election" element= {<Election/>}></Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App