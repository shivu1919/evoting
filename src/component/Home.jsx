import React, { useState } from 'react'
import hstyle from "../css/Home.module.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Home() {

    const navigate = useNavigate()

    const[afid, setAfid] = useState(hstyle.adminForm)
    const[ufid, setUfid] = useState(hstyle.userForm)
    const[aemail, setAEmail] = useState('')
    const[apassword, setAPassword] = useState('')
    const[uadhar, setUAdhar] = useState('')
    const[umob, setUMob] = useState('')

    function showAdminForm(){
        setAfid(hstyle.adminFormShow)
    }

    function validateAdmin(){
        if(aemail=='' || apassword==''){
            alert("Please fill the details")
        }
        else{
            axios.post(`http://localhost:8080/admin/login?email=${aemail}&password=${apassword}`)
            .then((res)=> {
                if(res.data){
                    navigate("/admin")
                }
                else{
                    alert("Wrong credentials")
                }
            })
        }
    }

    function validateVoter(){
        if(uadhar=='' || umob==''){
            alert("Please fill the details")
        }
        else{
            axios.post(`http://localhost:8080/voter/login?adhar=${uadhar}&mob=${umob}`)
            .then((res)=> {
                if(res.data==''){
                    alert("Wrong credentials")
                }
                else{
                    navigate("/voter", {
                        state:{
                            name: res.data.name,
                            adhar: res.data.adhar
                        }
                    })
                }
            })
        }
    }

  return (
    <>
        <header id={hstyle.header}>
            <img src="menu.png" alt="" width="40"/>

            <h1 id={hstyle.head}>Election management committee of NiT</h1>

            <div>
                <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <img src="call.png" alt="" />
                    <p style={{color:"white", fontSize:"20px"}}>Toll Free - 1950</p>
                </div>
            </div>
        </header>
        <hr />

        <div id={hstyle.first}>
            <div>
                <h1>Are you an Admin?</h1>
                <button onClick={showAdminForm}>Login as Admin</button>
            </div>

            <div>
                <h1>Are you a user?</h1>
                <button onClick={()=> setUfid(hstyle.userFormShow)}>Login as user</button>
            </div>
        </div>


        <div id={afid}>

            <img src="close-button.png" alt="" width="40" onClick={()=> setAfid(hstyle.adminForm)}/>
            
            <h1>Admin login form</h1>

            <input 
            type="email" 
            placeholder='enter admin email' 
            value={aemail}
            onChange={(event)=>setAEmail(event.target.value)}
            />
            
            <input 
            type="password" 
            placeholder='enter admin password'
            value={apassword}
            onChange={(event)=> setAPassword(event.target.value)}
            />
       
            <button onClick={validateAdmin}>Login</button>
        </div>


        <div id={ufid}>
            <img src="close-button.png" alt="" width="40" onClick={()=> setUfid(hstyle.userForm)}/>
            <h1>Voter login form</h1>

            <input 
            type="text" 
            placeholder='Enter Adhar number'
            value={uadhar}
            onChange={(event)=> setUAdhar(event.target.value)}
            />

            <input 
            type="text" 
            placeholder='Enter Mobile number'
            value={umob}
            onChange={(event)=> setUMob(event.target.value)}
            />

            <button onClick={validateVoter}>Login</button>
        </div>
    </>
  )
}

export default Home