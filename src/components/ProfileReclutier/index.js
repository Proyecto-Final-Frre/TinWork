import { useEffect, useState } from "react";
import {  Card, Form } from "react-bootstrap";
import "./style.css";
import { useAuth } from "../../context/AuthContext";
import { upload } from "../../config/firebase";
import Swal from "sweetalert2";

const ProfileReclutier=() =>{
    const { user } = useAuth();
    console.log("Usuario",user)
    // console.log("Usuario",user.displayName)
    // console.log("Usuario",user.uid)
    const [editarDescrip, setEditarDescrip] = useState(false)

    const [photo, setPhoto]=useState(null);
    const [loading,setLoading]=useState(false);
    
    const [editar,setEditar]=useState(false)
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png")
    


    const mostrarAlerta = () => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Se ha cambiado su foto de perfil",
          showConfirmButton: false,
          timer: 3000,
        });
      };

    const handleChange =(e) =>{

        if(e.target.files[0]) {
            setPhoto(e.target.files[0])
        }
    }
        
    const handleClick =() =>{
        upload(photo,user,setLoading);
        mostrarAlerta()
        window.location.reload()
    }
   
    useEffect(()=> {
     if (user?.photoURL) {
        setPhotoURL(user.photoURL)
     }
    }, [user])


    return (
        <div className="principal">
            <div className="profile">
                <Card.Body>
                    <Form >
                        <div className="grid">
                            <div className="grid-1">
                                <div className="image">
                                    <img src={photoURL} alt="logo" className="image"/>
                                    <button type="button" class="boton" onClick={()=>setEditar(true)}  >Editar foto</button>
                                    {editar && 
                                    <div>
                                    <button  onClick={()=>setEditar(false)}  >No editar</button>
                                    <button disabled={loading || !photo} onClick={handleClick} >Subir</button>
                                    <input type="file" onChange={handleChange} />
                                    </div>    
                                    }
                                </div> 
                                                               
                            </div>
                            <div className="grid-2">
                                <label htmlFor="name" >
                                    <font color="gray">Nombre/s y apellido/s</font>
                                </label>
                                <p className="card-text">{user?.displayName || ""}</p>
                                <label htmlFor="name">
                                    <font color="gray">Correo</font>
                                </label>
                                <p className="card-text">{user?.email || ""}</p>
                            </div>
                        </div>
                        <div className="pie-foto">
                            <label htmlFor="name"><font color="gray">Ubicación</font> </label>
                            <button type="button" className="button" >Agregar</button>
                            <br></br>
                            <label htmlFor="name">
                                <font color="gray">Descripción</font>
                            </label>
                            {!editarDescrip &&
                                <button
                                    className='btn btn-dark'
                                    onClick={() => setEditarDescrip(true)}
                                >
                                    Editar
                                </button>}
                            {
                                editarDescrip &&
                                <div className="card-body">
                                    <div className="row justify-content-center">
                                        <div className="col-md-5">
                                            <div className="input-group mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    aria-label="Recipient's username"

                                                />
                                                <div className="input-group-append">
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        onClick={() => setEditarDescrip(false)}
                                                    >
                                                        Editar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>

                    </Form>
                </Card.Body>

            </div>
        </div>
    );
}

export default ProfileReclutier