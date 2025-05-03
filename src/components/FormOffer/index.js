import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOffer } from "../../services/OfferService";
import Abilities from "../Abilities";
import "./style.css";
import { findAll } from "../../services/AbilityService";
import { todasProvincias } from "../../services/ProvinceService";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";
import { MdOutlineFileUpload } from "react-icons/md";
import { MdWork } from "react-icons/md";
import { storage } from "../../config/firebase"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { GrLocation } from "react-icons/gr";
import maletinOffer from "../../logos/maletinOffer.gif"
const FormOffer = () => {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectableAbilities, setSelectableAbilities] = useState([]);
  const [requiredAbilities, setRequiredAbilities] = useState([]);
  const [desiredAbilities, setDesiredAbilities] = useState([]);
  const [workDay, setWorkDay] = useState("Jornada Completa");
  const [provincias, setProvincias] = useState([]);
  const [province, setProvince] = useState("Buenos Aires");
  const [buttonDisable, setButtonDisable] = useState(true);
  const [companyName,setCompanyName] =useState("")
  const [country, setCountry] = useState("Argentina")
  const [logoPreview, setLogoPreview] = useState(null)
  const [logo, setLogo] = useState(null)
  const [workModality, setWorkModality] = useState(null)
  const [loading, setLoading]=useState(false)

  const findAllProvinces = async () => {
    const prov = await todasProvincias();
    setProvincias(prov);
  };
  const dateOffer = new Date();

  useEffect(() => {
    findAllProvinces();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    abilitiesFunc();
  }, []);

  const abilitiesFunc = async () => {
    const result = await findAll();
    setSelectableAbilities(result);
  };

  const uploadLogo = async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `logos/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref); // Devuelve la URL de descarga
  };


  const store = async (e) => {
    e.preventDefault();
    setLoading(true);
    Swal.fire({
      title: 'Publicando oferta...',
      text: 'Estamos guardando los datos. Por favor, espere.',
      imageUrl: maletinOffer, // Ícono personalizado o animación de TinWork
      imageWidth: 100,
      imageHeight: 100,
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
      background: "#e3f2fd",
    });
    let requiredAbilitiesStr = requiredAbilities.map(
      (ability) => ability.title
    );
    let desiredAbilitiesStr = desiredAbilities.map((ability) => ability.title);
    let logoURL = null;
    if (logo) {
      logoURL = await uploadLogo(logo); 
    }
    const offer = {
      companyName,
      title,
      description,
      requiredAbilities: requiredAbilitiesStr,
      desiredAbilities: desiredAbilitiesStr,
      workDay,
      province,
      country,
      dateOffer,
      logoURL,
      workModality,
      uid: user.uid,
    };
    createOffer(offer).then(() => {
      mostrarAlerta();
      //navigate("/offers", { state: user.uid });
    });
  };

  const addRequiredAbilities = (abilities) => {
    setRequiredAbilities(abilities);
  };

  const addDesiredAbilities = (abilities) => {
    setDesiredAbilities(abilities);
  };

  const mostrarAlerta = () => {
    setLoading(false)
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Se ha registrado correctamente su oferta laboral",
      showConfirmButton: false,
      timer: 2500,
      background: "#e3f2fd",
    }).then(() => {
      navigate("/offers", { state: user.uid });
    });
  };

  


  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setLogo(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

 
  return (
    <div className="container-card">
    <div className="card-principal">
      <div className="card-body">
      <div className="title-container">
      <MdWork size={20} style={{ color: "#2E81FB" }} />
      <h2 style={{ color: "#2E81FB" }} >Nueva oferta laboral</h2>
    </div>

        <form onSubmit={store}>
        <div className="form-row">
              <div className="form-group">
                <label htmlFor="company-name">🏢 Nombre de la empresa</label>
                <input
                  type="text"
                  id="company-name"
                  placeholder="Ej: Mercado Libre"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="form-control bg-ligth"
                  required
                />
              </div>
        <div className="form-group">
                <label htmlFor="company-logo">Logo de la empresa</label>
                <div className="logo-upload-container">
                  {logoPreview ? (
                    <div className="logo-preview">
                      <img src={logoPreview || "/placeholder.svg"} alt="Company logo preview" />
                      <button
                        type="button"
                        onClick={() => {
                          setLogo(null)
                          setLogoPreview(null)
                        }}
                        className="logo-remove-btn"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="logo-upload">
                      <label htmlFor="logo-input" className="logo-upload-label">
                        <MdOutlineFileUpload  size={20}/>

                        <span>Subir logo</span>
                      </label>
                      <input
                        type="file"
                        id="logo-input"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="logo-input"
                      />
                    </div>
                  )}
                </div>
              </div> 
        </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="offer-title"> Título de la oferta laboral</label>
                <input
                  type="text"
                  id="offer-title"
                  placeholder="Ej: Desarrollador Frontend Senior"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-control bg-light"
                  required
                />
              </div>
              <div className="form-group">
                <label>Modalidad de trabajo</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="workModality"
                      value="Presencial"
                      checked={workModality === "Presencial"}
                      onChange={(e) => setWorkModality(e.target.value)}
                    />
                    <span className="radio-text">🏢 Presencial</span>
                  </label>

                  <label className="radio-label">
                    <input
                      type="radio"
                      name="workModality"
                      value="Híbrido"
                      checked={workModality === "Híbrido"}
                      onChange={(e) => setWorkModality(e.target.value)}
                    />
                    <span className="radio-text">🔀 Híbrido</span>
                  </label>

                  <label className="radio-label">
                    <input
                      type="radio"
                      name="workModality"
                      value="Remoto"
                      checked={workModality === "Remoto"}
                      onChange={(e) => setWorkModality(e.target.value)}
                    />
                    <span className="radio-text">🏠 Remoto</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="form-row three-columns">
              <div className="form-group">
                <label htmlFor="workday-type">⏰ Tipo de Jornada</label>
                <select
                  id="workday-type"
                  className="form-select bg-light"
                  value={workDay}
                  onChange={(e) => setWorkDay(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Seleccione tipo de jornada
                  </option>
                  <option value="Jornada Completa">Jornada Completa</option>
                  <option value="Jornada Media">Media Jornada</option>
                  <option value="Por Proyecto">Por Proyecto</option>
                  <option value="Pasantía">Pasantía</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Temporario">Temporario</option>
                  <option value="Práctica Profesional">Práctica Profesional</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="country">🌎 País</label>
                <select
                  id="country"
                  className="form-select bg-light"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                >
                  <option value="Argentina">Argentina</option>
                </select>
              </div>    

              <div className="form-group">
                 
                <label htmlFor="province"><GrLocation style={{ marginRight: '2px' }}  color={"red"} size={17} />Provincia</label>
                <select
                  id="province"
                  className="form-select bg-light"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Seleccione provincia
                  </option>
                  {provincias.map((provincia) => (
                    <option key={provincia.id} value={provincia.nombre}>
                      {provincia.nombre}
                    </option>
                  ))}
                </select>
              </div>      
            </div>
             
            <div className="form-group">
            <div className="section-title">
                <span className="section-icon">📝</span> Descripción de la oferta
              </div>
           
              <textarea
                id="description"
                rows={6}
                placeholder="Describe las responsabilidades y requisitos del puesto..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control bg-light"
                required
                onInput={(e) => {
                  e.target.value.length > 130 ? setButtonDisable(false) : setButtonDisable(true)
                }}
              />
              <div className="character-count">{description.length - 130}</div>
              <Abilities
              addAbilities={addRequiredAbilities}
              abilities={requiredAbilities}
              selectableAbilities={selectableAbilities}
              setSelectableAbilities={setSelectableAbilities}
              label={"🛠️ Habilidades Requeridas"}
              placeholder={requiredAbilities.length === 0 && "Cargar Habilidades Requeridas" }
              required={requiredAbilities.length === 0}
            />
            <Abilities
              addAbilities={addDesiredAbilities}
              abilities={desiredAbilities}
              selectableAbilities={selectableAbilities}
              setSelectableAbilities={setSelectableAbilities}
              label={"🛠️ Habilidades Deseadas"}
              placeholder={ desiredAbilities.length === 0 && "Cargar Habilidades Deseadas"}
            />
            
            <button type="submit" className="submit-button" disabled={ buttonDisable || !companyName || !workModality || !title || !logo || (requiredAbilities.length === 0) ||loading}>
            {loading ? "Cargando..." : "Cargar oferta"}
            </button>
            </div>
         

           
          </form>


      </div>
    </div>
    </div>
  );
};

export default FormOffer;
