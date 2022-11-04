import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { Button, Card, Form } from "react-bootstrap";
import "./style.css";
import logoProfile from "../../logos/logoProfile.png";
import {  BsPersonSquare } from "react-icons/bs";
import { useAuth } from "../../context/AuthContext";

function ProfileReclutier() {
    const { user } = useAuth();
    //console.log("Usuario",user)
    //console.log("Usuario",user.displayName)
    const [editarDescrip, setEditarDescrip] = useState(true)

    return (
        <div className="principal">
            <div className="profile">
                <div>
                    <img src={logoProfile} alt="logo" width="200" className="image"/>
                    <button type="button" class="boton ">Agregar</button>
                </div>
                <Card.Body>
                    <Form >
                       
                        <label htmlFor="name" >
                           <font color="gray">Nombre/s y apellido/s</font> 
                            
                        </label>
                        <p className="card-text">{user?.displayName  || ""}</p>
                        <label htmlFor="name">
                            <font color="gray">Correo</font> 
                        </label>
                        
                        <p className="card-text">{user?.email  || ""}</p>
                        <label htmlFor="name"><font color="gray">Ubicación</font> </label>
                        <button type="button" className="button" >Agregar</button>
                        <br></br>
                        <label htmlFor="name">
                        <font color="gray">Descripción</font>
                        </label>
                        <button type="button" className="button" >Agregar</button>
                        
                    
                    </Form>
                </Card.Body>
                
            </div>
        </div>
    );
}

export default ProfileReclutier