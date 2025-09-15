import { useEffect, useState } from "react";
import Offer from "../Offer";
import "./style.css";
import { findOfferByUserUid } from "../../services/OfferService";
import { useAuth } from "../../context/AuthContext";
import { todasProvincias } from "../../services/ProvinceService";
import SkeletonOfferScreen from "../SkeletonOffer/SkeletonOfferScreen"
import maletinOffer from "../../logos/maletinTransparent.gif"
import lupaOffer from "../../logos/lupaOffer.gif"
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const filteredInactive = offers.filter((offer) => {
      if (!offer.expirationDate) return false;

      // parseamos fecha de expiración
      const cleanedDate = offer.expirationDate.trim();
      const [year, month, day] = cleanedDate.split("-");
      const expDate = new Date(+year, +month - 1, +day);
      expDate.setHours(0, 0, 0, 0);

      // solo considerar inactivas
      const isInactive = expDate >= today;

      if (!isInactive) return false;

      // ahora aplicar filtros de búsqueda
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

    setFilteredOffers(filteredInactive);
  }, [searchTitle, searchLocation, searchWorkDay, offers]);

  const findAllProvinces = async () => {
    const prov = await todasProvincias();
    setProvincias(prov);
  };

  useEffect(() => {
    findAllProvinces();
  }, []);

  const clearFilters = () => {
    setSearchTitle('');
    setSearchLocation('seleccione');
    setSearchWorkDay('');
  };

  const NoOffersComponent = () => (
    <div style={{ textAlign: 'center', padding: '60px 20px', color: '#444' }}>
      <img
        src={maletinOffer}
        alt="Sin ofertas laborales"
        style={{ width: '180px', opacity: 0.7, marginBottom: '20px' }}
      />
      {offers.length === 0 ? ( 
        <>
         <h2 style={{ fontSize: '20px', fontWeight: 600 }}>
        Usted aún no creó ninguna oferta laboral
      </h2>
      <p style={{ marginTop: '10px', fontSize: '16px', color: '#666' }}>
        Comience a publicar ofertas para atraer candidatos interesados.
      </p>
        </>
       ) : (
        <>
         <h2 style={{ fontSize: '20px', fontWeight: 600 }}>
        Actualmente no tiene ofertas laborales activas
      </h2>
      <p style={{ marginTop: '10px', fontSize: '16px', color: '#666' }}>
        Puede crear nuevas ofertas o reactivar alguna de sus ofertas.
      </p>
        </>
      ) }
      
    </div>
  );

  const NoOffersFound = () => (
    <div style={{ textAlign: 'center', padding: '60px 20px', color: '#444' }}>
      <img
        src={lupaOffer}
        alt="Sin ofertas laborales"
        style={{ width: '180px', opacity: 0.7, marginBottom: '20px' }}
      />
      <h2 style={{ fontSize: '20px', fontWeight: 600 }}>
        No se encontraron resultados que coincidan con tu búsqueda.
      </h2>
      <p style={{ marginTop: '10px', fontSize: '16px', color: '#666' }}>
        Probá cambiando los criterios de búsqueda.
      </p>
    </div>
  );

  const today = new Date();

  // Verificar si hay al menos una oferta activa
  const hayOfertasActivas = offers.some(offer => {
    const expDate = new Date(offer.expirationDate);
    return expDate >= today; // activa si no venció
  });
s

  return (
    <div >

      {loading ? (

        <div className="skeleton-container">
          <SkeletonOfferScreen />
        </div>

      ) : (
        <div className="offers-container">
          <div className="page-title-section">

            <h1 className="page-title-centered">
              Listado de ofertas laborales activas
              <span className="offers-count-badge">
                {filteredOffers.length} ofertas
              </span>
            </h1>
            <div className="status-indicator active">
              Estas ofertas están disponibles para candidatos
            </div>
          </div>
          <div className="container-offers">

            <div className="filters-container-inactive">
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
                    <option value="Pasantía">Pasantía</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Temporario">Temporario</option>
                    <option value="Práctica Profesional">Práctica Profesional</option>
                  </select>
                </div>
                <div className="filter-button">
                  <button onClick={clearFilters} className="clear-button">Limpiar Filtros</button>
                </div>
              </div>
            </div>

            <div className={`${offers.length === 0 || !filteredOffers.length > 0 ? 'no-offers-center' : 'offer-list-container '}`}>
              {offers.length === 0 || !hayOfertasActivas ? (
                <NoOffersComponent />
              ) : filteredOffers.length > 0 ? (
                filteredOffers
                  // .filter((offer) => {
                  //   if (!offer.expirationDate) return true;

                  //   const today = new Date();
                  //   today.setHours(0, 0, 0, 0);

                  //   const cleanedDate = offer.expirationDate.trim(); // limpiamos espacios
                  //   const [year, month, day] = cleanedDate.split("-");
                  //   const expDate = new Date(+year, +month - 1, +day);
                  //   expDate.setHours(0, 0, 0, 0);

                  //   return expDate >= today;
                  // })
                  .map((offer) => (
                    <Offer
                      key={offer.id}
                      offerId={offer.id}  // <-- esta línea es la clave
                      companyName={offer.companyName}
                      title={offer.title}
                      description={offer.description}
                      province={offer.province}
                      workDay={offer.workDay}
                      country={offer.country}
                      dateOffer={offer.dateOffer}
                      interestedUsers={offer.interestedUsers}
                      offerObj={offer}
                      workModality={offer.workModality}
                      companyLogo={offer.logoURL}
                      expirationDate={offer.expirationDate}
                      requiredAbilities={offer.requiredAbilities}
                      desiredAbilities={offer.desiredAbilities}
                    />
                  ))
              ) : (
                // <p>No se encontraron resultados de su búsqueda.</p>
                <NoOffersFound />
              )}
            </div>
          </div>

        </div>

      )}
    </div>


  );
};

export default OfferList;
