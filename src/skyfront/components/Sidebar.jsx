import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
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
          ].map(({ text, path }, index) => (
            <ListItem
              key={path}
              disablePadding
              component={Link}
              to={path}
              sx={{ color: "black" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
