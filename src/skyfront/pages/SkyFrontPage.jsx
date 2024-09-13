import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { SkyFrontLayout } from "../layout/SkyFrontLayout";
import { CheckCircleOutline as CheckIcon } from "@mui/icons-material";

export const SkyFrontPage = () => {
  return (
    <SkyFrontLayout>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Gestión Escolar Simplificada
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Un sistema integral para la gestión de notas en colegios, diseñado
            para facilitar el trabajo de profesores y mejorar el seguimiento del
            rendimiento de los alumnos.
          </Typography>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }} maxWidth="md">
        <Typography variant="h4" gutterBottom component="h2">
          Características Principales
        </Typography>
        <Grid container spacing={4}>
          {[
            "Gestión de profesores y alumnos",
            "Administración de materias",
            "Registro de hasta tres notas por materia y alumno",
            "Generación de reportes de aprobados y reprobados",
          ].map((feature) => (
            <Grid item xs={12} sm={6} key={feature}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <CheckIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">{feature}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Technical Info Section */}
      <Box sx={{ bgcolor: "background.paper", py: 8 }}>
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom component="h2" align="center">
            Información Técnica
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Este sistema utiliza tecnologías modernas y robustas para garantizar
            un rendimiento óptimo:
          </Typography>
          <Typography variant="body1" paragraph align="center">
            • Backend: Python con Django, proporcionando una API RESTful segura
            y escalable.
          </Typography>
          <Typography variant="body1" paragraph align="center">
            • Frontend: React con JavaScript, ofreciendo una interfaz de usuario
            rápida y responsive.
          </Typography>
          <Typography variant="body1" paragraph align="center">
            La combinación de estas tecnologías permite una gestión eficiente de
            datos y una experiencia de usuario fluida, adaptada a las
            necesidades específicas de la gestión escolar.
          </Typography>
        </Container>
      </Box>
    </SkyFrontLayout>
  );
};
