import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { Counter } from './counter-state';

interface ResponsiveDialogProps {
  isOpen: boolean;
  close: () => void;
  counter: Counter | null;
  save: (counter: Partial<Counter>) => void;
}

export default function ResponsiveDialog({ isOpen, close, counter, save }: ResponsiveDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [name, setName] = useState('');
  const [max, setMax] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (counter) {
      setName(counter.name || '');
      setMax(counter.max ? counter.max.toString() : '');
      setValue(counter.value.toString());
    }
  }, [counter]);

  const handleClose = () => {
    close();
  };

  const handleSave = () => {
    if (counter) {
      save({
        id: counter.id,
        name,
        value: parseInt(value, 10),
        max: parseInt(max, 10),
      });
    }
    close();
  };

  const fields = [
    {
      name: 'name',
      label: 'Name',
      value: name,
      type: 'text',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    },
    {
      name: 'max',
      label: 'Max',
      value: max,
      type: 'number',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setMax(e.target.value),
    },
    {
      name: 'value',
      label: 'value',
      value: value,
      type: 'number',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    },
  ]

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {counter && (
          <>
          <DialogTitle id="responsive-dialog-title">
            {"Edit Counter"}
          </DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText> */}
            {fields.map(({ name, label, value, type, onChange }) => (
              <TextField
                key={name}
                autoFocus
                margin="dense"
                id={name}
                label={label}
                type={type}
                fullWidth
                value={value}
                variant="standard"
                onChange={onChange}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              close
            </Button>
            <Button autoFocus onClick={handleSave}>
              Save
            </Button>
          </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
