import React, { useEffect, useState } from 'react'
import estyle from "../css/Election.module.css"
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

function Election() {

    const navigate = useNavigate()
    const location = useLocation()
    const{ano} = location.state || ''

    useEffect(()=>{
        if(ano==null){
            alert("please login")
            navigate("/")
        }
    }, [])

    const [response, setResponse] = useState('')
    const [leader, setLeader] = useState([])
    const [status, setStatus] = useState(false)

    const[option, setOption] = useState('')


    function checkElection() {
        axios.get("http://localhost:8080/voter/checkElection")
            .then((res) => {
                setResponse(res.data)
            })
    }



    function checkAllLeader() {
        axios.get('http://localhost:8080/voter/allLeaders')
            .then((res) => {
                setLeader(res.data)
                if (res.data.length != 0) {
                    setStatus(true)
                }
            })
    }

    useEffect(() => {
        checkElection()
        checkAllLeader()
    }, [])


    function castVote(){
        axios.post("http://localhost:8080/election/castVote", {
            adhar: ano,
            symbol: option
        })

        .then((res)=>{
            if(res.data){
                alert("Casted the vote successfully")
                navigate("/")
            }
            else{
                alert("You have already casted the vote")
                navigate("/")
            }
        })
    }

    return (
        <>
            <marquee>
                <h1>Cast your vote towards development and be a responsible citizen</h1>
                <h2>{response}</h2>
            </marquee>

            <center>

                {status && <div>
                    <h1>All the leader</h1>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Symbol</th>
                            <th>Choose</th>
                        </tr>

                        {leader.map((item, index) =>
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.symbol}</td>
                                <td>
                                    <input 
                                    id={item.symbol} 
                                    type="radio" 
                                    name="candidate" 
                                    value={option}
                                    onChange={()=>setOption(item.symbol)}
                                    />
                                </td>
                            </tr>
                        )}
                    </table>
                        <br /><br /><br />
                    <button id={estyle.votebtn} onClick={castVote}>Cast your vote</button>
                </div>}
            </center>
        </>
    )
}

export default Election