import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({ label, value, onChange, menuItems }) {
  return (
    <>
      <FormControl margin="dense" fullWidth sx={{ minWidth: 220 }}>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={value}
          label={label}
          onChange={onChange}
          // error={true}
        >
          {menuItems.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <p
        className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1d4k99f-MuiFormHelperText-root"
        id=":rn:-helper-text"
      >
        La nota es requerida
      </p> */}
    </>
  );
}
