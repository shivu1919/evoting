import React from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';

function Voter() {

  const location = useLocation();
  
  const {name, adhar} = location.state || {}

  const[election, setElection] = useState('')


  function checkElection(){
      axios.get('http://localhost:8080/voter/checkElection')
      .then((res)=>{
          setElection(res.data)
      })
  }

  checkElection()

  return (
    <>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-around"}}>
          <h1>Welcome: {name}</h1>
          <h1>Adhar no. {adhar}</h1>
        </div>

        <marquee>
          <h1>Upcoming election: {election}</h1>
        </marquee>
    </>
  )
}

export default Voter