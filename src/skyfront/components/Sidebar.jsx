import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";

export const Sidebar = ({ drawerWidth = 240 }) => {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            textDecoration: "none",
            color: "primary.main",
          }}
          component={Link}
          to={"/"}
        >
          <Typography variant="h6" noWrap component="div">
            App Skycom
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {[
            { text: "Profesores", path: "/teachers" },
            { text: "Alumnos", path: "/students" },
            { text: "Materias", path: "/subjects" },
            { text: "Notas", path: "/grades" },
            { text: "Reportes", path: "/reports" },
          ].map(({ text, path }) => (
            <ListItem
              key={path}
              disablePadding
              component={Link}
              to={path}
              sx={{ color: "black" }}
            >
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
