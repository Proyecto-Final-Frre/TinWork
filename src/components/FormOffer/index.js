import { Button, Card, Form } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOffer } from "../../services/OfferService";
import Abilities from "../Abilities";
import "./style.css";

const FormOffer = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [abilities, setAbilities] = useState([]);

  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();

    console.log("habilidades", abilities);

    const offer = {
      title,
      description,
      abilities,
    };
    await createOffer(offer);
    navigate("/");
  };

  const addAbilities = (ability) => {
    setAbilities(ability);
  };

  return (
    
    <div class="card-principal" >
      <Card.Body >
        <Card.Title className="mb-4" >Nueva posición</Card.Title>                     
        <Form onSubmit={store}>
          
          <Form.Group className="mb-4"  controlId="position-title">
            <Form.Control
              type="text"
              placeholder="Título de la posición"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="position-description">
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Descripción de la posición"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="form-control"
            />
          </Form.Group>
          <Abilities  addAbilities={addAbilities} abilities={abilities} />
          
        </Form>
        <Button  variant="primary" type="submit">
            Cargar posición
        </Button>
      </Card.Body>
      
    </div>
    
  );
};

export default FormOffer;
