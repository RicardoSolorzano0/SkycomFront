import {
  Table,
  TableHead,
  TableContainer,
  TableRow,
  styled,
  TableCell,
  Paper,
  TableBody,
  Chip,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  "&.MuiTableCell-body": {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const TableReport = ({ filteredData }) => {
  return (
    <TableContainer component={Paper} elevation={3}>
      <Table
        sx={{ minWidth: 700 }}
        aria-label="customized table"
        id="student-table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Estudiante</StyledTableCell>
            <StyledTableCell>Materia</StyledTableCell>
            <StyledTableCell align="right">Promedio</StyledTableCell>
            <StyledTableCell align="center">Estado</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.alumno}
              </StyledTableCell>
              <StyledTableCell>{row.materia}</StyledTableCell>
              <StyledTableCell align="right">
                {row.promedio.toFixed(2)}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Chip
                  label={row.estado}
                  color={row.estado === "Reprobado" ? "error" : "success"}
                  size="small"
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
