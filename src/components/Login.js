import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

const Login = () => {
    let history = useHistory();
    const [creadential, setCreadential] = useState({email:"",password:""})
    const handlelogin = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3001/api/auth/login", {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: creadential.email,password: creadential.password})
        }
        );
        const json = await response.json();
        console.log(json.authtoken)
        if (json.authtoken) {
            //redirect
            localStorage.setItem("token" , json.authtoken)
            history.push("/")
        }else{
            alert("invalid")
        }
    }

    const onchange = (e) => {
        setCreadential({...creadential , [e.target.name]: e.target.value})
    }
    return (
        <div className="contianer">
            <form onSubmit={handlelogin}>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp" value={creadential.email} onChange={onchange}/>
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" value={creadential.password} onChange={onchange}/>
                </div>
                <button type="submite" class="btn btn-primary"> Submit</button>
            </form>
        </div>
    )
}

export default Login
