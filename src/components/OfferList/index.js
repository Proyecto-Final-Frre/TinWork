import { useEffect, useState } from "react";
import Offer from "../Offer";
import "./style.css";
import { findOfferByUserUid } from "../../services/OfferService";
import { useAuth } from "../../context/AuthContext";
import { todasProvincias } from "../../services/ProvinceService";
import { FaSistrix } from "react-icons/fa";
import SplashScreen from "../Splash/SplashScreen";

const OfferList = () => {
  const { user } = useAuth();

  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchWorkDay, setSearchWorkDay] = useState(""); 
  const [loading, setLoading] = useState(true)
  const [provincias, setProvincias] = useState([]);

  useEffect(() => {
    const unsubscribe = findOfferByUserUid(user ? user.uid : null, (data) => {
      setOffers(data);
      setFilteredOffers(data);
      setLoading(false)
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    const filtered = offers.filter((offer) => {
      const title = offer.title?.toLowerCase() || "";
      const province = offer.province?.toLowerCase() || "";
      const workDay = offer.workDay?.toLowerCase() || "";
  
      const matchesTitle = title.includes(searchTitle.toLowerCase());
      const matchesProvince =
        searchLocation === "seleccione" || province.includes(searchLocation.toLowerCase());
      const matchesWorkDay =
        searchWorkDay === "" || workDay === searchWorkDay.toLowerCase();
  
      return matchesTitle && matchesProvince && matchesWorkDay;
    });
  
    setFilteredOffers(filtered);
  }, [searchTitle, searchLocation, searchWorkDay, offers]);
  
  const findAllProvinces = async () => {
    const prov = await todasProvincias();
    setProvincias(prov);
  };
  const dateOffer = new Date();

  useEffect(() => {
    findAllProvinces();
  }, []);

  const clearFilters = () => {
    setSearchTitle('');
    setSearchLocation('seleccione');
    setSearchWorkDay('');
  };


  return (
    <div>
       {    
       offers.length === 0 ? null :
     <div className="filters-container">
  {/* <h2 className="filters-title">Filtrar Ofertas</h2> */}
  <div className="filters-grid">
    <div className="filter-item">
      <label htmlFor="title-filter" className="filter-label">Título del Puesto</label>
      <input
        id="title-filter"
        type="text"
        className="filter-input"
        placeholder="Ej: Desarrollador Frontend"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
      />
    {/* <FaSistrix className="search-icon" /> */}

    </div>
    
    <div className="filter-item">
      <label htmlFor="province-filter" className="filter-label">Provincia</label>
      <select
        id="province-filter"
        className="filter-select"
        value={searchLocation}
        onChange={(e) => setSearchLocation(e.target.value)}
      >
        <option value="seleccione">Todas las provincias</option>
        {provincias.map((provincia) => (
          <option key={provincia.id} value={provincia.nombre.toLowerCase()}>
            {provincia.nombre}
          </option>
        ))}
      </select>
    </div>

    <div className="filter-item">
      <label htmlFor="workday-filter" className="filter-label">Jornada</label>
      <select
        id="workday-filter"
        className="filter-select"
        value={searchWorkDay}
        onChange={(e) => setSearchWorkDay(e.target.value)}
      >
        <option value="">Todas las jornadas</option>
        <option value="jornada completa">Jornada Completa</option>
        <option value="media jornada">Media Jornada</option>
      </select>
    </div>
    <div className="filter-button">
      <button onClick={clearFilters} className="clear-button">Limpiar Filtros</button>
      </div>

  </div>
     </div> }
    <div className="offer-list-container">
   
      {loading  ? 
          <div style={{display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            width: '100vh',


             }}>

        <SplashScreen/>
        </div>
       :     
       offers.length == 0 ? 
       <p>Usted aún no creo ninguna oferta laboral.</p> :
      filteredOffers.length > 0 ? (
        filteredOffers.map((offer) => (
          <Offer
            key={offer.title}
            title={offer.title}
            description={offer.description}
            province={offer.province}
            workDay={offer.workDay}
            country={offer.country}
            dateOffer={offer.dateOffer}
            interestedUsers={offer.interestedUsers}
            offerObj={offer}
          />
        ))
      ) : (
        <p>No se encontraron resultados de su búsqueda.</p>
      ) }
    </div>
    </div>
   
  );
};

export default OfferList;
