import { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import "./style.css";
import { useAuth } from "../../context/AuthContext";
import { storage } from "../../config/firebase";
import Swal from "sweetalert2";
import { findUserByUid, updateProfile } from "../../services/UserService";
import { todasProvincias } from "../../services/ProvinceService";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ProfileReclutier = () => {
  const { user } = useAuth();

  //Manejo de botones
  const [btndescri, setBtndescrip] = useState(false);
  const [btnphoto, setBtnphoto] = useState(false);
  const [btnubi, setBtnubi] = useState(false);

  //Description
  const [description, setDescription] = useState("");
  const [buttonDisable, setButtonDisable] = useState(true);

  //Photo
  const [photo, setPhoto] = useState(null);
  const [url, setUrl] = useState(null);

  //Location
  const [provincias, setProvincias] = useState([]);
  const [location, setLocation] = useState("");

  const mostrarAlerta = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Se ha cambiado su foto de perfil",
      showConfirmButton: false,
      timer: 3000,
    });
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleClick = () => {
    const imageRef = ref(storage, "image");
    uploadBytes(imageRef, photo)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
            console.log("usrl", url);
            mostrarAlerta();
            setBtnphoto(false);
            const dataProfile = {
              description,
              location,
              url,
            };
            console.log("dataaaa profileee", dataProfile.url);
            updateProfile(dataProfile, user.uid);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setPhoto(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    const getDatByUidUser = async () => {
      let userDat = await findUserByUid(user.uid);
      setDescription(userDat?.description || "");
      setLocation(userDat?.location || "");
      setUrl(
        userDat?.imageProfile ||
          "https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png"
      );
    };
    getDatByUidUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editProfile = () => {
    const dataProfile = {
      description,
      location,
      url,
    };
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

  return (
    <div className="principal-profile">
      <div className="profile">
        <Card.Body>
          <div className="grid">
            <div className="grid-1">
              <div className="image-container">
                <img src={url} alt="logo" className="image" />
                <button
                  type="button"
                  class="boton"
                  onClick={() => setBtnphoto(true)}
                >
                  Editar foto
                </button>
                {btnphoto && (
                  <div>
                    <button onClick={() => setBtnphoto(false)}>
                      No editar
                    </button>
                    <button disabled={!photo} onClick={handleClick}>
                      Subir
                    </button>
                    <input type="file" onChange={handleChange} />
                  </div>
                )}
              </div>
            </div>
            <div className="grid-2">
              <label htmlFor="name">
                <font color="gray">Nombre/s y apellido/s</font>
              </label>
              <p className="card-text">{user?.displayName || ""}</p>
              <label htmlFor="name">
                <font color="gray">Correo</font>
              </label>
              <p className="card-text">{user?.email || ""}</p>
            </div>
          </div>

          <div className="pie-foto">
            <label htmlFor="name">
              <font color="gray">Ubicación</font>{" "}
            </label>
            <p className="card-text">{location || ""}</p>

            {btnubi && (
              <div className="input-group mb-3">
                <div>
                  <select
                    className="select-province"
                    aria-label=".form-select-sm example"
                    onChange={(e) => setLocation(e.target.value + ",Argentina")}
                  >
                    <option disabled selected value="seleccione">
                      Seleccione la provincia
                    </option>
                    {provincias.map((provincia) => (
                      <option key={provincia.id}> {provincia.nombre}</option>
                    ))}
                  </select>
                </div>
                <Button variant="primary" onClick={editProfile}>
                  {" "}
                  Editar{" "}
                </Button>
                <Button variant="secondary" onClick={noeditubi}>
                  {" "}
                  No editar{" "}
                </Button>
              </div>
            )}
            {!btnubi && (
              <button
                type="button"
                className="button"
                onClick={() => setBtnubi(true)}
              >
                Editar
              </button>
            )}
            <br></br>
            <br></br>
            <label htmlFor="name">
              <font color="gray">Descripción</font>
            </label>

            {!btndescri && (
              <div>
                <p className="card-text">{description || ""}</p>

                <button
                  type="button"
                  className="button"
                  onClick={() => setBtndescrip(true)}
                >
                  Editar
                </button>
              </div>
            )}
            {btndescri && (
              <div className="card-body">
                <div className="row justify-content-center">
                  <div className="col-md-5">
                    <div className="input-group mb-3">
                      <Form.Group
                        className="mb-2"
                        controlId="position-description"
                      >
                        <Form.Control
                          as="textarea"
                          rows={6}
                          placeholder="Descripción de la posición"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          type="text"
                          className="col-md-12"
                          onInput={(e) => {
                            e.target.value.length > 60
                              ? setButtonDisable(false)
                              : setButtonDisable(true);
                          }}
                          required
                        />
                        <label
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginRight: 5,
                          }}
                        ></label>
                        {description.length - 60}
                      </Form.Group>

                      <Button
                        variant="primary"
                        onClick={editProfile}
                        disabled={buttonDisable}
                      >
                        Editar
                      </Button>
                      <Button variant="secondary" onClick={noeditdesc}>
                        No editar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card.Body>
      </div>
    </div>
  );
};

export default ProfileReclutier;
