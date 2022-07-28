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
    let abilitiesStr = abilities.map(ability => ability.title)

    const offer = {
      title,
      description,
      abilities: abilitiesStr,
    };
    console.log("Offer",offer)
    await createOffer(offer);
    navigate("/");
  };

  const addAbilities = (abilities) => {
    setAbilities(abilities);
  };

  return (

    <div className="card-principal" >
      <Card.Body >
        <Card.Title className="mb-4" >Nueva posición</Card.Title>
        <Form onSubmit={(e) => store(e)}>

          <Form.Group className="mb-4" controlId="position-title">
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
              className="col-md-12"
            />
          </Form.Group>
          <Abilities addAbilities={addAbilities} abilities={abilities} />
          <div className="text-right">
            <Button variant="primary" type="submit">
              Cargar posición
            </Button>
          </div>
        </Form>
      </Card.Body>

    </div>

  );
};

export default FormOffer;
