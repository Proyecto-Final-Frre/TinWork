import axios from "axios";

const todasProvincias = async () => {
  const peticion = await axios.get(
    "https://apis.datos.gob.ar/georef/api/provincias"
  );

  const provinciasOrdenadas = peticion.data.provincias
  .filter((provincia) => provincia.nombre !== "Ciudad Autónoma de Buenos Aires")
   .map((provincia) => {
      if (provincia.nombre === "Tierra del Fuego, Antártida e Islas del Atlántico Sur") {
        return { ...provincia, nombre: "Tierra del Fuego" };
      }
      return provincia;
    })
  .sort((a, b) => a.nombre.localeCompare(b.nombre));

  return provinciasOrdenadas;
};
export { todasProvincias };
