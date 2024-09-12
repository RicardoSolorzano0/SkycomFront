import { Add as AddIcon } from "@mui/icons-material";
import { Alert, Box, Button, Snackbar } from "@mui/material";
import { DataTable } from "../components/DataTable";

export const CrudLayout = ({
  children,
  textButton,
  handleOpen,
  data,
  columns,
  onEdit,
  onDelete,
  snackbar,
  handleCloseSnackbar,
}) => {
  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{ mb: 2, mt: 1 }}
      >
        {textButton}
      </Button>
      <DataTable
        data={data}
        columns={columns}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      {children}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
