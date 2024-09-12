import { useState } from "react";
import { SkyFrontLayout } from "../layout/SkyFrontLayout";
import { CrudLayout } from "../layout/CrudLayout";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export const Subjects = () => {
  const [materias, setMaterias] = useState([]);
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [profesor, setProfesor] = useState("");
  const [editando, setEditando] = useState(null);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const columns = [
    { field: "nombre", headerName: "Nombre" },
    { field: "profesor", headerName: "Profesor" },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNombre("");
    setProfesor("");
    setEditando(null);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!profesor.trim()) newErrors.profesor = "El profesor es requerido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (editando !== null) {
        setMaterias(
          materias.map((prof) =>
            prof.id === editando ? { ...prof, nombre, profesor } : prof
          )
        );
        setSnackbar({
          open: true,
          message: "Materia actualizada con éxito",
          severity: "success",
        });
      } else {
        setMaterias([
          ...materias,
          {
            id: Date.now(),
            nombre,
            profesor,
          },
        ]);
        setSnackbar({
          open: true,
          message: "Materia agregada con éxito",
          severity: "success",
        });
      }
      handleClose();
    }
  };

  const handleEdit = (id) => {
    const materia = materias.find((prof) => prof.id === id);
    if (materia) {
      setNombre(materia.nombre);
      setProfesor(materia.profesor);
      setEditando(id);
      handleOpen();
    }
  };

  const handleDelete = (id) => {
    setMaterias(materias.filter((prof) => prof.id !== id));
    setSnackbar({
      open: true,
      message: "Materia eliminada con éxito",
      severity: "success",
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <SkyFrontLayout>
      <CrudLayout
        textButton="Agregar Materia"
        handleOpen={handleOpen}
        data={materias}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        snackbar={snackbar}
        handleCloseSnackbar={handleCloseSnackbar}
      >
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {editando !== null ? "Editar" : "Agregar"} Materia
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nombre"
              type="text"
              fullWidth
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              error={!!errors.nombre}
              helperText={errors.nombre}
            />
            <TextField
              margin="dense"
              label="Profesor"
              type="text"
              fullWidth
              value={profesor}
              onChange={(e) => setProfesor(e.target.value)}
              error={!!errors.profesor}
              helperText={errors.profesor}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleSubmit}>
              {editando !== null ? "Actualizar" : "Agregar"}
            </Button>
          </DialogActions>
        </Dialog>
      </CrudLayout>
    </SkyFrontLayout>
  );
};
