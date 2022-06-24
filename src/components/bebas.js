import React,{useState,useEffect,Fragment} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"
import { useNavigate,useParams} from 'react-router-dom'

export default function Update() {
    const [user,SetUser] = useState("")
    const {id} = useParams()
    const [file, setFile] = useState(null);
    const navigasi = useNavigate()

    // function handleUploadChange(e) {
    //     let uploaded = e.target.files[0];
    //     SetImage(URL.createObjectURL(uploaded));
    //     console.log(uploaded);
    //     if(uploaded){
    //         setFile(uploaded);
    //     }else{
    //         setFile(image);
    //     }
    // }

    const fetchdata = async()=>{
        const response= await fetch(`http://localhost:8000/user/${id}`)
        const data= await response.json()
        SetUser(data)
    }
    const ada = async()=>{
        await fetch(`http://localhost:8000/user/${id}`)
    }
    if(!ada){
        navigasi('/')
        return
    }
    useEffect(()=>{
        fetchdata()
    },[]);
    const [nama,SetNama]=useState(user.nama)
    const [kota,SetKota]=useState(user.kota)
    const [alamat,SetAlamat]=useState(user.alamat)
    const [image,SetImage]=useState(user.image)
    const [nomor_hp,SetNomor_hp] = useState(user.nomor_hp)
    const [msg,setmsg]=useState("")

    // console.log(image);
    // console.log(user.image);
    console.log(file);
    
    function handleUploadChange(e) {
        let uploaded = e.target.files[0];
        SetImage(URL.createObjectURL(uploaded));
        setFile(uploaded);
        // console.log(uploaded);
        // if(uploaded){
        //     setFile(uploaded);
        // }else{
        //     setFile(image);
        // }
        // console.log(file);
        // console.log(user.image);
    }
    // console.log(file);
    // console.log(image);
//     const [user,SetUser] = useState("")
//   const [file, setFile] = useState(null);
//   const navigasi = useNavigate()
//   // const [image,SetImage] = useState("https://fakeimg.pl/350x200/")
//   const {id} = useParams()
//   function handleUploadChange(e) {
//     let uploaded = e.target.files[0];
//     SetImage(URL.createObjectURL(uploaded));
//     setFile(uploaded);
//   }
//   const fetchdata = async()=>{
//     const response= await fetch(`http://localhost:8000/user/${id}`)
//     const data= await response.json()
//     SetUser(data)
//   }
//   const ada = async()=>{
//       await fetch(`http://localhost:8000/user/${id}`)
//   }
//   if(!ada){
//       navigasi('/')
//       return
//   }
//   useEffect(()=>{
//       fetchdata()
//   },[]);
//   const [nama,SetNama]=useState(user.nama)
//   const [kota,SetKota]=useState(user.kota)
//   const [alamat,SetAlamat]=useState(user.alamat)
//   const [image,SetImage]=useState(user.image)
//   const [nomor_hp,SetNomor_hp] = useState(user.nomor_hp)
//   const [msg,setmsg]=useState("")
    // const [uploadedFileURL, setUploadedFileURL] = useState(null);
    // function handleUploadChange(e) {
    //     let uploaded = e.target.files[0];
    //     console.log(upload);
    //     SetImage(URL.createObjectURL(uploaded));
    //     setFile(uploaded);
    // }
    async function handleSubmit(e) {
        e.preventDefault();

        const form = new FormData();

        form.append("image", file);

        try {
        const response = await axios.put(
            "http://localhost:8000/api/v1/profiles/:id/image/cloudinary",
            form,
            {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            }
        );
        
        await axios.put(
            'http://localhost:8000/api/v1/profiles/:id/image',
            form,
            {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            }
        )
        // setUploadedFileURL("http://localhost:8080/" + response1.data.url);
        // Kalo di upload langsung di-server
        // setUploadedFileURL(response.data.url);
        SetImage(response.data.url)
        await axios.put(`http://localhost:8000/update/${id}`,{
            nama:nama,
            kota:kota,
            alamat:alamat,
            nomor_hp:nomor_hp,
            image:response.data.url
        })
        console.log(response.data.url);
        // console.log(image);
        // navigasi('/')
        
        } catch (err) {
        console.log(err);
        console.log(err?.responses?.data);
        }
    }

    const update = async(e)=>{
        e.preventDefault();
        // handleSubmit();
        try {
            await axios.put(`http://localhost:8000/update/${id}`,{
                nama:nama,
                kota:kota,
                alamat:alamat,
                nomor_hp:nomor_hp,
                image:image
            })
                navigasi('/')
            } catch (error) {               
                if(error.response){
                    setmsg(error.response.data.msg)
                    console.log(error.response.data);
            }
        }
    }
    return (
        <div className='container'>
            <Fragment>
                <p>{nama}</p>
                <p>{image}</p>
            <form className='py-4' style={{width:"50%",marginLeft:"auto",marginRight:"auto"}}>
                <h2>Update</h2>
                <h5 className='text-center'>{msg}</h5>
                <div className="mb-3">
                    <label for="exampleInputNama" className="form-label">Nama</label>
                    <input type="Nama" placeholder={user.nama} className="form-control" value={nama} onChange={(e)=>SetNama(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputkota" className="form-label">Kota</label>
                    <input type="text" className="form-control" placeholder={user.kota} value={kota} onChange={(e)=>SetKota(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputalamat" className="form-label">alamat</label>
                    <input type="text" className="form-control"  placeholder={user.alamat} value={alamat} onChange={(e)=>SetAlamat(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputnomorhp" className="form-label">nomor_hp</label>
                    <input type="text" className="form-control"  placeholder={user.nomor_hp} value={nomor_hp} onChange={(e)=>SetNomor_hp(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputimage" className="form-label">image</label>
                    {/* <input class="form-control form-control-sm" id="formFileSm" type="file" value={image} onChange={(e)=>SetImage(e.target.value)}/> */}
                    <input class="form-control form-control-sm" id="formFileSm" type="file" onChange={handleUploadChange} />
                </div>
                <center><img value={image} className='rounded-circle' style={{width:'220px',height:'200px'}} src={image}></img></center>
                <button onClick={handleSubmit} className="btn btn-primary" type='submit'>Update</button>
            </form>
            </Fragment>
        
        </div>
        
        // <Fragment>
            //     {/* {uploadedFileURL && (
            //         <center><img style={{width:'100px',height:'100px'}} src={uploadedFileURL} alt="Uploaded Image URL" /></center>
            //     )} */}
            //     {image && (
            //         <center><img style={{width:'500px',height:'500px'}} src={image} alt="Uploaded Image URL" /></center>
            //     )}

            //     <form onSubmit={handleSubmit}>
            //         {/* <input type="file" onChange={(e) => setFile(e.target.files[0])} /> */}
            //         <input type="file" onChange={handleUploadChange} />
            //         <input type="submit" value="Upload" />
            //     </form>
            // </Fragment>
    )
}
            