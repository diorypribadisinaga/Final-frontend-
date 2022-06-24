
import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from "react-bootstrap";
import axios from 'axios';
import {Link} from "react-router-dom"

function App() {
  const [Users,SetUsers]=useState([])
  const deleteuser = async (id)=>{
        await axios.delete(`http://localhost:8000/deleteuser/${id}`)
        window.location.reload();
  }
  useEffect(()=>{
    fetchdata()
  },[]);
  const fetchdata = async()=>{
    const response= await fetch('http://localhost:8000')
    const data= await response.json()
    SetUsers(data)
  }

  return (
    <div className="App container-fluid py-5">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>No</th>
            <th>nama</th>
            <th>kota</th>
            <th>alamat</th>
            <th>nomor_hp</th>
            <th>image</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {Users.map((user,index)=>(
              <tr key={user.id}>
                <td>{index+1}</td>
                <td>{user.nama}</td>
                <td>{user.kota}</td>
                <td>{user.alamat}</td>
                <td>{user.nomor_hp}</td>
                <td><center><img className='rounded-circle' style={{width:'110px',height:'100px'}} src={user.image}></img></center></td>
                <td className="text-center">
                  <button onClick={()=>deleteuser(user.id)} className="btn btn-danger mx-2 my-1">Hapus</button>
                  <Link to={`/update/${user.id}`} className="btn btn-primary mx-2 my-1">Update</Link>
                </td>
              </tr>
            
          ))}
        </tbody>
      </Table>

    </div>
  );
}

export default App;
