import { Button, Card, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOffer } from "../../services/OfferService";
import Abilities from "../Abilities";
import "./style.css";
import { findAll } from "../../services/AbilityService";
import Select from "react-select";
import { todasProvincias } from "../../services/ProvinceService";
import { getCurrentDate } from "../../services/Date";

const FormOffer = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectableAbilities, setSelectableAbilities] = useState([]);
  const [requiredAbilities, setRequiredAbilities] = useState([]);
  const [desiredAbilities, setDesiredAbilities] = useState([]);
  const [workDay, setWorkDay] = useState("");
  const [provincias, setProvincias] = useState([]);
  const [province, setProvince] = useState("")
  const [country,setCountry]=useState("Argentina")

  const findAllProvinces = async () => {
    const prov = await todasProvincias();
    console.log(prov);
    setProvincias(prov);
  };
  
  useEffect(() => {
    findAllProvinces();
  }, []);

  const navigate = useNavigate();

  //Tipo de jornadas laborales
  const worksDay = [
    { label: "Jornada Completa", value: "Jornada Completa" },
    { label: "Media Jornada", value: "Media Jornada" },
  ];



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
      country
    };
    await createOffer(offer);
    navigate("/offers");
  };

  const addRequiredAbilities = (abilities) => {
    setRequiredAbilities(abilities);
  };

  const addDesiredAbilities = (abilities) => {
    setDesiredAbilities(abilities);
  };

  //Agregar la jornada laboral
  const addWorkDay = ({ value }) => {
    setWorkDay(value);
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
              <div style={{ width: "50%" }}>
                <Select
                  placeholder="Seleccione el tipo de jornada laboral"
                  options={worksDay}
                  onChange={addWorkDay}
                  defaultValue={"Seleccione algo"}
                />
              </div>
              <select className="form-select form-select-sm mb-2"
                aria-label=".form-select-sm example"
                class="select"
                
                >
              
                <option selected disabled>Argentina</option>
                
              </select>
              <select
                className="form-select form-select-sm mb-2"
                aria-label=".form-select-sm example"
                class="select"
                onChange={(e) => setProvince(e.target.value)}

              >
                <option selected>Seleccione la provincia</option>
                {provincias.map((provincia) => (
                  <option key={provincia.id} > {provincia.nombre}</option>
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
              />

            </Form.Group>
            <Abilities
              addAbilities={addRequiredAbilities}
              abilities={requiredAbilities}
              selectableAbilities={selectableAbilities}
              setSelectableAbilities={setSelectableAbilities}
              label={"Habilidades Requeridas"}
              placeholder={"Cargar Habilidades Requeridas"}
            />
            <Abilities
              addAbilities={addDesiredAbilities}
              abilities={desiredAbilities}
              selectableAbilities={selectableAbilities}
              setSelectableAbilities={setSelectableAbilities}
              label={"Habilidades Deseadas"}
              placeholder={"Cargar Habilidades Deseadas"}
            />
            <Button variant="primary" type="submit">
              Cargar posición
            </Button>
          </Form>
        </Card.Body>
      </div>
    </div>
  );
};

export default FormOffer;
