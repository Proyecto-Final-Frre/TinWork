import { Button, Card, Form } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOffer } from "../../services/OfferService";
import Abilities from "../Abilities";
import "./style.css";

const FormOffer = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();
    const offer = {
      title,
      description,
    };
    await createOffer(offer);
    navigate("/");
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Nueva posición</Card.Title>
        <hr />
        <Form onSubmit={store}>
          <Form.Group className="mb-3" controlId="position-title">
            <Form.Control
              type="text"
              placeholder="Título de la posición"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="position-description">
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

          <Abilities />
          <Button variant="primary" type="submit">
            Cargar posición
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FormOffer;
