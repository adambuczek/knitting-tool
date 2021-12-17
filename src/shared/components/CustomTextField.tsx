import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export default function CustomTextField({ name, label, type = 'text', value, onChange, ...props }: Partial<TextFieldProps>) {
  return (
    <TextField  key={name} autoFocus margin="dense"
      id={name} label={label} type={type} fullWidth
      value={value} variant="standard" onChange={onChange}
      {...props}
    />
  )
}