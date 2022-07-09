import { Button, Card, Form } from "react-bootstrap";
import React, { useState } from "react";
//import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { createOffer } from "../../services/OfferService";
import Abilities from "../Abilities";
import "./style.css";

const FormOffer = () => {
  // configuramos los hooks
  const [tituloPosicion, setTituloPosicion] = useState("");
  const [descPosicion, setDescPosicion] = useState("");

  //para navegar entre paginas rutas
  const navigate = useNavigate();

  //tomamos las ofertas de la db

  const store = async (e) => {
    e.preventDefault();

    const offer = {
      title: tituloPosicion,
      description: descPosicion,
    };

    const offerCreated = await createOffer(offer);
    console.log(offerCreated);
    //para redireccionar a la home se usa la siguiente linea de codigo
    navigate("/");
    //console.log(e.target[0])
  };
  return (
    <Card>
      <Card.Body>
        <Card.Title>Nueva posición</Card.Title>
        <hr />

        <Form onSubmit={store}>
          <Form.Group className="mb-3" controlId="tituloPosicion">
            <Form.Control
              type="text"
              placeholder="Título de la posición"
              value={tituloPosicion}
              onChange={(e) => setTituloPosicion(e.target.value)}
              className="form-control"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="descripcionPosicion">
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Descripción de la posición"
              value={descPosicion}
              onChange={(e) => setDescPosicion(e.target.value)}
              type="text"
              className="form-control"
            />
          </Form.Group>

          <Abilities />
          <hr />
          <hr />
          <Button variant="primary" type="submit">
            Cargar posición
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FormOffer;
