import { useState, Fragment,useEffect } from "react";
import axios from "axios";
import { useNavigate,useParams} from 'react-router-dom'

function App1() {
  const [user,SetUser] = useState("")
  const [file, setFile] = useState(null);
  const navigasi = useNavigate()
  // const [image,SetImage] = useState("https://fakeimg.pl/350x200/")
  const {id} = useParams()
  function handleUploadChange(e) {
    let uploaded = e.target.files[0];
    SetImage(URL.createObjectURL(uploaded));
    setFile(uploaded);
  }
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
      console.log(image);

    } catch (err) {
      console.log(err);
      console.log(err?.responses?.data);
    }
  }

  return (
    <Fragment>
      {/* {image && (
        <center><img style={{width:'500px',height:'500px'}} src={image} alt="Uploaded Image URL" /></center>
      )} */}
      <center><img className="py-3" style={{width:'350px',height:'300px'}} src={image} alt="Uploaded Image URL" /></center>
      <form >
        <p>{user.image}</p>
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
        <input type="file" onChange={handleUploadChange} />
        {/* <button onClick={handleSubmit} type="submit" value="Upload"><button/> */}
          <button onClick={handleSubmit}>Save</button>
      </form>
    </Fragment>
  );
}

export default App1;
