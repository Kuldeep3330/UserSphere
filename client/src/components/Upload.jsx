import { useState } from "react";
import api from "../api";

function Upload(){
    const[file, setFile]=useState(null)
    const [msg, setMsg]=useState("")

    const handleUpload=async()=>{
        const formData= new FormData()
        formData.append("image", file)

        try {
            const res= await api.post("/upload", formData, {
                headers:{"Content-Type": "multipart/form-data"}
            })
            setMsg(res.data.message)
        } catch (error) {
            setMsg("upload failed")
        }
    }

    return(<div>
        <h2>Upload Profile Pic</h2>
        <input type="file" onChange={e=>setFile(e.target.files[0])} />
        <button onClick={handleUpload}>upload</button>
        <p>{msg}</p>
    </div>)

}

export default Upload