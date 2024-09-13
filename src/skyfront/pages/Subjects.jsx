import { useEffect, useState } from "react";
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
import { useMateriasFunctions } from "../../hooks/useMateriasFunctions";
import BasicSelect from "../components/BasicSelect";
import { useProfesorFunctions } from "../../hooks/useProfesorFunctions";

export const Subjects = () => {
  const { getMaterias, updateMateria, deleteMateria, createMateria } =
    useMateriasFunctions();
  const { getProfesores } = useProfesorFunctions();
  const [materias, setMaterias] = useState([]);
  const [profesores, setProfesores] = useState([]);
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
    { field: "profesor_nombre", headerName: "Profesor" },
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
    if (!profesor) newErrors.profesor = "El profesor es requerido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      if (editando !== null) {
        await updateMateria({ id: editando, nombre, profesor });
        get();
        setSnackbar({
          open: true,
          message: "Materia actualizada con éxito",
          severity: "success",
        });
      } else {
        await createMateria({ nombre, profesor });
        get();

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

  const handleDelete = async (id) => {
    await deleteMateria(id);
    get();
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

  const get = async () => {
    const data = await getMaterias();
    setMaterias(data);
  };

  const getProfes = async () => {
    const data = await getProfesores();
    setProfesores(data);
  };

  useEffect(() => {
    get();
    getProfes();
  }, []);

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
              label="Nombre de materia"
              type="text"
              fullWidth
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              error={!!errors.nombre}
              helperText={errors.nombre}
            />
            <BasicSelect
              label="Profesor"
              value={profesor}
              onChange={(e) => {
                setProfesor(e.target.value);
              }}
              menuItems={profesores.map((prof) => ({
                value: prof.id,
                label: prof.nombre,
              }))}
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
