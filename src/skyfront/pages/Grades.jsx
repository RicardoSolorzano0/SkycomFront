import { useEffect, useState } from "react";
import { CrudLayout } from "../layout/CrudLayout";
import { SkyFrontLayout } from "../layout/SkyFrontLayout";
import { useNotaFunctions } from "../../hooks/useNotaFunctions";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import BasicSelect from "../components/BasicSelect";
import { useAlumnoFunctions } from "../../hooks/useAlumnoFunctions";
import { useMateriasFunctions } from "../../hooks/useMateriasFunctions";

export const Grades = () => {
  const { getNotas, createNota, updateNota, deleteNota } = useNotaFunctions();
  const { getAlumnos } = useAlumnoFunctions();
  const { getMaterias } = useMateriasFunctions();
  const [notas, setNotas] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [materia, setMateria] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const [alumno, setAlumno] = useState("");
  const [nota, setNota] = useState("");
  const [tipoEvaluacion, setEvaluacion] = useState("");
  const [open, setOpen] = useState(false);
  const [editando, setEditando] = useState(null);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const columns = [
    { field: "alumno_nombre", headerName: "Alumno" },
    { field: "materia_nombre", headerName: "Materia" },
    { field: "nota", headerName: "Nota" },
    { field: "tipo_evaluacion", headerName: "Evaluacion" },
  ];

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setAlumno("");
    setMateria("");
    setNota("");
    setEvaluacion("");
    setEditando(null);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!alumno) newErrors.alumno = "El alumno es requerido";
    if (!materia || materia === "")
      newErrors.materia = "La materia es requerida";
    if (!nota.trim()) newErrors.nota = "La nota es requerida";
    if (!tipoEvaluacion.trim())
      newErrors.tipoEvaluacion = "La evaluacion es requerida";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      if (editando !== null) {
        await updateNota({
          id: editando,
          alumno,
          materia,
          nota,
          tipo_evaluacion: tipoEvaluacion,
        });
        get();
        setSnackbar({
          open: true,
          message: "Nota actualizada con éxito",
          severity: "success",
        });
      } else {
        await createNota({
          alumno,
          materia,
          nota,
          tipo_evaluacion: tipoEvaluacion,
        });
        get();

        setSnackbar({
          open: true,
          message: "Nota agregada con éxito",
          severity: "success",
        });
      }
      handleClose();
    }
  };

  const handleEdit = (id) => {
    const nota = notas.find((prof) => prof.id === id);
    if (nota) {
      setAlumno(nota.alumno);
      setMateria(nota.materia);
      setNota(nota.nota);
      setEvaluacion(nota.tipo_evaluacion);
      setEditando(id);
      handleOpen();
    }
  };

  const handleDelete = async (id) => {
    await deleteNota(id);
    get();
    setSnackbar({
      open: true,
      message: "Nota eliminada con éxito",
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
    const data = await getNotas();
    setNotas(data);
  };

  const getStudents = async () => {
    const data = await getAlumnos();
    setAlumnos(data);
  };

  const getSubjects = async () => {
    const data = await getMaterias();
    setMaterias(data);
  };

  useEffect(() => {
    get();
    getStudents();
    getSubjects();
  }, []);

  return (
    <SkyFrontLayout>
      <CrudLayout
        textButton="Agregar Nota"
        handleOpen={handleOpen}
        data={notas}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        snackbar={snackbar}
        handleCloseSnackbar={handleCloseSnackbar}
      >
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {editando !== null ? "Editar" : "Agregar"} Nota
          </DialogTitle>
          <DialogContent>
            <BasicSelect
              label="Alumno"
              value={alumno}
              onChange={(e) => {
                setAlumno(e.target.value);
              }}
              menuItems={alumnos.map((prof) => ({
                value: prof.id,
                label: prof.nombre,
              }))}
              error={!!errors.alumno}
              helperText={errors.alumno}
            />
            <BasicSelect
              label="Materia"
              value={materia}
              onChange={(e) => {
                setMateria(e.target.value);
              }}
              menuItems={materias.map((prof) => ({
                value: prof.id,
                label: prof.nombre,
              }))}
              error={!!errors.materia}
              helperText={errors.materia}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Nota"
              type="number"
              fullWidth
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              error={!!errors.nota}
              helperText={errors.nota}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Evaluacion"
              type="text"
              fullWidth
              value={tipoEvaluacion}
              onChange={(e) => setEvaluacion(e.target.value)}
              error={!!errors.tipoEvaluacion}
              helperText={errors.tipoEvaluacion}
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
