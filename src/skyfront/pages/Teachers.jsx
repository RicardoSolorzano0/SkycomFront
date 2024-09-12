import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { SkyFrontLayout } from "../layout/SkyFrontLayout";
import { useEffect, useState } from "react";
import { CrudLayout } from "../layout/CrudLayout";
import { useProfesorFunctions } from "../../hooks/useProfesorFunctions";

export const Teachers = () => {
  const { getProfesores, updateProfesor, deleteProfesor, createProfesor } =
    useProfesorFunctions();
  const [profesores, setProfesores] = useState([]);
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
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
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNombre("");
    setApellido("");
    setEmail("");
    setEditando(null);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!apellido.trim()) newErrors.apellido = "El apellido es requerido";
    if (!email.trim()) newErrors.email = "El email es requerido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      if (editando !== null) {
        await updateProfesor({ id: editando, nombre, apellido, email });
        get();
        setSnackbar({
          open: true,
          message: "Profesor actualizado con éxito",
          severity: "success",
        });
      } else {
        await createProfesor({ nombre, apellido, email });
        get();
        setSnackbar({
          open: true,
          message: "Profesor agregado con éxito",
          severity: "success",
        });
      }
      handleClose();
    }
  };

  const handleEdit = (id) => {
    const profesor = profesores.find((prof) => prof.id === id);
    if (profesor) {
      setNombre(profesor.nombre);
      setApellido(profesor.apellido);
      setEmail(profesor.email);
      setEditando(id);
      handleOpen();
    }
  };

  const handleDelete = async (id) => {
    await deleteProfesor(id);
    get();
    setSnackbar({
      open: true,
      message: "Profesor eliminado con éxito",
      severity: "success",
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const get = async () => {
    const data = await getProfesores();
    setProfesores(data);
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <SkyFrontLayout>
      <CrudLayout
        textButton="Agregar Profesor"
        handleOpen={handleOpen}
        data={profesores}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        snackbar={snackbar}
        handleCloseSnackbar={handleCloseSnackbar}
      >
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {editando !== null ? "Editar" : "Agregar"} Profesor
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
