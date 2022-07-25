import "./style.css";

import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import React, { useEffect, useState } from "react";
import { findAll } from "../../services/AbilityService";

const Abilities = ({ abilities, addAbilities }) => {



  const [selectableAbilities, setSelectableAbilities] = useState([]);

  useEffect(() => {
    abilitiesFunc();
  }, []);

  const abilitiesFunc = async () => {
    const result = await findAll();
    setSelectableAbilities(result);
  }

  return (
    <Autocomplete
      multiple
      id="fixed-tags-demo"
      value={abilities}
      onChange={(event, newAbilities) => {
        let abilities = newAbilities.map(ability => {
          return { title: ability.title, category: ability.category }
        })
        addAbilities(abilities);

      }}
      options={selectableAbilities}
      getOptionLabel={(option) => option.title}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip label={option.title} {...getTagProps({ index })} />
        ))
      }
      
      className="autocomplete"
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


export default Abilities;
