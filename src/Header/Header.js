import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import logoTin from '../logos/logoTin.PNG'
import '../Header/Header.css'
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
function Header() {
  return (
    <div className='header'>
         
       
         <ul class="navigation">
            <Link to="/"> <Button>Home</Button></Link>
            <Link to="/crearOferta"> <Button>Crear oferta</Button></Link>
            <Link to="/verOferta"> <Button>Ver ofertas</Button></Link>  
            <Link to="/chats">     
            <IconButton> <ForumIcon className='header__icon' fontSize='large'/>  </IconButton>
          </Link>   
              
         </ul>
         
        
    </div>
    
  )
}

export default Header
