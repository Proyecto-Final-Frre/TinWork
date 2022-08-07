import axios from "axios";

const todasProvincias = async () => {
  const peticion = await axios.get(
    "https://apis.datos.gob.ar/georef/api/provincias"
  );
  return peticion.data.provincias;
};

export { todasProvincias };
