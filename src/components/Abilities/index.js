import "./style.css";
import { useState } from "react";
import {
  Chip,
  TextField,
  Autocomplete,
  Box,
  Typography
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import AddSkillModal from "../AddSkillModal/AddSkillModal"; // Asegurate de importar correctamente

const Abilities = ({
  abilities,
  addAbilities,
  selectableAbilities,
  setSelectableAbilities,
  label,
  placeholder,
  required = false,
  categories,
  onAddCategory,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [newSkillName, setNewSkillName] = useState("");

  const getFilteredOptions = () => {
    const inputTrimmed = inputValue.trim().toLowerCase();
    const exists = selectableAbilities.some(
      (opt) => opt.title.toLowerCase() === inputTrimmed
    );

    let filtered = [...selectableAbilities];

    if (inputTrimmed !== "" && !exists) {
      filtered.push({ title: inputValue, isNew: true });
    }

    return filtered;
  };

 const handleAddSkill = (newSkill) => {
  const updatedSelectables = [...selectableAbilities];

  const exists = updatedSelectables.some(
    (skill) => skill.title.toLowerCase() === newSkill.title.toLowerCase()
  );

  if (!exists) {
    updatedSelectables.push(newSkill);
    setSelectableAbilities(updatedSelectables);
  }

  // Evitar duplicados en abilities
  const updatedAbilities = [...abilities];
  if (!updatedAbilities.some((s) => s.title.toLowerCase() === newSkill.title.toLowerCase())) {
    addAbilities([...updatedAbilities, newSkill]);
  }

  setModalOpen(false);
  setNewSkillName("");
};

  return (
    <Box>
      <Autocomplete
      freeSolo
        multiple
        value={abilities}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        onChange={(_, newAbilities) => {
              const last = newAbilities[newAbilities.length - 1];
              if (last?.isNew) {
                setNewSkillName(last.title);
                setModalOpen(true);
              } else {
                addAbilities(newAbilities);
              }
  }}
        onInputChange={(e, value) => setInputValue(value)}
        options={getFilteredOptions()}
        getOptionLabel={(option) => option.title}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip key={option.title} label={option.title} {...getTagProps({ index })} />
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
        renderOption={(props, option) => {
          const { key, ...rest } = props;
          return (
            <Box component="li" key={key} {...rest}>
              {option.isNew ? (
                <Box display="flex" alignItems="center" gap={1} sx={{ color: "primary.main", fontWeight: 500 }}>
                  <AddIcon fontSize="small" />
                  <Typography>Crear "{option.title}"</Typography>
                </Box>
              ) : (
                <Typography>{option.title}</Typography>
              )}
            </Box>
          );
}}
      />

      {/* MODAL DE CREAR HABILIDAD */}
      <AddSkillModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setNewSkillName("");
        }}
        onAddSkill={handleAddSkill}
        categories={categories}
        onAddCategory={onAddCategory}
        initialSkillName={newSkillName}
      />
    </Box>
  );
};

export default Abilities;
