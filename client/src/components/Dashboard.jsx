import { useEffect } from "react"
import { useState } from "react"
import api from "../api";

function Dashboard(){
    const[msg, setMsg]=useState("")
    useEffect(()=>{
        api.get("/")
        .then(res=>setMsg(res.data.message))
        .catch(()=>setMsg("unauthorized"))
    })

    return <h3>{msg}</h3>
}

export default Dashboard