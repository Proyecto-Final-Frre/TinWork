import axios from "axios";

const todasProvincias = async (state) => {
    const peticion =  await axios.get('https://apis.datos.gob.ar/georef/api/provincias')
    state(peticion.data.provincias)
    console.log(peticion.data.provincias)

}


export {
    todasProvincias
}