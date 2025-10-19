import { TextField } from '@mui/material';

const MonthPicker = ({ value, onChange, label = 'Month', ...props }) => {
  return (
    <TextField
      type="month"
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
      {...props}
    />
  );
};

export default MonthPicker;
