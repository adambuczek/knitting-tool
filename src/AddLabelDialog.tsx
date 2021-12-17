import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { Counter } from './counter-state';

import CustomTextField from './shared/components/CustomTextField';

interface Props {
  isOpen: boolean;
  close: () => void;
  save: (label: Counter['labelMap']) => void;
}

export default function AddLabelDialog({ isOpen, close, save }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [index, setIndex] = useState('');
  const [label, setLabel] = useState('');

  const handleClose = () => {
    setIndex('');
    setLabel('');
    close();
  };

  const handleSave = () => {
    save({
      [index]: label,
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={handleClose}
      >
        <DialogTitle>{"Add label"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <CustomTextField
              sx={{ mr:1, width: '20%' }}
              label="Indices"
              value={index}
              onChange={(e) => setIndex(e.target.value)}
            />
            <CustomTextField
              label="Label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
          <Button autoFocus onClick={handleSave}>save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
