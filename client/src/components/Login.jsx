import { useState } from "react"
import api from "../api";


function Login({onLogin}){
    const[username, setUsername]=useState("")
    const [password, setPassword]=useState("")
    const[msg, setMsg]=useState(" ")

    const handleSubmit=async(e)=>{
        e.preventDefault()

        try {           
            const res= await api.post('/login', {username, password })
            console.log({username});
            
           localStorage.setItem("token", res.data.token) 
           console.log(res.data.token);
           
            // setMsg(res.data.message);
            onLogin()
        } catch (err) {
            setMsg(err.response?.data?.message || "Error");
        }
    }

    return(<div>

        <h2>login</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" />
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" />
            <button>login</button>
        </form>
        <p>{msg}</p>

    </div>)
}

export default Login