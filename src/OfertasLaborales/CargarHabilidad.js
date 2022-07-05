import { Button, InputGroup, Form } from 'react-bootstrap';

function CargarHabilidad() {
  return (
    <InputGroup className="mb-3">
        <Form.Control
          placeholder="Habilidad requerida"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        
        <Button variant="outline-secondary" id="button-addon2">
          Agregar habilidad
        </Button>
      </InputGroup>
  );
}

export default CargarHabilidad;
