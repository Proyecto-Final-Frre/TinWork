import "./style.css";
import { useState } from "react";
import {
  Chip,
  TextField,
  Autocomplete,
  Box,
  Typography,
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
  excludedAbilities = [],
  excludedLabel = "otra sección", // Label para mostrar en la alerta

}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [newSkillName, setNewSkillName] = useState("");
  
 const getFilteredOptions = () => {
    const inputTrimmed = inputValue.trim().toLowerCase();
    
    // Filtrar opciones que ya están seleccionadas en el componente actual
    const availableOptions = selectableAbilities.filter(
      (option) => !abilities.some((selected) => 
        selected.title.toLowerCase() === option.title.toLowerCase()
      )
    );
    
    const exists = availableOptions.some(
      (opt) => opt.title.toLowerCase() === inputTrimmed
    );

    let filtered = [...availableOptions];

    // Solo agregar la opción "nueva" si no existe y hay texto
    if (inputTrimmed !== "" && !exists) {
      // Verificar que no esté ya seleccionada en este componente
      const alreadySelectedHere = abilities.some(
        (selected) => selected.title.toLowerCase() === inputTrimmed
      );
      
      // Verificar que no esté en las habilidades excluidas (ej: requeridas cuando estamos en deseadas)
      const isExcluded = excludedAbilities.some(
        (excluded) => excluded.title.toLowerCase() === inputTrimmed
      );
      
      if (!alreadySelectedHere && !isExcluded) {
        filtered.push({ title: inputValue, isNew: true });
      }
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
  setInputValue(""); // Limpiar el input

};

const handleAddCategory = (newCategory) => {
    // Asegurar que la nueva categoría se propague correctamente
    if (onAddCategory) {
      onAddCategory(newCategory);
    }
  };


  return (
    <Box>
      <Autocomplete
      freeSolo
        multiple
        value={abilities}
isOptionEqualToValue={(option, value) =>
  option?.title?.toLowerCase?.() === value?.title?.toLowerCase?.()
}      onChange={(_, newAbilities) => {
  const last = newAbilities[newAbilities.length - 1];
    if (newAbilities.length < abilities.length) {
    addAbilities(newAbilities);
    return;
  }
  // Solo permitir objetos con propiedad 'title'
  if (!last || typeof last === "string" || !last.title) return;

  const isExcluded = excludedAbilities.some(
    (excluded) =>
      excluded?.title?.toLowerCase?.() === last.title.toLowerCase()
  );

  if (isExcluded) return; // No dejar que se agregue si está en las excluidas

  if (last?.isNew) {
    setNewSkillName(last.title);
    setModalOpen(true);
  } else {
    const uniqueAbilities = newAbilities.filter(
      (ability, index, self) =>
        index ===
        self.findIndex(
          (a) =>
            a?.title?.toLowerCase?.() === ability.title.toLowerCase()
        )
    );
    addAbilities(uniqueAbilities);
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
        onAddCategory={handleAddCategory}
        initialSkillName={newSkillName}
      />
    </Box>
  );
};

export default Abilities;
