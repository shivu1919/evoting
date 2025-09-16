import React, { useState } from 'react'
import astyle from '../css/Admin.module.css'
import axios from 'axios'

function Admin() {

  const [addid, setAddId] = useState(astyle.addVoterFormHidden)
  const [delid, setDelId] = useState(astyle.delFormHidden)
  const[eleid, setEleId] = useState(astyle.eleFormHidden)

  const [adhar, setAdhar] = useState('')
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [mob, setMob] = useState('')

  const[electionId, setElectionId] = useState('')
  const[electionName, setElectionName] = useState('')
  const[electionDate, setElectionDate] = useState('')


  function addVoter() {
    if (adhar == '' || name == '' || age == '' || gender == '' || mob == '') {
      alert("Please fill all the details")
    }

    else {
      axios.post('http://localhost:8080/admin/addVoter', {
        adhar: adhar,
        name: name,
        age: age,
        gender: gender,
        mob: mob
      })
        .then((res) => {
          if (res.data) {
            alert("Voter added successfully")
            setAdhar('')
            setName('')
            setAge('')
            setGender('')
            setMob('')
            setAddId(astyle.addVoterFormHidden)
          }
          else {
            alert("Something went wrong!")
          }
        })
    }
  }


  function deleteVoter() {
    if (adhar == '') {
      alert("Please enter adhar number to delete the voter")
    }

    else {
      axios.post(`http://localhost:8080/admin/deleteVoter?adhar=${adhar}`)
        .then((res) => {
          if (res.data) {
            alert("Voter deleted successfully")
            setAdhar('')
            setDelId(astyle.delFormHidden)
          }
          else {
            alert("Cannot find voter with given adhar number")
            setAdhar('')
          }
        })
    }
  }


  function createElection(){
      if(electionId=='' || electionName=='' || electionDate==''){
        alert("Please fill all the details")
      }
      else{
        axios.post('http://localhost:8080/admin/createElection',{
          id: electionId,
          name: electionName,
          date: electionDate
        })
        .then((res)=>{
          if(res.data){
            alert("Election created successfully")
            setElectionId('')
            setElectionDate('')
            setElectionName('')
            setEleId(astyle.eleFormHidden)
          }
          else{
            alert("Cannot create election")
             setElectionId('')
            setElectionDate('')
            setElectionName('')
            setEleId(astyle.eleFormHidden)
          }
        })
      }
  }


  return (
    <>
      <marquee>
        <h1>Welcome Admin!</h1>
      </marquee>

      <div id={astyle.main}>
        <button onClick={() => setAddId(astyle.addVoterFormShow)}>Add a new Voter</button>
        <button onClick={() => setDelId(astyle.delFormShow)}>Delete a Voter</button>
        <button onClick={()=> setEleId(astyle.eleFormShow)}>Announce the election</button>
      </div>


      <div id={addid}>

        <img src="close-button.png" alt="" width="40" onClick={() => setAddId(astyle.addVoterFormHidden)} />

        <h1>Add a new voter</h1>

        <input
          type="text"
          placeholder='enter adhar number'
          value={adhar}
          onChange={(event) => setAdhar(event.target.value)}
        />

        <input
          type="text"
          placeholder='enter voter name'
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          type="text"
          placeholder='enter the age'
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />

        <select name="" id="" value={gender} onChange={(event) => setGender(event.target.value)}>
          <option value="">Select the gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>

        <input
          type="text"
          placeholder='enter the mob'
          value={mob}
          onChange={(event) => setMob(event.target.value)}
        />

        <button onClick={addVoter}>Add voter</button>
      </div>


      <div id={delid}>
        <img src="close-button.png" width="40" onClick={() => setDelId(astyle.delFormHidden)} />
        <h1>Delete the voter by Id</h1>
        <input
          type="text"
          placeholder="enter voter's adhar number"
          value={adhar}
          onChange={(event) => setAdhar(event.target.value)}
        />
        <button onClick={deleteVoter}>Delete</button>
      </div>


      <div id={eleid}>
          <img src="close-button.png" width="40"  onClick={()=> setEleId(astyle.eleFormHidden)}/>

          <h1>Announce a new election</h1>

          <input 
          type="text" 
          placeholder='Enter election ID'
          value={electionId}
          onChange={(event)=> setElectionId(event.target.value)}
          />

          <input 
          type="text"
          placeholder='Enter election name'
          value={electionName}
          onChange={(event)=> setElectionName(event.target.value)}
           />

          <input 
          type="date"
          value={electionDate}
          onChange={(event)=> setElectionDate(event.target.value)}
          />

          <button onClick={createElection}>Create Election</button>
      </div>
    </>
  )
}

export default Admin