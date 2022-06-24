import React,{useEffect,useState} from 'react'
import axios from 'axios'
import jwt_decode from "jwt-decode"
import { Link, useNavigate,useParams} from 'react-router-dom'

export default function Home() {
    // const [nama,SetNama] =  useState("")
    const [token,SetToken] = useState("")
    const {email} = useParams()
    const [user,SetUser] = useState("")
    const navigasi = useNavigate()

    useEffect(()=>{
        refreshToken();
        // fetchdata()
        // Verifikasi()
    },[])

    // const fetchdata = async()=>{
    //     const response = await axios.get("http://localhost:8000/user",
    //             {
    //                 headers: {
    //                 "Authorization": `Bearer ${token}`
    //                 }
    //             }
    //         )
    //     console.log(response.data);
    // }
    const fetchdata = async()=>{
        const response= await fetch(`http://localhost:8000/usernama/${email}`)
        const data= await response.json()
        SetUser(data)
    }
    // const ada = async()=>{
    //     await fetch(`http://localhost:8000/user/${id}`)
    // }
    // if(!ada){
    //     navigasi('/')
    //     return
    // }
    
    // console.log(user.refresh_token);
    // const Verifikasi = async()=>{
    //     try {
    //         const response = await axios.get("http://localhost:8000/user",
    //             {headers: {
    //             "Authorization": `Bearer ${user.refresh_token}`,
    //             },
    //         }
    //         )
    //         console.log(user.refresh_token);
    //     } catch (error) {
            
    //     }
    // }

    const refreshToken = async()=>{
        try {
            let response = await axios.get("http://localhost:8000/token",{
                withCredentials:"true"
            })
            SetToken(response.data.accessToken)
            const decoded = jwt_decode(response.data.accessToken)
            // console.log(decoded);
            // console.log(response.data);
            response = await axios.get("http://localhost:8000/user",
                {headers: {
                    "Authorization": `Bearer ${response.data.accessToken}`,
                    },
                }
            )
            // console.log(response.data);
            if(email!=response.data.email){
                navigasi(`/home/${response.data.email}`)
                window.location.reload();
                return
            }
            response = await fetch(`http://localhost:8000/usernama/${response.data.email}`)
            const data= await response.json()
            SetUser(data)
            // try {
            //     const response = await axios.get("http://localhost:8000/user",
            //         {headers: {
            //         "Authorization": `Bearer ${response.data.accessToken}`,
            //         },
            //     }
            //     )
            //     console.log(token);
            // } catch (error) {
            //     navigasi("/")
            // }
            // SetNama(decoded.nama)
        } catch (error) {
            navigasi("/")
        }
    }

    const Logout = async(e)=>{
        e.preventDefault()
        await axios.delete("http://localhost:8000/logout",{
            withCredentials:'true'
        })
        navigasi("/")
    }
    const deleteuser = async (id)=>{
        await axios.delete(`http://localhost:8000/deleteuser/${id}`)
        window.location.reload();
    }

    return (
        <div className='container'>
            <h1>Home</h1>
            <h3> Selamat Datang <span style={{color:"blue"}}>{user.nama}</span></h3>
            <img className='mx-5 mb-2 rounded-circle' style={{width:'210px',height:'200px'}} src={user.image}/><br/>
            <Link to={`/update/${user.id}`} className='btn btn-primary my-2'>Update</Link>
            <button onClick={Logout} className='btn btn-warning mx-1'>Logout</button>
            <button onClick={()=>deleteuser(user.id)} className='btn btn-danger mx-1'>Hapus Akun</button>
        </div>
    )
}
