import "./style.css";

import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useEffect, useState } from "react";
import { findAll } from "../../services/AbilityService";

const Abilities = ({ abilities, addAbilities }) => {
  const [selectableAbilities, setSelectableAbilities] = useState([]);

  useEffect(() => {
    abilitiesFunc();
  }, [selectableAbilities]);

  const abilitiesFunc = async () => {
    const result = await findAll();
    setSelectableAbilities(result);
  }

  return (
    <Autocomplete
      multiple
      id="fixed-tags-demo"
      value={abilities}
      onChange={(event, newAbility) => {
        addAbilities(newAbility);
      }}
      options={selectableAbilities}
      getOptionLabel={(option) => option.title}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip label={option.title} {...getTagProps({ index })} />
        ))
      }
      style={{ width: 500, marginBottom: 10 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Habilidades"
          placeholder="Cargar habilidades"
        />
      )}
    />
  );
};

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "Angular" },
  { title: "PHP" },
  { title: "React.js" },
  { title: "Mongo DB" },
  { title: "Proactivo" },
  { title: "Node.js" },
  { title: "Pulp Fiction" },
];

export default Abilities;
