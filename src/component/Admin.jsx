import React, { useState } from 'react'
import astyle from '../css/Admin.module.css'
import axios from 'axios'

function Admin() {

  const[addid, setAddId] = useState(astyle.addVoterFormHidden)



  // function addVoter(){
  //       axios.post(`http://localhost:8080/admin/addVoter`,{
       
  //       name:"Test User",
  //       age:"18",
  //       gender:"Male",
  //       mob:"1231231230"
  //     })
  //     .then((res)=>console.log(res))
  //     .catch(()=> alert("Please fill the details correctly"))
  // }


  return (
    <>
        <marquee>
          <h1>Welcome Admin!</h1>
        </marquee>

        <div id={astyle.main}>
            <button onClick={()=> setAddId(astyle.addVoterFormShow)}>Add a new Voter</button>
            <button>Delete a Voter</button>
            <button>Announce the election</button>
        </div>


        <div id={addid}>

            <img src="close-button.png" alt="" width="40" onClick={()=> setAddId(astyle.addVoterFormHidden)}/>

            <h1>Add a new voter</h1>

            <input type="text" placeholder='enter adhar number'/>

            <input type="text" placeholder='enter voter name'/>

            <input type="text" placeholder='enter the age'/>

            <select name="" id="">
              <option value="">Select the gender</option>
              <option value="">Male</option>
              <option value="">Female</option>
              <option value="">Others</option>
            </select>
            
            <input type="text" placeholder='enter the mob'/>
        </div>
    </>
  )
}

export default Admin