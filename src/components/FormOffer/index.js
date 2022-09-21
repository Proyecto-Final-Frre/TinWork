import { Button, Card, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOffer } from "../../services/OfferService";
import Abilities from "../Abilities";
import "./style.css";
import { findAll } from "../../services/AbilityService";
import { todasProvincias } from "../../services/ProvinceService";
import Swal from "sweetalert2";
import { app, auth } from "../../config/firebase"
import { getUserAuthenticated } from "../../services/UserService";

const FormOffer = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectableAbilities, setSelectableAbilities] = useState([]);
  const [requiredAbilities, setRequiredAbilities] = useState([]);
  const [desiredAbilities, setDesiredAbilities] = useState([]);
  const [workDay, setWorkDay] = useState("");
  const [provincias, setProvincias] = useState([]);
  const [province, setProvince] = useState("");
  const [buttonDisable, setButtonDisable] = useState(true);
  const [country, setCountry] = useState("Argentina");


  //Obtener la user.uid del usuario autenticado
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const user = await getUserAuthenticated()
    console.log("User autenticado",user)
  }

  useEffect(() => {
    getUser()
    auth.onAuthStateChanged((usuarioFirebase) => {
      console.log("ya tienes sesión iniciada con:", usuarioFirebase);
      setUser(usuarioFirebase);
    });
  }, []);

  const findAllProvinces = async () => {
    const prov = await todasProvincias();
    console.log(prov);
    setProvincias(prov);
  };

  //Fecha creación de la oferta
  const dateOffer = new Date()

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

  const store = async (e) => {
    e.preventDefault();
    let requiredAbilitiesStr = requiredAbilities.map(
      (ability) => ability.title
    );
    let desiredAbilitiesStr = desiredAbilities.map((ability) => ability.title);

    const offer = {
      title,
      description,
      requiredAbilities: requiredAbilitiesStr,
      desiredAbilities: desiredAbilitiesStr,
      workDay,
      province,
      country,
      dateOffer,
      uid: user.uid
    };
    createOffer(offer).then(() => {
      mostrarAlerta();
      navigate("/offers", { state: user.uid })
    });
  };

  const addRequiredAbilities = (abilities) => {
    setRequiredAbilities(abilities);
  };

  const addDesiredAbilities = (abilities) => {
    setDesiredAbilities(abilities);
  };



  const mostrarAlerta = () => {
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Se ha registrado correctamente su oferta laboral",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  return (
    <div className="container-card">
      <div className="card-principal">
        <Card.Body>
          <Card.Title className="mb-4">Nueva posición</Card.Title>
          <Form onSubmit={(e) => store(e)}>
            <Form.Group className="mb-2" controlId="position-title">
              <Form.Control
                type="text"
                placeholder="Título de la posición"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
                required
              />
            </Form.Group>
            <div class="select-caja mb-2">
              <select
                className="form-select form-select-sm mb-2"
                aria-label=".form-select-sm example"
                onChange={(e) => setWorkDay(e.target.value)}
              >
                <option disabled selected>
                  Seleccione tipo de Jornada
                </option>
                <option>Jornada Completa</option>
                <option>Media Jornada</option>
              </select>
              <select
                className="select form-select form-select-sm mb-2"
                aria-label=".form-select-sm example"
              >
                <option selected disabled>
                  Argentina
                </option>
              </select>
              <select
                className="select form-select form-select-sm mb-2"
                aria-label=".form-select-sm example"
                onChange={(e) => setProvince(e.target.value)}
              >
                <option disabled selected>
                  Seleccione la provincia
                </option>
                {provincias.map((provincia) => (
                  <option key={provincia.id}> {provincia.nombre}</option>
                ))}
              </select>
            </div>
            <Form.Group className="mb-2" controlId="position-description">
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Descripción de la posición"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                className="col-md-12"
                required
                onInput={(e) => {
                  e.target.value.length > 130
                    ? setButtonDisable(false)
                    : setButtonDisable(true);
                }}
              />
              <label
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginRight: 5,
                }}
              >
                {description.length - 130}
              </label>
            </Form.Group>

            <Abilities
              addAbilities={addRequiredAbilities}
              abilities={requiredAbilities}
              selectableAbilities={selectableAbilities}
              setSelectableAbilities={setSelectableAbilities}
              label={"Habilidades Requeridas"}
              placeholder={"Cargar Habilidades Requeridas"}
              required={requiredAbilities.length === 0}
            />
            <Abilities
              addAbilities={addDesiredAbilities}
              abilities={desiredAbilities}
              selectableAbilities={selectableAbilities}
              setSelectableAbilities={setSelectableAbilities}
              label={"Habilidades Deseadas"}
              placeholder={"Cargar Habilidades Deseadas"}
            />
            <Button variant="primary" type="submit" disabled={buttonDisable}>
              Cargar posición
            </Button>
          </Form>
        </Card.Body>
      </div>
    </div>
  );
};

export default FormOffer;
