import { Button, Card, Form } from 'react-bootstrap';
import CargarHabilidad from './CargarHabilidad';

function CrearOferta() {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Nueva posición</Card.Title>
        <hr />

        <Form>
          <Form.Group className="mb-3" controlId="tituloPosicion">
            <Form.Control type="text" placeholder="Título de la posición" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="descripcionPosicion">
            <Form.Control as="textarea" rows={6} placeholder="Descripción de la posición" />
          </Form.Group>
          
          <CargarHabilidad />
          
          <Button variant="primary" type="submit">
            Cargar posición
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CrearOferta;
