import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Autocomplete,
  Box,
  Typography,
  Chip,
  CircularProgress
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { findAllCategories, addSkill, addCategory } from "../../services/AbilityService"
import Swal from "sweetalert2";

const AddSkillModal = ({
  open,
  onAddSkill,
  onClose,
  onAddCategory,
  initialSkillName = "",
}) => {
  const [skillName, setSkillName] = useState(initialSkillName);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSkillName(initialSkillName);
  }, [initialSkillName]);


  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await findAllCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        console.error("Error al cargar categorías:", err);
      }
    };

    loadCategories();
  }, [categories]);

  const handleSubmit = async () => {
    if (!skillName.trim()) return;
    setLoading(true);

    try {

      if (newCategoryName.trim()) {
        await addCategory(newCategoryName.trim());
        onAddCategory(newCategoryName.trim())
        const nuevaCategoria = { name: newCategoryName.trim() };

        setCategories((prev) => [...prev, nuevaCategoria]);

      }


      const newSkill = {
        title: skillName.trim(),
        category: selectedCategory.name || newCategoryName.trim(),
      };

      await addSkill(newSkill);
      onAddSkill({ ...newSkill, isNew: false }); // Aseguramos el formato esperado
      handleClose();
    } catch (error) {
      console.error("Error en handleSubmit:", error);
      onClose()
      Swal.fire({
        title: "Error al agregar nueva habilidad",
        text: "Ocurrió un problema. Intenta nuevamente.",
        icon: "error",
        background: "#fce4ec",
        confirmButtonColor: "#d32f2f",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    setSkillName("");
    setSelectedCategory(null);
    setNewCategoryName("");
    onClose();
  };

  const getFilteredOptions = () => {
    const inputTrimmed = inputValue.trim().toLowerCase();
    const exists = categories.some(
      (opt) => {
        return opt.name.toLowerCase() === inputTrimmed
      }
    );

    let filtered = [...categories];


    if (inputTrimmed !== "" && !exists) {
      filtered.push({ name: inputValue, isNew: true });
    }

    return filtered;
  };


  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth >
      <Box
        sx={{
          background: "linear-gradient(to bottom, rgba(245, 250, 255, 0.9), rgba(225, 240, 255, 0.9))",
        }}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <AddIcon />
            Agregar Nueva Habilidad
          </Box>
        </DialogTitle>

        <DialogContent >
          <Box display="flex" flexDirection="column" gap={3} pt={1}>
            <TextField
              label="Nombre de la habilidad"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              fullWidth
              placeholder="Ej: React, Python, Gestión de proyectos..."
              required
              autoFocus
            />

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Categoría
              </Typography>


              <Box display="flex" flexDirection="column" gap={2}>
                <Autocomplete
                  value={selectedCategory}
                  onChange={(_, newCategory) => {

                    setSelectedCategory(newCategory);
                    if (newCategory?.isNew) {
                      setNewCategoryName(newCategory.name);
                    } else {
                      setNewCategoryName("");
                    }

                  }

                  }
                  options={getFilteredOptions()}
                  onInputChange={(e, value) => setInputValue(value)}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) => {
                    if (option?.id && value?.id) return option.id === value.id;
                    return option.name === value.name;
                  }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Selecciona una categoría" required />
                  )}
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                      <Chip key={option.id || option.name} label={option.name} {...getTagProps({ index })} />
                    ))
                  }
                  renderOption={(props, option) => {
                    const { key, ...rest } = props;
                    return (
                      <Box component="li" key={key} {...rest}>                  
                        {option.isNew ? (
                          <Box display="flex" alignItems="center" gap={1} sx={{ color: "primary.main", fontWeight: 500 }}>
                            <AddIcon fontSize="small" />
                            <Typography>Crear {option.name}</Typography>
                          </Box>
                        ) : (
                          <Typography>{option.name}</Typography>
                        )}
                      </Box>
                    );
                  }}
                />


              </Box>


            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={
              loading || !skillName.trim() || (!selectedCategory && !newCategoryName.trim())
            }
            sx={{
              minWidth: 180,
              minHeight: 40, // fija la altura mínima
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "6px 16px",
            }}
          >
            <Box
              sx={{
                visibility: loading ? "visible" : "hidden",
                position: "absolute",
              }}
            >
              <CircularProgress size={24} color="inherit" />
            </Box>

            <Box
              component="span"
              sx={{
                opacity: loading ? 0 : 1, // hace invisible el texto pero mantiene espacio
                transition: "opacity 0.2s",
              }}
            >
              Agregar Habilidad
            </Box>
          </Button>
        </DialogActions>
      </Box>

    </Dialog>
  );
};

export default AddSkillModal;
