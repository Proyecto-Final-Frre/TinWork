import { Button, Card, Form } from 'react-bootstrap';
import CargarHabilidad from './CargarHabilidad';
import React, {useState, useEffect} from 'react';
//import {Link} from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc, addDoc} from 'firebase/firestore';
import {db} from '../firebaseConfig/firebase.js';
import { useNavigate } from 'react-router-dom';




function CrearOferta() {
 // configuramos los hooks 
 const [tituloPosicion, setTituloPosicion] = useState('')
 const [descPosicion, setDescPosicion] = useState('')
 
 //para navegar entre paginas rutas
 const navigate =useNavigate ()

 //tomamos las ofertas de la db
 const ofertasCollection = collection(db, "ofertas")


 const store = async(e) => {
  e.preventDefault()
  await addDoc(ofertasCollection, {tituloPosicion:tituloPosicion, descripcionPosicion: descPosicion})
  //para redireccionar a la home se usa la siguiente linea de codigo
  navigate('/')
  //console.log(e.target[0])
}
 
  return (
    
    <Card>
      <Card.Body>
        <Card.Title>Nueva posición</Card.Title>
        <hr />

        <Form onSubmit={store}>
          <Form.Group className="mb-3" controlId="tituloPosicion">
            <Form.Control type="text" placeholder="Título de la posición" 
             value={tituloPosicion}
             onChange={ (e)=> setTituloPosicion(e.target.value)}
             className='form-control' />
          </Form.Group>
          <Form.Group className="mb-3" controlId="descripcionPosicion">
            <Form.Control as="textarea" rows={6} placeholder="Descripción de la posición" 
            value={descPosicion}
            onChange={ (e)=> setDescPosicion(e.target.value)}
            type="text"
            className='form-control' />
          </Form.Group>
          
          <CargarHabilidad />
          <div>Mostrar habilidades</div>
          <Button variant="primary" type="submit">
            Cargar posición
          </Button>

          
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CrearOferta;
