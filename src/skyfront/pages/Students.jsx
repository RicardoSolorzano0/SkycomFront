import { useState } from "react";
import { CrudLayout } from "../layout/CrudLayout";
import { SkyFrontLayout } from "../layout/SkyFrontLayout";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export const Students = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [fechaN, setFechaN] = useState("");
  const [editando, setEditando] = useState(null);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const columns = [
    { field: "nombre", headerName: "Nombre" },
    { field: "apellido", headerName: "Apellido" },
    { field: "email", headerName: "Email" },
    {
      field: "fechaN",
      headerName: "Fecha Nacimiento",
      type: "date",
      format: "dd/MM/yyyy",
    },
  ];

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setNombre("");
    setApellido("");
    setEmail("");
    setFechaN("");
    setEditando(null);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!apellido.trim()) newErrors.apellido = "El apellido es requerido";
    if (!email.trim()) newErrors.email = "El email es requerido";
    if (!email.trim()) newErrors.email = "El email es requerido";
    if (!fechaN.trim()) newErrors.fechaN = "La fecha es requerida";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = (id) => {
    const estudiante = estudiantes.find((prof) => prof.id === id);
    if (estudiante) {
      setNombre(estudiante.nombre);
      setApellido(estudiante.apellido);
      setEmail(estudiante.email);
      setFechaN(estudiante.fechaN);
      setEditando(id);
      handleOpen();
    }
  };

  const handleDelete = (id) => {
    setEstudiantes(estudiantes.filter((prof) => prof.id !== id));
    setSnackbar({
      open: true,
      message: "Estudiante eliminado con éxito",
      severity: "success",
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (editando !== null) {
        setEstudiantes(
          estudiantes.map((prof) =>
            prof.id === editando
              ? { ...prof, nombre, apellido, email, fechaN }
              : prof
          )
        );
        setSnackbar({
          open: true,
          message: "Estudiante actualizado con éxito",
          severity: "success",
        });
      } else {
        setEstudiantes([
          ...estudiantes,
          {
            id: Date.now(),
            nombre,
            apellido,
            email,
            fechaN,
          },
        ]);
        setSnackbar({
          open: true,
          message: "Estudiante agregado con éxito",
          severity: "success",
        });
      }
      handleClose();
    }
  };

  return (
    <SkyFrontLayout>
      <CrudLayout
        textButton="Agregar Estudiante"
        handleOpen={handleOpen}
        data={estudiantes}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        snackbar={snackbar}
        handleCloseSnackbar={handleCloseSnackbar}
      >
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {editando !== null ? "Editar" : "Agregar"} Estudiante
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
              label="Apellido"
              type="text"
              fullWidth
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              error={!!errors.apellido}
              helperText={errors.apellido}
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="dense"
              placeholder="fechaN"
              type="date"
              fullWidth
              value={fechaN}
              onChange={(e) => setFechaN(e.target.value)}
              error={!!errors.fechaN}
              helperText={errors.fechaN}
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
