import React, { useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import vstyle from "../css/Voter.module.css"

function Voter() {

  const location = useLocation();
  const navigate = useNavigate();
  
  const {name, adhar} = location.state || {}

  console.log(name)

  const[election, setElection] = useState('')
  const[conForm, setConForm] = useState(vstyle.contestFormHidden)
  const[symbol, setSymbol] = useState('')


  function checkElection(){
      axios.get('http://localhost:8080/voter/checkElection')
      .then((res)=>{
          setElection(res.data)
      })
  }

  checkElection()


  function becomeLeader(){
      if(symbol.trim()==''|| name=='' || adhar==''){
        alert("Cannot proceed because of incomplete details")
      }

      else{
          axios.post("http://localhost:8080/voter/contestElection", {
              adhar: adhar,
              name: name,
              symbol: symbol
          })
          .then((res)=>{
            if(res.data=="Best wishes for election"){
                alert("You are a leader now, best wishes for election")
                setConForm(vstyle.contestFormHidden)
            }
            else{
                alert("Something went wrong, please contact admin")
                setConForm(vstyle.contestFormHidden)
            }
          })
      }
  }

  function goToElection(){
      navigate("/election", {
        state:{
          ano: adhar
        }
      })
  }


  useEffect(()=>{
    if(name==undefined){
      alert("Please login first")
      navigate("/")
    }
  }, [])


  return (
    <>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-around"}}>
          <h1>Welcome: {name}</h1>
          <h1>Adhar no. {adhar}</h1>
        </div>

        <marquee>
          <h1>Upcoming election: {election}</h1>
        </marquee>


        <div id={vstyle.main}>
            <button onClick={()=> setConForm(vstyle.contestFormShow)}>Contest Election</button>

            <button onClick={goToElection}>Cast your vote</button>
        </div>


        <div id={conForm}>
            <img src="close-button.png" width="40" onClick={()=> setConForm(vstyle.contestFormHidden)}/>
            <h1>Become a leader</h1>
            <input 
            type="text" 
            placeholder='Please enter your party symbol'
            value={symbol}
            onChange={(event)=> setSymbol(event.target.value)}
            />
            <button onClick={becomeLeader}>Continue</button>
        </div>
    </>
  )
}

export default Voter