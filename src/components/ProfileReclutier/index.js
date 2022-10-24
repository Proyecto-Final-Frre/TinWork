import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { Button, Card, Form } from "react-bootstrap";
import "./style.css";
import logoRecrutier from "../../logos/Reclutier.png";

function ProfileReclutier() {

    const [editarCorreo, setEditarCorreo] = useState(true)

    return (
        <div className="principal">
            <div className="profile">
                <img src={logoRecrutier} alt="logo" />
                <Card.Body>
                    <Form >
                        <label htmlFor="name">
                            Nombre
                        </label>
                        <p className="card-text">Luciano</p>

                        <label htmlFor="name">
                            Apellido
                        </label>
                        <p className="card-text">Lugo</p>
                        <label htmlFor="name">
                            Correo
                        </label>
                        <p className="card-text">prueba@gmail.com</p>
                        <label htmlFor="name"> Ubicación </label>
                        <button type="button" className="button" >Agregar</button>
                        <br></br>
                        <label htmlFor="name">
                            Descripción
                        </label>
                        <button type="button" className="button" >Agregar</button>
                    </Form>
                </Card.Body>
            </div>
        </div>
    );
}

export default ProfileReclutier