import { SkyFrontLayout } from "../layout/SkyFrontLayout";
import {
  Button,
  Typography,
  Box,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useEffect, useMemo, useState } from "react";
import { useNotaFunctions } from "../../hooks/useNotaFunctions";
import { TableReport } from "../components/TableReport";
import { CSVLink } from "react-csv";

export const Reports = () => {
  const { getReportAPI } = useNotaFunctions();
  const [studentData, setStudentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
  const [subjectFilter, setSubjectFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [studentFilter, setStudentFilter] = useState("");

  const filteredData = useMemo(() => {
    return studentData.filter(
      (student) =>
        (subjectFilter === "" || student.materia === subjectFilter) &&
        (statusFilter === "" || student.estado === statusFilter) &&
        (studentFilter === "" ||
          student.alumno.toLowerCase().includes(studentFilter.toLowerCase()))
    );
  }, [subjectFilter, statusFilter, studentFilter, studentData]);

  const subjects = [...new Set(studentData.map((student) => student.materia))];
  const statuses = [...new Set(studentData.map((student) => student.estado))];
  const students = [...new Set(studentData.map((student) => student.alumno))];

  const downloadPDF = () => {
    // Función para descargar PDF
  };

  const get = async () => {
    setIsLoading(true);
    const data = await getReportAPI();
    setStudentData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <SkyFrontLayout>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            color="primary"
          >
            Reporte de estudiantes aprobados y reprobados
          </Typography>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          ) : studentData.length === 0 ? (
            <Typography align="center">No hay datos disponibles</Typography>
          ) : (
            <>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Materia</InputLabel>
                    <Select
                      value={subjectFilter}
                      label="Subject"
                      onChange={(e) => setSubjectFilter(e.target.value)}
                    >
                      <MenuItem value="">
                        <em>Todas</em>
                      </MenuItem>
                      {subjects.map((subject) => (
                        <MenuItem key={subject} value={subject}>
                          {subject}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Estado</InputLabel>
                    <Select
                      value={statusFilter}
                      label="Status"
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <MenuItem value="">
                        <em>Todos</em>
                      </MenuItem>
                      {statuses.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Estudiante</InputLabel>
                    <Select
                      value={studentFilter}
                      label="Student"
                      onChange={(e) => setStudentFilter(e.target.value)}
                    >
                      <MenuItem value="">
                        <em>Todos</em>
                      </MenuItem>
                      {students.map((student) => (
                        <MenuItem key={student} value={student}>
                          {student}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    <CSVLink
                      data={filteredData}
                      filename="reporte.csv"
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="contained"
                        startIcon={<FileDownloadIcon />}
                      >
                        CSV
                      </Button>
                    </CSVLink>

                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={downloadPDF}
                      startIcon={<PictureAsPdfIcon />}
                    >
                      PDF
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              {filteredData.length === 0 ? (
                <Typography align="center">No hay datos disponibles</Typography>
              ) : (
                <TableReport filteredData={filteredData} />
              )}
            </>
          )}
        </Box>
      </Container>
    </SkyFrontLayout>
  );
};
