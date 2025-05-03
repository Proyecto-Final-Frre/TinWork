import axios from "axios";

const todasProvincias = async () => {
  const peticion = await axios.get(
    "https://apis.datos.gob.ar/georef/api/provincias"
  );

  const provinciasOrdenadas = peticion.data.provincias.sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  );

  return provinciasOrdenadas;
};
export { todasProvincias };
