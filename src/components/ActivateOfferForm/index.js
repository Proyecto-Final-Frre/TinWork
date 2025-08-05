import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { updateOffer,findByOfferUid, createOffer } from "../../services/OfferService"
import Abilities from "../Abilities"
import "./style.css"
import { findAll, findAllCategories } from "../../services/AbilityService"
import { todasProvincias } from "../../services/ProvinceService"
import Swal from "sweetalert2"
import { useAuth } from "../../context/AuthContext"
import { MdOutlineFileUpload } from "react-icons/md"
import { MdWork } from "react-icons/md"
import { storage } from "../../config/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { GrLocation } from "react-icons/gr"
import maletinOffer from "../../logos/maletinOffer.gif"
import SplashScreen from "../Splash/SplashScreen"
import {findUserByUid, pushNotificationUnskilledCandidate, updateUser } from "../../services/UserService";

const ActivateOfferForm = () => { 
  
  const { user } = useAuth()
  const { offerId } = useParams() // Assuming you pass the offer ID in the URL
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [categories, setCategories] = useState([])
  const [selectableAbilities, setSelectableAbilities] = useState([])
  const [requiredAbilities, setRequiredAbilities] = useState([])
  const [desiredAbilities, setDesiredAbilities] = useState([])
  const [workDay, setWorkDay] = useState("Jornada Completa")
  const [provincias, setProvincias] = useState([])
  const [province, setProvince] = useState("Buenos Aires")
  const [buttonDisable, setButtonDisable] = useState(false)
  const [companyName, setCompanyName] = useState("")
  const [country, setCountry] = useState("Argentina")
  const [logoPreview, setLogoPreview] = useState(null)
  const [logo, setLogo] = useState(null)
  const [currentLogoURL, setCurrentLogoURL] = useState(null)
  const [workModality, setWorkModality] = useState(null)
  const [loading, setLoading] = useState(false)
  const [expirationDate, setExpirationDate] = useState("")
  const [initialLoading, setInitialLoading] = useState(true)
  const [offerResg,setOfferResg] = useState([])
  const navigate = useNavigate()
    const dateOffer = new Date();



  // Load existing offer data
  useEffect(() => {
    const loadOfferData = async () => {
      try {
        const offerData = await findByOfferUid(offerId)
        setOfferResg(offerData)
        if (offerData) {
          setTitle(offerData.title || "")
          setDescription(offerData.description || "")
          setCompanyName(offerData.companyName || "")
          setWorkDay(offerData.workDay || "Jornada Completa")
          setProvince(offerData.province || "Buenos Aires")
          setCountry(offerData.country || "Argentina")
          setWorkModality(offerData.workModality || null)
          setExpirationDate(offerData.expirationDate || "")
          setCurrentLogoURL(offerData.logoURL || null)
          setLogoPreview(offerData.logoURL || null)

          // Convert abilities arrays back to objects if needed
          const reqAbilities =
            offerData.requiredAbilities?.map((ability) =>
              typeof ability === "string" ? { title: ability } : ability,
            ) || []
          const desAbilities =
            offerData.desiredAbilities?.map((ability) =>
              typeof ability === "string" ? { title: ability } : ability,
            ) || []

        setRequiredAbilities(reqAbilities)
          setDesiredAbilities(desAbilities)
        }
        setInitialLoading(false)
      } catch (error) {
        console.error("Error loading offer data:", error)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar la información de la oferta",
          background: "#e3f2fd",
        })
        setInitialLoading(false)
      }
    }

    if (offerId) {
      loadOfferData()
    }
  }, [offerId])

  const findAllProvinces = async () => {
    const prov = await todasProvincias()
    setProvincias(prov)
  }

  useEffect(() => {
    findAllProvinces()
  }, [])

  useEffect(() => {
    abilitiesFunc()
  }, [])

  const abilitiesFunc = async () => {
    const result = await findAll()
    setSelectableAbilities(result)
  }

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await findAllCategories()
        setCategories(fetchedCategories)
      } catch (err) {
        console.error("Error al cargar categorías:", err)
      }
    }

    loadCategories()
  }, [])

  const handleAddCategory = (newCategoryName) => {
    const exists = categories.some((cat) => cat.name.toLowerCase() === newCategoryName.toLowerCase())
    if (!exists) {
      const newCategory = { name: newCategoryName }
      setCategories((prev) => [...prev, newCategory])
    }
  }
 
  
  const uploadLogo = async (file) => {
    if (!file) return null
    const storageRef = ref(storage, `logos/${file.name}`)
    const snapshot = await uploadBytes(storageRef, file)
    return await getDownloadURL(snapshot.ref)
  }


  const updateExistingOffer = async () => {
  try {
    Swal.fire({ title: "Activando oferta...", allowOutsideClick: false, showConfirmButton: false });
    let logoURL = currentLogoURL // Keep current logo by default
    if (logo) {
      logoURL = await uploadLogo(logo) // Upload new logo if selected
    }
    const updatedOffer = {
      id: offerId,
      companyName,
      title,
      description,
      requiredAbilities: requiredAbilities.map((a) => a.title),
      desiredAbilities: desiredAbilities.map((a) => a.title),
      workDay,
      province,
      country,
      workModality,
      expirationDate,
      uid: user.uid,
      logoURL
    };

    await updateOffer(updatedOffer);
    mostrarAlerta("Se ha actualizado correctamente su oferta laboral");
  } catch (error) {
    console.error("Error actualizando oferta:", error);
    setLoading(false);
  }
};

  const createNewOffer = async () => {
  try {
    Swal.fire({ title: "Creando nueva oferta...", allowOutsideClick: false, showConfirmButton: false });
    
     let requiredAbilitiesStr = requiredAbilities.map(
      (ability) => ability.title
    );
    let desiredAbilitiesStr = desiredAbilities.map((ability) => ability.title);
    let logoURL = currentLogoURL // Keep current logo by default
    if (logo) {
      logoURL = await uploadLogo(logo) // Upload new logo if selected
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
      expirationDate,
      uid: user.uid,
    };
    await createOffer(offer); // 🔹 tu servicio de creación
    mostrarAlerta("Se ha creado una nueva oferta laboral");
  } catch (error) {
    console.error("Error creando oferta:", error);
    setLoading(false);
  }
};

  const activateOfferData = async (e) => {
    e.preventDefault()
    setLoading(true)

     const hasInterestedUsers = offerResg?.interestedUsers?.length > 0;
     console.log("🚀 ~ activateOfferData ~ hasInterestedUsers:", hasInterestedUsers)
  const sensitiveChanged = handleSensitiveChange();
  console.log("🚀 ~ activateOfferData ~ sensitiveChanged:", sensitiveChanged)

  // ✅ Si tiene interesados y cambió información sensible → advertir y crear nueva oferta
  if (hasInterestedUsers && sensitiveChanged) {
    Swal.fire({
      title: "Cambiaste información sensible",
      text: "Esta oferta laboral tiene candidatos interesados. Si confirmás, se publicará como una NUEVA oferta y los candidatos actuales ya no estarán asociados a ella.",
      icon: "warning",
      showCancelButton: true,
      background: "#e3f2fd", 
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, activar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await createNewOffer(); // 🔹 función separada para crear nueva oferta
      } else {
        setLoading(false);
      }
    });
    return;
  }

  // ✅ Si no hay interesados o no cambió info sensible → actualizar normal
  await updateExistingOffer();
  }

  const addRequiredAbilities = (abilities) => {
    setRequiredAbilities(abilities)
  }

  const addDesiredAbilities = (abilities) => {
    setDesiredAbilities(abilities)
  }

  const mostrarAlerta = () => {
    setLoading(false)
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Se ha actualizado correctamente su oferta laboral",
      showConfirmButton: false,
      timer: 2500,
      background: "#e3f2fd",
    }).then(() => {
      navigate("/offers", { state: user.uid })
    })
  }

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

  if (initialLoading) {
    return (
      <div className="container-card">
                     <SplashScreen />
      </div>
    )
  }

  const handleSensitiveChange = () => {
  if (!offerResg) return false;
  
  // Comparar valores originales con los actuales
  return (
    offerResg.workModality !== workModality ||
    offerResg.workDay !== workDay ||
    offerResg.province !== province
  );
};

  return (
    <div className="container-card">
      <div className="card-principal">
        <div className="card-body">
          <div className="title-container">
            <MdWork size={20} style={{ color: "#2E81FB" }} />
            <h2 style={{ color: "#2E81FB" }}>Activar oferta laboral</h2>
          </div>
          <form onSubmit={activateOfferData}>
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
                <label htmlFor="expiration-date">🗓️ Fecha de caducidad</label>
                <input
                  type="date"
                  id="expiration-date"
                  className="form-control bg-light"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
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
                          setLogoPreview(false) // Reset to original logo
                        }}
                        className="logo-remove-btn"
                      >
                        ↻
                      </button>
                    </div>
                  ) : (
                    <div className="logo-upload">
                      <label htmlFor="logo-input" className="logo-upload-label">
                        <MdOutlineFileUpload size={20} />
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
                <label htmlFor="offer-title">💼 Título de la oferta laboral</label>
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
                  className="form-select bg-light no-arrow"
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
                  className="form-select bg-light no-arrow"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  disabled
                >
                  <option value="Argentina">Argentina</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="province">
                  <GrLocation style={{ marginRight: "2px" }} color={"red"} size={17} />
                  Provincia
                </label>
                <select
                  id="province"
                  className="form-select bg-light no-arrow"
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
                selectableAbilities={selectableAbilities.filter(
                  (ability) => !desiredAbilities.some((req) => req.title.toLowerCase() === ability.title.toLowerCase()),
                )}
                setSelectableAbilities={setSelectableAbilities}
                label={"🛠️ Habilidades Requeridas"}
                placeholder={requiredAbilities.length === 0 && "Cargar Habilidades Requeridas"}
                required={requiredAbilities.length === 0}
                excludedAbilities={desiredAbilities}
                categories={categories}
                onAddCategory={handleAddCategory}
              />

              <Abilities
                addAbilities={addDesiredAbilities}
                abilities={desiredAbilities}
                selectableAbilities={selectableAbilities.filter(
                  (ability) =>
                    !requiredAbilities.some((req) => req.title.toLowerCase() === ability.title.toLowerCase()),
                )}
                setSelectableAbilities={setSelectableAbilities}
                label={"🛠️ Habilidades Deseadas"}
                placeholder={desiredAbilities.length === 0 && "Cargar Habilidades Deseadas"}
                excludedAbilities={requiredAbilities}
                categories={categories}
                onAddCategory={handleAddCategory}
              />

              <button
                type="submit"
                className="submit-button"
                disabled={
                  buttonDisable ||
                  !companyName ||
                  !expirationDate ||
                  !workModality ||
                  !title ||
                  requiredAbilities.length === 0 ||
                  loading
                }
              >
                {loading ? "Activando..." : "Activar oferta"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ActivateOfferForm
