import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({
  label,
  value,
  onChange,
  menuItems,
  error,
  helperText,
}) {
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
          error={error}
        >
          {menuItems.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {error && (
        <p
          className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1d4k99f-MuiFormHelperText-root"
          id=":rn:-helper-text"
        >
          {helperText}
        </p>
      )}
    </>
  );
}
