import { useState } from "react"
import api from "../api";

function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post('/register', { username, password })
            setMsg(res.data.message);
        } catch (err) {
            setMsg(err.response?.data?.message || "Error");
        }

    }
    return (<div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button>register</button>
        </form>
        <p>{msg}</p>
    </div>)
}

export default Register