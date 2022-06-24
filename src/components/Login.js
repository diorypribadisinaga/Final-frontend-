import React,{useState,useEffect} from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const [email,SetEmail]=useState("")
    const [password,SetPassword]=useState("")
    const [msg,setmsg]=useState("")
    // const [Users,SetUsers] =useState([])
    // const [User,SetUser] = useState([])
    const navigasi = useNavigate()

    // useEffect(()=>{
    //     fetchdata()
    // });

    // const fetchdata = async()=>{
    //     const response= await fetch('http://localhost:8000')
    //     const data= await response.json()
    //     SetUsers(data)
    //     let m
    //     for(let i=0 ;i<data.length;i++){
    //         if(data[i].email==email){
    //             m=i
    //         }
    //     }
    //     SetUser(data[m])
    //     // console.log(data);
    // }

    const login = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/login",{
                email:email,
                password:password,
            },{
                withCredentials:true
            })
            // console.log(response.data);
            const data = await response.data
            // const response1 = await fetch(`http://localhost:8000`)
            // const data1= await response1.json()
            // let m
            // for(let i=0 ;i<Users.length;i++){
            //     if(Users[i].email==email){
            //         m=i
            //     }
            // }
            // const data1 =  Users[m]
            // console.log(User);
            // SetUser(data[m])
            // console.log(data[m].refresh_token);
            // console.log(data1.accessToken);
            await axios.get("http://localhost:8000/user",
                {
                    headers: {
                    "Authorization": `Bearer ${data.accessToken}`
                    }
                }
            )
            // console.log(data.accessToken);
            // console.log(Users);
            // console.log(data.accessToken);
            // console.log(data);
            await navigasi(`/home/${data.email}`)
        } catch (error) {
            if(error.response){
                setmsg(error.response.data.msg)
                console.log(error.response.data);
            }
        }
    }


    return (
        <div className='container'>
            <form className='py-4' style={{width:"50%",marginLeft:"auto",marginRight:"auto"}} onSubmit={login}>
                <h2>Login</h2>
                <h5 className='text-center'>{msg}</h5>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control"  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email Anda" value={email} onChange={(e)=>SetEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="Password Anda" value={password} onChange={(e)=>SetPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-success mx-2">Login</button>
                <Link to={"/register"} className="btn btn-primary">Register</Link>
            </form>
        </div>
    )
}
