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
                <Card.Body>
                    <Form >
                        <div className="grid">
                            <div className="grid-1">
                                <img src={logoProfile} alt="logo" className="image"/>
                                <button type="button" class="boton">Agregar</button>
                            </div>
                            <div className="grid-2">
                                <label htmlFor="name" >
                                <font color="gray">Nombre/s y apellido/s</font> 
                                </label>
                                <p className="card-text">{user?.displayName  || ""}</p>
                                <label htmlFor="name">
                                    <font color="gray">Correo</font> 
                                </label>
                                <p className="card-text">{user?.email  || ""}</p>
                            </div>
                        </div>
                        <div className="pie-foto">
                            <label htmlFor="name"><font color="gray">Ubicación</font> </label>
                            <button type="button" className="button" >Agregar</button>
                            <br></br>
                            <label htmlFor="name">
                            <font color="gray">Descripción</font>
                            </label>
                            <button type="button" className="button" >Agregar</button>
                        </div>
                    
                    </Form>
                </Card.Body>
                
            </div>
        </div>
    );
}

export default ProfileReclutier