import React, { useState, useEffect } from 'react'
import { Button, Modal } from "react-bootstrap";
import { storage } from "../../config/firebase";
import { todasProvincias } from "../../services/ProvinceService";
import SelectAvatar from 'react-avatar-edit'
import "./style.css";
import { findUserByUid, updateProfile } from "../../services/UserService";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../../context/AuthContext";
import SplashScreen from '../Splash/SplashScreen';


function ProfileReclutier() {

  const { user,updateUserProfile } = useAuth();

  //Manejo de botones
  const [btndescri, setBtndescrip] = useState(false);
  const [btnubi, setBtnubi] = useState(false);

  //Description
  const [description, setDescription] = useState("");
  const [buttonDisable, setButtonDisable] = useState(true);

  //Photo
  const [photoUrl, setPhotoUrl] = useState(null);

  //Location
  const [provincias, setProvincias] = useState([]);
  const [location, setLocation] = useState("");

  //Modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setpview(null)
    setShow(false);
  }


  //Seleccion de sección de foto 
  const [pview, setpview] = useState(null)
  const [isLoading,setIsLoading]=useState(false)
  const [loadingProfile, setLoadingProfile] = useState(false);

  const onClose = () => {
    setpview(null)
  }

  //Seteo de sección de la foto en pview
  const onCrop = (view) => {
    setpview(view)
  }

  
  const saveCropImage = async () => {
    setShow(false);

    setLoadingProfile(true);
    const imageRef = ref(storage, "image");
  
    // Pasar la imagen seleccionada de base 64 a file
    let base64string = pview;
    const [type, data] = base64string.split(',');
    const mimeType = type.split(':')[1].split(';')[0];
    const text = atob(data);
    const buffer = new ArrayBuffer(text.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < text.length; i++) {
      view[i] = text.charCodeAt(i);
    }
    const file = new File([view], 'filename', { type: mimeType });
  
    try {
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      setPhotoUrl(url); 
  
      const dataProfile = {
        description,
        location,
        url,
      };
      await updateProfile(dataProfile, user.uid);
      await updateUserProfile({ photoUrl: url });
  
    } catch (error) {
    } finally {
      setLoadingProfile(false);
    }
  }
  


  const editProfile = () => {
    const dataProfile = {
      description,
      location,
      url:photoUrl,
    };
    console.log("🚀 ~ editProfile ~ dataProfile:", dataProfile)
    updateProfile(dataProfile, user.uid);
    setBtnubi(false);
    setBtndescrip(false);
  };

  
  const noeditubi = async () => {
    let userDat = await findUserByUid(user.uid);
    setLocation(userDat?.location || "");
    setBtnubi(false);
  };

  const noeditdesc = async () => {
    let userDat = await findUserByUid(user.uid);
    setDescription(userDat?.description || "");
    setBtndescrip(false);
  };

  const findAllProvinces = async () => {
    const prov = await todasProvincias();
    setProvincias(prov);
  }; 

  useEffect(() => {
    findAllProvinces();
  }, []);
  useEffect(() => {
    const getDatByUidUser = async () => {
      setIsLoading(true)
      let userDat = await findUserByUid(user.uid);
      setDescription(userDat?.description || "");
      setLocation(userDat?.location || "");
      setPhotoUrl(userDat?.imageProfile);
      setIsLoading(false); 
    };
    getDatByUidUser();
  }, []);

  const calculateCompletion = () => {
    let completed = 0;
    if (photoUrl) completed++;
    if (location) completed++;
    if (description) completed++;
    return Math.round((completed / 3) * 100);
  };
  return (
    <div className="container-card">
    {isLoading ? (
      <SplashScreen />
    ) : (
    <div className="card-principal">
        

        <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="completion-badge">Perfil {calculateCompletion()}% completo</div>
        </div>
        <div className="profile-content">
                <div className="avatar-container">    
                {loadingProfile ? (
          <div className="avatar-loading">
            <div className="spinner"></div> {/* Animación de carga */}
          </div>
        ) : (      
                    <img
                      src={photoUrl || "https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png"}
                      alt="Foto de perfil"
                      className="avatar"
                      onClick={() => setShow(true)}
                    />   )}

          
            <button className="edit-photo-button" onClick={() => setShow(true)}>
              Editar foto
            </button>
          </div>          
          <div className="profile-info">
            <h2 className="user-name">{user?.displayName || ""}</h2>
            <h2 className="user-email">{user?.email || ""}</h2>

          </div>
            
          {/* Sección de Ubicación */}
          <div className="profile-section">
            <div className="section-header">
              <div className="section-title">
                <span className="section-icon">📍</span> Ubicación
              </div>
              {!btnubi && (
                <button className="edit-button" onClick={() => setBtnubi(true)}>
                  Editar
                </button>
              )}
            </div>

            {!btnubi ? (
              <p className="section-content">
                {location || (
                  <span className="placeholder-text">
                    Agrega tu ubicación para que otros usuarios puedan encontrarte
                  </span>
                )}
              </p>
            ) : (
              <div className="edit-container">
                <select
                    className="select-province"
                    aria-label=".form-select-sm example"
                    onChange={(e) => setLocation(e.target.value + ",Argentina")}
                  >
                    <option disabled selected value="seleccione">
                      Seleccionar provincia
                    </option>
                    {provincias.map((provincia) => (
                      <option key={provincia.id}> {provincia.nombre}</option>
                    ))}
                  </select>
                <div className="button-group">
                  <button className="save-button" onClick={() => editProfile()}>
                    Guardar
                  </button>
                  <button className="cancel-button" onClick={() => noeditubi()}>
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Sección de Descripción */}
          <div className="profile-section">
            <div className="section-header">
              <div className="section-title">
                <span className="section-icon">📝</span> Descripción
              </div>
              {!btndescri && (
                <button className="edit-button" onClick={() => setBtndescrip(true)}>
                  Editar
                </button>
              )}
            </div>

            {!btndescri ? (
              <p className="section-content">
                {description || (
                  <span className="placeholder-text">
                    Cuéntanos sobre ti, tus intereses y experiencia. Una buena descripción ayuda a crear conexiones
                    profesionales.
                  </span>
                )}
              </p>
            ) : (
              <div className="edit-container">
                <textarea
                  className="edit-textarea"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value)
                    setButtonDisable(e.target.value.length <= 60)
                  }}
                  placeholder="Describe tu experiencia, habilidades e intereses profesionales (mínimo 60 caracteres)"
                  rows={4}
                />
                <div className="character-count">
                  {description.length >= 60
                    ? `+${description.length - 60}`
                    : `Faltan ${60 - description.length} caracteres`}
                </div>
                <div className="button-group">
                  <button className="save-button" onClick={() => editProfile()} disabled={buttonDisable}>
                    Guardar
                  </button>
                  <button className="cancel-button" onClick={() => noeditdesc()}>
                    Cancelar
                  </button>
                </div>
              </div>

              
            )}
          </div>
        </div>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            {/* <Modal.Title>Seleccione foto de perfil</Modal.Title> */}
          </Modal.Header>
          <Modal.Body>
          <div className="custom-avatar-uploader">

            <SelectAvatar
              width={300}
              height={300}
              onCrop={onCrop}
              onClose={onClose}
              style={{ display: "none" }} 
              label={"Seleccione su foto de perfil"}
              
            />
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={saveCropImage} disabled={!pview} >
              Subir
            </Button>
          </Modal.Footer>
        </Modal> 
      </div>

      {/* Modal para cambiar foto */}
   

          
    </div>
   
    
    </div>


    )}
       
  </div>
  )
}

export default ProfileReclutier
