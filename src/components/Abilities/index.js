import "./style.css";

import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React from "react";

const Abilities = ({
  abilities,
  addAbilities,
  selectableAbilities,
  setSelectableAbilities,
  label,
  placeholder,
  required = false,
}) => {
  return (
    <Autocomplete
      multiple
      value={abilities}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      onChange={(event, newAbilities) => {
        addAbilities(newAbilities);
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
          required={required}
          label={label}
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default Abilities;
